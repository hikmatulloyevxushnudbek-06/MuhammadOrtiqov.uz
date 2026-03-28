import React, { useState, useEffect, useRef, useCallback } from "react";
import "./Gallery.css";
import { Link } from "react-router-dom";
import { db } from "../firebaseConfig"; 
import { collection, getDocs, query, orderBy } from "firebase/firestore";

const staticImages = [];
const CLONES = 5;

// Darajalar tartibi (Faqat mantiq uchun, ekranda ko'rinmaydi)
const gradeOrder = ["A+", "A", "B+", "B", "C+", "C"];

function Gallery() {
  const [allImages, setAllImages] = useState([]);
  const [trackIndex, setTrackIndex] = useState(CLONES);
  const [animated, setAnimated] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(null);
  
  const [pointerDown, setPointerDown] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragDelta, setDragDelta] = useState(0);

  const autoRef = useRef(null);
  const trackRef = useRef(null);
  const AUTOPLAY_MS = 3500;

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const q = query(collection(db, "images"), orderBy("createdAt", "desc"));
        const snap = await getDocs(q);
        
        const fetchedImgs = snap.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name || "Sertifikat",
          src: doc.data().url,
          grade: doc.data().grade || "C",
          createdAt: doc.data().createdAt?.toDate() || new Date(0)
        }));

        // Qat'iy saralash mantiqi (A+ -> A -> B+ ...)
        const sortedImgs = fetchedImgs.sort((a, b) => {
          const indexA = gradeOrder.indexOf(a.grade);
          const indexB = gradeOrder.indexOf(b.grade);
          
          if (indexA !== indexB) {
            return indexA - indexB; 
          }
          return b.createdAt - a.createdAt;
        });
        
        setAllImages(sortedImgs);
      } catch (err) {
        console.error("Firebase xatosi:", err);
      }
    };
    fetchImages();
  }, []);

  const extended = allImages.length > 0 ? [
    ...allImages.slice(-CLONES),
    ...allImages,
    ...allImages.slice(0, CLONES),
  ] : [];

  const handleTransitionEnd = useCallback(() => {
    if (allImages.length === 0) return;
    setTrackIndex((idx) => {
      if (idx >= allImages.length + CLONES) {
        setAnimated(false);
        return CLONES;
      }
      if (idx < CLONES) {
        setAnimated(false);
        return allImages.length + CLONES - 1;
      }
      return idx;
    });
  }, [allImages.length]);

  useEffect(() => {
    if (!animated && allImages.length > 0) {
      const raf = requestAnimationFrame(() => setAnimated(true));
      return () => cancelAnimationFrame(raf);
    }
  }, [animated, allImages.length]);

  const startAutoplay = useCallback(() => {
    if (allImages.length === 0) return;
    autoRef.current = setInterval(() => {
      setTrackIndex((prev) => prev + 1);
      setAnimated(true);
    }, AUTOPLAY_MS);
  }, [allImages.length]);

  const stopAutoplay = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current);
  }, []);

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [startAutoplay, stopAutoplay]);

  const onDragStart = (clientX) => { 
    if (allImages.length === 0) return;
    stopAutoplay(); 
    setPointerDown(true); 
    setDragStartX(clientX); 
  };
  const onDragMove = (clientX) => { if (pointerDown) setDragDelta(clientX - dragStartX); };
  const onDragEnd = () => {
    if (!pointerDown) return;
    setPointerDown(false);
    if (dragDelta < -60) setTrackIndex((prev) => prev + 1);
    else if (dragDelta > 60) setTrackIndex((prev) => prev - 1);
    setDragDelta(0);
    setAnimated(true);
    startAutoplay();
  };

  const openModal = (src) => {
    const idx = allImages.findIndex((img) => img.src === src);
    if (idx !== -1) setSelectedIndex(idx);
  };

  const slideWidthPercent = `calc(100% / var(--carousel-visible))`;
  const translateX = `calc(-${trackIndex} * 100% / var(--carousel-visible) + ${pointerDown ? dragDelta : 0}px)`;

  return (
    <section className="gallery" id="gallery">
      <div className="container">
        <h2 className="gallery-title">Muhammad Ortiqov o‘quvchilari yutuqlari</h2>
        
        {allImages.length > 0 ? (
          <div className="carousel-viewport">
            <div
              className="carousel-track"
              ref={trackRef}
              style={{
                transform: `translateX(${translateX})`,
                transition: animated && !pointerDown ? "transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)" : "none",
                cursor: pointerDown ? "grabbing" : "grab",
              }}
              onTransitionEnd={handleTransitionEnd}
              onMouseDown={(e) => { e.preventDefault(); onDragStart(e.clientX); }}
              onMouseMove={(e) => onDragMove(e.clientX)}
              onMouseUp={onDragEnd}
              onMouseLeave={() => { if (pointerDown) onDragEnd(); }}
              onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
              onTouchMove={(e) => onDragMove(e.touches[0].clientX)}
              onTouchEnd={onDragEnd} 
            >
              {extended.map((img, i) => (
                <div
                  className="carousel-slide"
                  key={`${img.id}-${i}`}
                  style={{ width: slideWidthPercent }}
                  onClick={() => { if (Math.abs(dragDelta) < 8) openModal(img.src); }}
                >
                  {/* Faqat rasm qoldi, grade-indicator olib tashlandi */}
                  <img src={img.src} alt={img.name} draggable="false" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="no-results" style={{textAlign: 'center', padding: '50px', color: '#666'}}>
            Sertifikatlar yuklanmoqda...
          </p>
        )}

        <div className="gallery-btn-box">
          <Link to="/sertfikatlar" className="gallery-more-btn">Barchasini ko'rish</Link>
        </div>
      </div>

      {selectedIndex !== null && (
        <div className="modal" onClick={() => setSelectedIndex(null)}>
          <button className="prev" onClick={(e) => { e.stopPropagation(); setSelectedIndex((p) => (p - 1 + allImages.length) % allImages.length); }}>‹</button>
          <img src={allImages[selectedIndex].src} className="modal-img" alt="zoom" onClick={(e) => e.stopPropagation()} />
          <button className="next" onClick={(e) => { e.stopPropagation(); setSelectedIndex((p) => (p + 1) % allImages.length); }}>›</button>
          <button className="modal-close">×</button>
        </div>
      )}
    </section>
  );
}

export { staticImages as images };
export default Gallery;