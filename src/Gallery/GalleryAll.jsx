import React, { useState, useEffect, useRef } from "react";
import { images } from "./Gallery";
import "./GalleryAll.css";
import { FiSearch } from "react-icons/fi";

function GalleryAll() {
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const titleRef = useRef(null);

  useEffect(() => {
    document.title = "Barcha sertifikatlar | Muhammad Ortiqov o'quv markazi";

    return () => {
      document.title = "Muhammad Ortiqov o'quv markazi";
    };
  }, []);

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, []);

  // Reset to first page when searching
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // Scroll to top when page changes
  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [currentPage]);

  const filteredImages = images.filter((img) =>
    img.name.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredImages.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentImages = filteredImages.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const openModal = (indexInCurrentPage) => {
    // We need the index in filteredImages to keep modal navigation working correctly
    const indexInFiltered = indexOfFirstItem + indexInCurrentPage;
    setSelectedIndex(indexInFiltered);
  };

  const closeModal = () => setSelectedIndex(null);

  const nextImage = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) =>
      prev === filteredImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) =>
      prev === 0 ? filteredImages.length - 1 : prev - 1
    );
  };

  return (
    <section className="gallery-all">
      <div className="container">
        <h2 className="gallery-all-title" ref={titleRef}>
          Barcha sertifikatlar
        </h2>

        <p className="gallery-subtitle">
          O'quvchilarimizning barcha sertifikatlari va yutuqlari shu yerda
        </p>

        <div className="gallery-all-inp">
          <div className="search-wrapper">
            <FiSearch className="search-icon" aria-hidden="true" />
            <input
              type="text"
              placeholder="Qidiring..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="gallery-search"
              aria-label="Sertifikatlar bo'yicha qidiruv"
            />
          </div>
        </div>

        <div className="gallery-grid">
          {currentImages.map((img, index) => (
            <img
              key={index}
              src={img.src}
              alt={img.name}
              onClick={() => openModal(index)}
              loading="lazy"
              className="gallery-image"
            />
          ))}
        </div>

        {filteredImages.length > itemsPerPage && (
          <div className="pagination">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="pagination-btn"
            >
              &laquo;
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={`pagination-btn ${
                  currentPage === i + 1 ? "active" : ""
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="pagination-btn"
            >
              &raquo;
            </button>
          </div>
        )}

        {filteredImages.length === 0 && search && (
          <p className="no-results">Hech qanday sertifikat topilmadi :(</p>
        )}
      </div>

      {selectedIndex !== null && (
        <div className="modal" onClick={closeModal}>
          <button
            className="prev"
            onClick={prevImage}
            aria-label="Oldingi rasm"
          >
            ‹
          </button>

          <img
            src={filteredImages[selectedIndex].src}
            alt={filteredImages[selectedIndex].name}
            className="modal-img"
            onClick={(e) => e.stopPropagation()}
            loading="lazy"
          />

          <button
            className="next"
            onClick={nextImage}
            aria-label="Keyingi rasm"
          >
            ›
          </button>

          <button
            className="modal-close"
            onClick={closeModal}
            aria-label="Modalni yopish"
          >
            ×
          </button>
        </div>
      )}
    </section>
  );
}

export default GalleryAll;