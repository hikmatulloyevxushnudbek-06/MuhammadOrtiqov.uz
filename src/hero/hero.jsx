import React, { useState } from "react";
import { Link } from "react-scroll";
import Gurparasm from "../assets/Gurpavoy rasm.jpg";
import "./hero.css";

function Hero() {
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <p className="badge">2026 o‘quv yili uchun ro‘yxatdan o‘tish</p>
              <h1>
                Matematika Ustozi <span>Ishonch bilan</span>
              </h1>
              <h2>
                Biz o'quvchilarni universitet imtihonlari, <br /> milliy
                sertifikat va olimpiadalarga tayyorlaymiz.
              </h2>
              <div className="hero-buttons">
                <button className="primary">
                  <Link to="data" smooth={true} duration={500}>
                    Ma’lumot olish
                  </Link>
                </button>
                <button className="secondary">
                  <Link to="section1" smooth={true} duration={500}>
                    Kurslarni ko'rish
                  </Link>
                </button>
              </div>
            </div>
            <div className="hero-animation">
              <div className="big-circle"></div>
              <div className="dashed-circle" onClick={openModal}>
                <img src={Gurparasm} alt="Hero" />
              </div>
              <div className="formula f1">f(x) = ax² + bx + c</div>
              <div className="formula f2">∫₀¹ x² dx = ⅓</div>
              <div className="formula f3">E = mc²</div>
            </div>
          </div>
        </div>
      </section>
      {open && (
        <div className="image-modal" onClick={closeModal}>
          <img src={Gurparasm} alt="preview" />
        </div>
      )}
    </>
  );
}

export default Hero;
