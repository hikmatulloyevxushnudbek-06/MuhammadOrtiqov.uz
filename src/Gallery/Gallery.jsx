import { useState, useEffect, useRef, useCallback } from "react";
import "./Gallery.css";
import { Link } from "react-router-dom";

// Rasmlar importi (O'zgarmadi)
import logo from "../assets/Baxtiyor Jalolov.jpg";
import logo1 from "../assets/Aminov Temurbek.jpg";
import logo2 from "../assets/Aminov Tohirbek.jpg";
import logo3 from "../assets/Ilyosov Madiyor.jpg";
import logo4 from "../assets/Yusupova Feruza.jpg";
import logo5 from "../assets/Ro'zimurodov Quvonchbek.jpg";
import logo6 from "../assets/Boboqulova Nazira.jpg";
import logo7 from "../assets/Sirojov Siroj.jpg";
import logo8 from "../assets/Badriddinov Dilshod.jpg";
import logo9 from "../assets/Kamolov Davron.jpg";
import logo10 from "../assets/Asrorov Asrorbek.jpg";
import logo11 from "../assets/To'xtayev Asilbek.jpg";
import logo12 from "../assets/Normurodov Aslam.jpg";
import logo13 from "../assets/Muhiddinova Madinabonu.jpg";
import logo14 from "../assets/Qahramonov Azizjon.jpg";
import logo15 from "../assets/Salimov Lazizjon.jpg";
import logo16 from "../assets/Shavkatova Shaxinabonu.jpg";
import logo17 from "../assets/Tursunov Diyorbek.jpg";
import logo18 from "../assets/G'aybullayeva Saodat.jpg";
import logo19 from "../assets/Aslonov Anvar.jpg";
import logo20 from "../assets/Sharipov Rashid.jpg";
import logo21 from "../assets/Murtazoyev Og'abek.jpg";
import logo22 from "../assets/Qahramonova Oynur.jpg";
import logo23 from "../assets/Abduraupova Soliha.jpg";
import logo24 from "../assets/Baxtiyorova Hokima.jpg";
import logo25 from "../assets/Mirzayev Dilshod.jpg";
import logo26 from "../assets/Komilov Akmal.jpg";
import logo27 from "../assets/Bo'ronova Charos.jpg";
import logo28 from "../assets/Fayzullayev Idillo.jpg";
import logo29 from "../assets/Xudoyqulov Suxrob.jpg";
import logo30 from "../assets/Qahramonov Husniddin.jpg";
import logo31 from "../assets/Bozorova Sevara.jpg";
import logo32 from "../assets/Mo'minova Zebiniso.jpg";
import logo33 from "../assets/Shodmonov Shohruh.jpg";
import logo34 from "../assets/O'ktamov Amirxon.jpg";
import logo35 from "../assets/Muxtorov Kamronbek.jpg";
import logo36 from "../assets/To'ramurodov Ulug'bek.jpg";
import logo37 from "../assets/Akramov Aslbek.jpg";

// SEO uchun boyitilgan rasmlar massivi
const images = [
  { name: "Baxtiyor Jalolov - Muhammad Ortiqov o'quvchisi matematika sertifikati", src: logo },
  { name: "Aminov Temurbek - Matematika milliy sertifikat natijasi", src: logo1 },
  { name: "Aminov Tohirbek - Ortiqov Muhammad o'quv markazi yutug'i", src: logo2 },
  { name: "Ilyosov Madiyor - Matematika bo'yicha yuqori natija", src: logo3 },
  { name: "Yusupova Feruza - Muhammad Ortiqov darslari natijasi", src: logo4 },
  { name: "Ro'zimurodov Quvonchbek - Matematika imtihon natijasi", src: logo5 },
  { name: "Boboqulova Nazira - Matematika sertifikati", src: logo6 },
  { name: "Sirojov Siroj - Muhammad Ortiqov matematika kursi", src: logo7 },
  { name: "Badriddinov Dilshod - Matematika fanidan yutuq", src: logo8 },
  { name: "Kamolov Davron - Ortiqov Muhammad matematika markazi", src: logo9 },
  { name: "Asrorov Asrorbek - Matematika milliy sertifikat", src: logo10 },
  { name: "To'xtayev Asilbek - Matematika fanidan natija", src: logo11 },
  { name: "Normurodov Aslam - Muhammad Ortiqov o'quvchisi", src: logo12 },
  { name: "Muhiddinova Madinabonu - Matematika sertifikati natija", src: logo13 },
  { name: "Qahramonov Azizjon - Matematika fanidan sertifikat", src: logo14 },
  { name: "Salimov Lazizjon - Muhammad Ortiqov shogirdi", src: logo15 },
  { name: "Shavkatova Shaxinabonu - Matematika yutuqlari", src: logo16 },
  { name: "Tursunov Diyorbek - Matematika sertifikat egalari", src: logo17 },
  { name: "G'aybullayeva Saodat - Muhammad Ortiqov darslari", src: logo18 },
  { name: "Aslonov Anvar - Matematika fanidan bilim darajasi", src: logo19 },
  { name: "Sharipov Rashid - Muhammad Ortiqov o'quv markazi", src: logo20 },
  { name: "Murtazoyev Og'abek - Matematika natija 2026", src: logo21 },
  { name: "Qahramonova Oynur - Matematika milliy sertifikat", src: logo22 },
  { name: "Abduraupova Soliha - Muhammad Ortiqov shogirdi natijasi", src: logo23 },
  { name: "Baxtiyorova Hokima - Matematika darslaridagi yutuq", src: logo24 },
  { name: "Mirzayev Dilshod - Matematika sertifikati Muhammad Ortiqov", src: logo25 },
  { name: "Komilov Akmal - Matematika o'quv kursi natijasi", src: logo26 },
  { name: "Bo'ronova Charos - Muhammad Ortiqov o'quvchisi yutug'i", src: logo27 },
  { name: "Fayzullayev Idillo - Matematika fanidan yuqori ball", src: logo28 },
  { name: "Xudoyqulov Suxrob - Matematika milliy sertifikat", src: logo29 },
  { name: "Qahramonov Husniddin - Muhammad Ortiqov o'quv markazi", src: logo30 },
  { name: "Bozorova Sevara - Matematika fanidan bilim", src: logo31 },
  { name: "Mo'minova Zebiniso - Muhammad Ortiqov matematika kursi", src: logo32 },
  { name: "Shodmonov Shohruh - Matematika natijasi", src: logo33 },
  { name: "O'ktamov Amirxon - Muhammad Ortiqov shogirdi", src: logo34 },
  { name: "Muxtorov Kamronbek - Matematika fanidan yutuq", src: logo35 },
  { name: "To'ramurodov Ulug'bek - Matematika sertifikati", src: logo36 },
  { name: "Akramov Aslbek - Muhammad Ortiqov o'quvchisi", src: logo37 },
];

const CLONES = 5;
const extended = [
  ...images.slice(-CLONES),
  ...images,
  ...images.slice(0, CLONES),
];

function Gallery() {
  const [trackIndex, setTrackIndex] = useState(CLONES);
  const [animated, setAnimated] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const [pointerDown, setPointerDown] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragDelta, setDragDelta] = useState(0);

  const autoRef = useRef(null);
  const trackRef = useRef(null);
  const AUTOPLAY_MS = 3500;

  const handleTransitionEnd = useCallback(() => {
    setTrackIndex((idx) => {
      if (idx >= images.length + CLONES) {
        setAnimated(false);
        return CLONES;
      }
      if (idx < CLONES) {
        setAnimated(false);
        return images.length + CLONES - 1;
      }
      return idx;
    });
  }, []);

  useEffect(() => {
    if (!animated) {
      const raf = requestAnimationFrame(() => setAnimated(true));
      return () => cancelAnimationFrame(raf);
    }
  }, [animated]);

  const startAutoplay = useCallback(() => {
    autoRef.current = setInterval(() => {
      setTrackIndex((prev) => prev + 1);
      setAnimated(true);
    }, AUTOPLAY_MS);
  }, []);

  const stopAutoplay = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current);
  }, []);

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [startAutoplay, stopAutoplay]);

  const onDragStart = (clientX) => {
    stopAutoplay();
    setPointerDown(true);
    setDragStartX(clientX);
    setDragDelta(0);
  };

  const onDragMove = (clientX) => {
    if (!pointerDown) return;
    setDragDelta(clientX - dragStartX);
  };

  const onDragEnd = () => {
    if (!pointerDown) return;
    setPointerDown(false);
    if (dragDelta < -60) {
      setTrackIndex((prev) => prev + 1);
      setAnimated(true);
    } else if (dragDelta > 60) {
      setTrackIndex((prev) => prev - 1);
      setAnimated(true);
    }
    setDragDelta(0);
    startAutoplay();
  };

  const onMouseDown = (e) => { e.preventDefault(); onDragStart(e.clientX); };
  const onMouseMove = (e) => onDragMove(e.clientX);
  const onMouseUp   = () => onDragEnd();
  const onMouseLeave = () => { if (pointerDown) onDragEnd(); };

  const onTouchStart = (e) => onDragStart(e.touches[0].clientX);
  const onTouchMove  = (e) => onDragMove(e.touches[0].clientX);
  const onTouchEnd   = () => onDragEnd();

  const openModal = (src, name) => {
    const idx = images.findIndex((img) => img.src === src);
    if (idx !== -1) setSelectedIndex(idx);
  };
  const closeModal   = () => setSelectedIndex(null);
  const nextModal    = () => setSelectedIndex((p) => (p + 1) % images.length);
  const prevModal    = () => setSelectedIndex((p) => (p - 1 + images.length) % images.length);

  const slideWidthPercent = `calc(100% / var(--carousel-visible))`;
  const translateX = `calc(-${trackIndex} * 100% / var(--carousel-visible) + ${pointerDown ? dragDelta : 0}px)`;

  return (
    <section className="gallery" id="gallery" aria-labelledby="gallery-title">
      <div className="container">
        {/* SEO uchun sarlavha */}
        <h2 id="gallery-title" className="gallery-title">Muhammad Ortiqov o‘quvchilari yutuqlari va sertifikatlari</h2>
        <p className="gallery-text">
          O'quvchilarimiz matematika fanidan milliy sertifikat va xalqaro olimpiadalarda 
          doimiy ravishda yuqori natijalarga erishmoqda. Muhammad Ortiqov o'quv markazi yutuqlari.
        </p>

        <div className="carousel-viewport" role="region" aria-label="Natijalar karuseli">
          <div
            className="carousel-track"
            ref={trackRef}
            style={{
              transform: `translateX(${translateX})`,
              transition: animated && !pointerDown
                ? "transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                : "none",
              cursor: pointerDown ? "grabbing" : "grab",
            }}
            onTransitionEnd={handleTransitionEnd}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseLeave}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {extended.map((img, i) => (
              <div
                className="carousel-slide"
                key={i}
                style={{ width: slideWidthPercent }}
                onClick={() => {
                  if (Math.abs(dragDelta) < 8) openModal(img.src, img.name);
                }}
              >
                <img
                  src={img.src}
                  alt={img.name} // SEO KALIT SO'ZLAR SHU YERDA
                  title={img.name}
                  draggable="false"
                  loading="lazy" // Tezlik uchun (Google SEO reytingiga ta'sir qiladi)
                />
              </div>
            ))}
          </div>
        </div>

        <div className="gallery-btn-box">
          <Link 
            to="/gallery-all" 
            className="gallery-more-btn"
            title="Barcha matematika sertifikatlarini ko'rish"
          >
            Barchasini ko'rish
          </Link>
        </div>
      </div>

      {selectedIndex !== null && (
        <div className="modal" onClick={closeModal} role="dialog" aria-modal="true">
          <button className="prev" onClick={(e) => { e.stopPropagation(); prevModal(); }} aria-label="Oldingi rasm">‹</button>
          <img
            src={images[selectedIndex].src}
            alt={`${images[selectedIndex].name} - Muhammad Ortiqov`}
            className="modal-img"
            onClick={(e) => e.stopPropagation()}
          />
          <button className="next" onClick={(e) => { e.stopPropagation(); nextModal(); }} aria-label="Keyingi rasm">›</button>
          <button className="modal-close" onClick={closeModal} aria-label="Yopish">×</button>
        </div>
      )}
    </section>
  );
}

export { images };
export default Gallery;