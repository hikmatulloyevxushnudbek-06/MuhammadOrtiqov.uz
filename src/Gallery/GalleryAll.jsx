import React, { useState, useEffect, useRef } from "react";
import { images as staticImages } from "../Gallery/Gallery"; 
import "./GalleryAll.css";
import { FiSearch } from "react-icons/fi";
import { db } from "../firebaseConfig";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

// Darajalar tartibi (Mantiqiy ketma-ketlik uchun)
const gradeOrder = ["A+", "A", "B+", "B", "C+", "C"];

function GalleryAll() {
  const [allImages, setAllImages] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("All"); 
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const titleRef = useRef(null);

  const grades = ["All", "A+", "A", "B+", "B", "C+", "C"];

  useEffect(() => {
    const loadData = async () => {
      try {
        const q = query(collection(db, "images"), orderBy("createdAt", "desc"));
        const snap = await getDocs(q);
        const firebaseImgs = snap.docs.map(doc => ({
          name: doc.data().name || "",
          src: doc.data().url,
          grade: doc.data().grade || "C",
          createdAt: doc.data().createdAt?.toDate() || new Date(0)
        }));
        
        const updatedStatic = staticImages.map(img => ({
          ...img, 
          grade: img.grade || "C",
          createdAt: new Date(0)
        }));
        
        const combined = [...firebaseImgs, ...updatedStatic];

        // QAT'IY TARTIBLASH (A+ -> A -> B+ ...)
        const finalSorted = combined.sort((a, b) => {
          const indexA = gradeOrder.indexOf(a.grade);
          const indexB = gradeOrder.indexOf(b.grade);
          
          if (indexA !== indexB) {
            return indexA - indexB; 
          }
          return b.createdAt - a.createdAt;
        });

        setAllImages(finalSorted);
      } catch (err) {
        console.error("Xatolik:", err);
        setAllImages(staticImages);
      }
    };
    loadData();
  }, []);

  const filteredImages = allImages.filter((img) => {
    const matchesSearch = img.name.toLowerCase().includes(search.toLowerCase());
    const matchesGrade = selectedGrade === "All" || img.grade === selectedGrade;
    return matchesSearch && matchesGrade;
  });

  const totalPages = Math.ceil(filteredImages.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentImages = filteredImages.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    titleRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="gallery-all">
      <div className="container">
        <h2 className="gallery-all-title" ref={titleRef}>Barcha sertifikatlar</h2>
        
        <div className="grade-filter">
          {grades.map((g) => (
            <button
              key={g}
              onClick={() => { setSelectedGrade(g); setCurrentPage(1); }}
              className={`grade-btn ${selectedGrade === g ? "active" : ""}`}
            >
              {g}
            </button>
          ))}
        </div>

        <div className="gallery-all-inp">
          <div className="search-wrapper">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Sertifikat nomini yozing..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              className="gallery-search"
            />
          </div>
        </div>

        <div className="gallery-grid">
          {currentImages.length > 0 ? (
            currentImages.map((img, index) => (
              <div 
                key={index} 
                className="gallery-card" 
                onClick={() => setSelectedIndex(indexOfFirstItem + index)}
              >
                {/* FAQAT RASM - hamma ortiqcha yozuvlar (grade, name) olib tashlandi */}
                <img src={img.src} alt="sertifikat" loading="lazy" className="gallery-img" />
              </div>
            ))
          ) : (
            <div className="no-results-wrapper">
              <p className="no-results">Hech qanday sertifikat topilmadi</p>
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="pagination">
            <button 
              onClick={() => paginate(currentPage - 1)} 
              disabled={currentPage === 1} 
              className="pagination-btn arrow"
            > 
              « 
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
                className={`pagination-btn ${currentPage === i + 1 ? "active" : ""}`}
              >
                {i + 1}
              </button>
            ))}
            <button 
              onClick={() => paginate(currentPage + 1)} 
              disabled={currentPage === totalPages} 
              className="pagination-btn arrow"
            > 
              » 
            </button>
          </div>
        )}
      </div>

      {selectedIndex !== null && (
        <div className="modal" onClick={() => setSelectedIndex(null)}>
          <button className="prev" onClick={(e) => { e.stopPropagation(); setSelectedIndex((p) => (p - 1 + filteredImages.length) % filteredImages.length); }}>‹</button>
          <img src={filteredImages[selectedIndex].src} className="modal-img" alt="zoom" onClick={(e) => e.stopPropagation()} />
          <button className="next" onClick={(e) => { e.stopPropagation(); setSelectedIndex((p) => (p + 1) % filteredImages.length); }}>›</button>
          <button className="modal-close">×</button>
        </div>
      )}
    </section>
  );
}

export default GalleryAll;