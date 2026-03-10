import { Routes, Route } from "react-router-dom";


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

import "./App.css";

function App() {
  return (
    <>
      <Header />

      <Routes>

        <Route
          path="/"
          element={
            <>
              <Hero />
              <Section1 />
              <Narxlar />
              <Section2 />
              <Gallery />
              <Teacher />
              <RegistrationForm />
              <Address />
            </>
          }
        />

        <Route path="/gallery-all" element={<GalleryAll />} />

      </Routes>

      <Footer />
    </>
  );
}

export default App;