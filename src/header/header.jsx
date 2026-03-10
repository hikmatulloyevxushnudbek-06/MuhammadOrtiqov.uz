import React, { useState, useEffect } from "react";
import { FaGraduationCap, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-scroll";
import { useNavigate, useLocation } from "react-router-dom";
import "./header.css";

function Header() {

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const goHomeAndScroll = (id) => {
    setMenuOpen(false);

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 200);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header id="header">
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-container">

          <Link 
            to="header" 
            className="logo" 
            smooth={true} 
            duration={500}
            onClick={() => goHomeAndScroll("header")}
          >
            <FaGraduationCap className="graduation" />
            <h1>Muhammad Ortiqov</h1>
          </Link>

          <ul className={`nav-links ${menuOpen ? "active" : ""}`}>

            <li>
              <Link
                to="header"
                smooth={true}
                duration={500}
                className="navbar-link"
                onClick={() => goHomeAndScroll("header")}
              >
                Uy
              </Link>
            </li>

            <li>
              <Link
                to="section1"
                smooth={true}
                duration={500}
                className="navbar-link"
                onClick={() => goHomeAndScroll("section1")}
              >
                Kurslar
              </Link>
            </li>

            <li>
              <Link
                to="narxlar"
                smooth={true}
                duration={500}
                className="navbar-link"
                onClick={() => goHomeAndScroll("narxlar")}
              >
                Narxlar
              </Link>
            </li>

            <li>
              <Link
                to="section2"
                smooth={true}
                duration={500}
                className="navbar-link"
                onClick={() => goHomeAndScroll("section2")}
              >
                Natijalar
              </Link>
            </li>

            <li>
              <Link
                to="gallery"
                smooth={true}
                duration={500}
                className="navbar-link"
                onClick={() => goHomeAndScroll("gallery")}
              >
                Sertifikatlar
              </Link>
            </li>

            <li>
              <Link
                to="teacher"
                smooth={true}
                duration={500}
                className="navbar-link"
                onClick={() => goHomeAndScroll("teacher")}
              >
                O'qituvchi
              </Link>
            </li>

            <li>
              <Link
                to="address"
                smooth={true}
                duration={500}
                className="navbar-link"
                onClick={() => goHomeAndScroll("address")}
              >
                Aloqa
              </Link>
            </li>

            <li>
              <button className="register-btn">
                <Link
                  to="data"
                  smooth={true}
                  duration={500}
                  onClick={() => goHomeAndScroll("data")}
                >
                  Ma’lumot olish
                </Link>
              </button>
            </li>

          </ul>

          <div className="burger" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </div>

        </div>
      </nav>
    </header>
  );
}

export default Header;