import React from "react";
import "./Footer.css";
import { FaGraduationCap } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goHomeAndScroll = (id) => {
    if (location.pathname === "/") {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 200);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="columns-wrapper">
          <div className="column logo-column">
            <div className="logo-row">
              <div className="logo-circle">
                <span className="emoji">
                  <FaGraduationCap className="graduation" />
                </span>
              </div>
              <h1 className="footer-title">Muhammad Ortiqov o‘quv markazi</h1>
            </div>
            <p>
              Buxoro Viloyati Shofirkon Tumanidagi yetakchi matematika oʻquv
              markazi — 2015 yildan boshlab oʻziga ishongan, qobiliyatli
              matematiklarni shakllantirmoqda
            </p>
          </div>

          <div className="column links-column">
            <h4>Tez havolalar</h4>
            <ul>
              {["header", "section1", "narxlar", "section2", "gallery", "teacher", "address"].map((id, index) => {
                const names = ["Uy", "Kurslar", "Narxlar", "Natijalar", "Sertifikatlar", "O'qituvchi", "Aloqa"];
                return (
                  <li key={index}>
                    <span
                      className="navbar-link"
                      onClick={() => goHomeAndScroll(id)}
                      style={{ cursor: "pointer" }}
                    >
                      {names[index]}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="column social-column">
            <h4>Ijtimoiy tarmoqlar</h4>
            <div className="social-row">
              <a
                href="https://t.me/MuhammadOrtiqov"
                target="_blank"
                rel="noopener noreferrer"
              >
                Telegram
              </a>
              <a href="#">Instagram</a>
            </div>
          </div>
        </div>

        <div className="copyright">
          © 2026 Muhammad Ortiqov kurslari. Barcha huquqlar himoyalangan.
        </div>
      </div>
    </footer>
  );
};

export default Footer;