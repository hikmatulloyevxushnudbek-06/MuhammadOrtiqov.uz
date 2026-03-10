import { useState } from "react";
import "./Gallery.css";
import { Link } from "react-router-dom";

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
// import logo38 from "../assets/photo_2026-01-27_19-09-55.jpg";
// import logo39 from "../assets/photo_2025-08-30_19-21-11 (3).jpg";
// import logo40 from "../assets/photo_2025-06-05_12-10-12.jpg";

const images = [
  { name: "Baxtiyor Jalolov", src: logo },
  { name: "Aminov Temurbek", src: logo1 },
  { name: "Aminov Tohirbek", src: logo2 },
  { name: "Ilyosov Madiyor", src: logo3 },
  { name: "Yusupova Feruza", src: logo4 },
  { name: "Ro'zimurodov Quvonchbek", src: logo5 },
  { name: "Boboqulova Nazira", src: logo6 },
  { name: "Sirojov Siroj", src: logo7 },
  { name: "Badriddinov Dilshod", src: logo8 },
  { name: "Kamolov Davron", src: logo9 },
  { name: "Asrorov Asrorbek", src: logo10 },
  { name: "To'xtayev Asilbek", src: logo11 },
  { name: "Normurodov Aslam", src: logo12 },
  { name: "Muhiddinova Madinabonu", src: logo13 },
  { name: "Qahramonov Azizjon", src: logo14 },
  { name: "Salimov Lazizjon", src: logo15 },
  { name: "Shavkatova Shaxinabonu", src: logo16 },
  { name: "Tursunov Diyorbek", src: logo17 },
  { name: "G'aybullayeva Saodat", src: logo18 },
  { name: "Aslonov Anvar", src: logo19 },
  { name: "Sharipov Rashid", src: logo20 },
  { name: "Murtazoyev Og'abek", src: logo21 },
  { name: "Qahramonova Oynur", src: logo22 },
  { name: "Abduraupova Soliha", src: logo23 },
  { name: "Baxtiyorova Hokima", src: logo24 },
  { name: "Mirzayev Dilshod", src: logo25 },
  { name: "Komilov Akmal", src: logo26 },
  { name: "Bo'ronova Charos", src: logo27 },
  { name: "Fayzullayev Idillo", src: logo28 },
  { name: "Xudoyqulov Suxrob", src: logo29 },
  { name: "Qahramonov Husniddin", src: logo30 },
  { name: "Bozorova Sevara", src: logo31 },
  { name: "Mo'minova Zebiniso", src: logo32 },
  { name: "Shodmonov Shohruh", src: logo33 },
  { name: "O'ktamov Amirxon", src: logo34 },
  { name: "Muxtorov Kamronbek", src: logo35 },
  { name: "To'ramurodov Ulug'bek", src: logo36 },
  { name: "Akramov Aslbek", src: logo37 },
  // { name: "logo38", src: logo38 },
  // { name: "logo39", src: logo39 },
  // { name: "logo40", src: logo40 },
];

function Gallery() {
  const [currentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const perPage = 6;

  const visibleImages = images.slice(currentIndex, currentIndex + perPage);

  const openModal = (index) => setSelectedIndex(index);
  const closeModal = () => setSelectedIndex(null);

  const nextImage = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <section className="gallery" id="sertfikatlar">
      <div className="container">
        <h2 className="gallery-title">
          O'quvchilar yutuqlari va sertifikatlari
        </h2>
        <p className="gallery-text">
          O'quvchilarimiz doimiy ravishda yuqori natijalarga erishmoqda. Mana
          ularning sertifikatlari va mukofotlari
        </p>

        <ul className="gallery-wrapper">
          {visibleImages.map((img, index) => (
            <li
              className="gallery-item"
              key={index}
              onClick={() => openModal(index)}
            >
              <img src={img.src} alt={img.name} />
            </li>
          ))}
        </ul>

        <div className="gallery-btn-box">
          <Link to="/gallery-all" className="gallery-more-btn">
            Yana ko'rish
          </Link>
        </div>
      </div>

      {selectedIndex !== null && (
        <div className="modal" onClick={closeModal}>
          <button
            className="prev"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
          >
            ‹
          </button>

          <img
            src={images[selectedIndex].src}
            alt={images[selectedIndex].name}
            className="modal-img"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            className="next"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
}

export { images };
export default Gallery;