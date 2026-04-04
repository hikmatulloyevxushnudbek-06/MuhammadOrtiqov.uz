import { Routes, Route } from "react-router-dom";

// Asosiy sahifa komponentlari
import Header from "./header/header.jsx";
import Hero from "./hero/hero.jsx";
import Section1 from "./section1/section1.jsx";
import Narxlar from "./narxlar/narxlar.jsx";
import Section2 from "./section2/section2.jsx";
import Gallery from "./Gallery/Gallery.jsx";
import Teacher from "./Teacher/Teacher.jsx";
import RegistrationForm from "./RegistrationForm/RegistrationForm.jsx";
import Address from "./Address/Address.jsx";
import Footer from "./Footer/Footer.jsx";
import GalleryAll from "./Gallery/GalleryAll.jsx";

// ADMIN PANELNI IMPORT QILISH 
// Eslatma: Agar papka ichidagi fayl nomi boshqacha bo'lsa, "Admin.jsx" qismini o'zgartiring
import AdminPanel from "./1-amaliyot admin panel/Admin.jsx";

import "./App.css";

function App() {
  return (
    <>
      <Routes>
        {/* 1. ASOSIY SAHIFA (Barcha qismlar bilan) */}
        <Route
          path="/"
          element={
            <>
              <Header />
              <Hero />
              <Section1 />
              <Narxlar />
              <Section2 />
              <Gallery />
              <Teacher />
              <RegistrationForm />
              <Address />
              <Footer />
            </>
          }
        />

        {/* 2. SERTIFIKATLAR SAHIFASI */}
        <Route
          path="/sertfikatlar"
          element={
            <>
              <Header />
              <GalleryAll />
              <Footer />
            </>
          }
        />

        {/* 3. ADMIN PANEL SAHIFASI (Header va Footer-siz, faqat admin panel) */}
        <Route path="/admin" element={<AdminPanel />} />

      </Routes>
    </>
  );
}

export default App;