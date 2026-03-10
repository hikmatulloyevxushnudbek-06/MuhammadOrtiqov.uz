import React, { useState } from "react";
import "./Teacher.css";
import { FaCheckCircle } from "react-icons/fa";

import teacher1 from "../assets/Muhammad Ortiqov ustoz.jpg";
import teacher2 from "../assets/Baxtiyor Jalolov ustoz.jpg";
import teacher3 from "../assets/Ilyosov Madiyor ustoz.jpg";
import teacher4 from "../assets/Dasturlash o'qituvchi.jpg";

function Teacher() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeImg, setActiveImg] = useState(null);

  const images = [teacher1, teacher2, teacher3, teacher4];

  const openModal = (img) => {
    setActiveImg(img);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setActiveImg(null);
  };

  return (
    <div className="teacher" id="ustoz">
      <div className="container">
        <h2 className="teacher-title">O'qituvchingiz bilan tanishing</h2>

        <div className="teacher-flex">
          <div className="teacher-img" onClick={() => openModal(teacher1)}>
            <img src={teacher1} alt="Bosh o'qituvchi" />
          </div>
          <div className="teacher-name">
            <h3>Bosh matematika o'qituvchisi</h3>
            <h2>Professional o'qituvchi</h2>
            <p className="teacher-name-text">
              Sakkiz yildan ortiq o'qituvchilik tajribasiga ega bo'lgan bosh
              o'qituvchimiz mingdan ortiq talabalarni ilmiy yutuqlarga
              yo'naltirdi...
            </p>
            <p className="teacher-list-text">
              <FaCheckCircle className="check" /> 11+ yillik o'qituvchilik
              tajribasi
            </p>
            <p className="teacher-list-text">
              <FaCheckCircle className="check" /> 2000+ talaba muvaffaqiyatli
              tayyorlandi
            </p>
            <p className="teacher-list-text">
              <FaCheckCircle className="check" /> Universitetga kirish bo'yicha
              mutaxassislik va milliy sertifikatlar
            </p>
            <p className="teacher-list-text">
              <FaCheckCircle className="check" /> Bir nechta olimpiada
              sovrindorlarini tayyorlagan
            </p>
            <p className="teacher-list-text">
              <FaCheckCircle className="check" /> Milliy ta'lim kengashi
              tomonidan tasdiqlangan
            </p>
          </div>
        </div>

        <h2 className="teacher-title">
          Yordamchi o‘qituvchilar bilan tanishing
        </h2>

        <div className="teacher-flex">
          <div className="teacher-img" onClick={() => openModal(teacher2)}>
            <img src={teacher2} alt="Yordamchi o'qituvchi 1" />
          </div>
          <div className="teacher-name">
            <h3>Yordamchi o'qituvchi</h3>
            <h2>Professional o'qituvchi</h2>
            <p className="teacher-name-text">
              Bizning yordamchi o‘qituvchimiz sizning o‘quv jarayonini
              qo‘llab-quvvatlaydi va individual savollarga tezkor javob
              beradi...
            </p>
            <p className="teacher-list-text">
              <FaCheckCircle className="check" /> 3+ yillik pedagogik tajriba
            </p>
            <p className="teacher-list-text">
              <FaCheckCircle className="check" /> Talabalar bilan individual
              ishlash bo‘yicha malaka
            </p>
            <p className="teacher-list-text">
              <FaCheckCircle className="check" /> Onlayn va oflayn
              qo‘llab-quvvatlash
            </p>
            <p className="teacher-list-text">
              <FaCheckCircle className="check" /> Mashg‘ulotlarda amaliy yordam
              va tushuntirish
            </p>
            <p className="teacher-list-text">
              <FaCheckCircle className="check" /> Milliy sertifikatlar bilan
              tasdiqlangan malaka
            </p>
          </div>
        </div>

        <div className="teacher-flex">
          <div className="teacher-img" onClick={() => openModal(teacher3)}>
            <img src={teacher3} alt="Yordamchi o'qituvchi 2" />
          </div>
          <div className="teacher-name">
            <h3>Yordamchi o'qituvchi</h3>
            <h2>Professional o'qituvchi</h2>
            <p className="teacher-name-text">
              Bizning yordamchi o‘qituvchimiz sizning o‘quv jarayonini
              qo‘llab-quvvatlaydi va individual savollarga tezkor javob
              beradi...
            </p>
            <p className="teacher-list-text">
              <FaCheckCircle className="check" /> 1+ yillik pedagogik tajriba
            </p>
            <p className="teacher-list-text">
              <FaCheckCircle className="check" /> Talabalar bilan individual
              ishlash bo‘yicha malaka
            </p>
            <p className="teacher-list-text">
              <FaCheckCircle className="check" /> Onlayn va oflayn
              qo‘llab-quvvatlash
            </p>
            <p className="teacher-list-text">
              <FaCheckCircle className="check" /> Mashg‘ulotlarda amaliy yordam
              va tushuntirish
            </p>
            <p className="teacher-list-text">
              <FaCheckCircle className="check" /> Milliy sertifikatlar bilan
              tasdiqlangan malaka
            </p>
          </div>
        </div>

        <h2 className="teacher-title">Dasturlash o‘qituvchisi</h2>
        <div className="teacher-flex">
          <div className="teacher-img" onClick={() => openModal(teacher4)}>
            <img src={teacher4} alt="Dasturlash o'qituvchi" />
          </div>
          <div className="teacher-name">
            <h3>Dasturlash o‘qituvchisi</h3>
            <h2>Professional dasturlash o‘qituvchisi</h2>
            <p className="teacher-name-text">
              Bizning dasturlash o‘qituvchimiz sizga zamonaviy dasturlash
              tillarini o‘rganishda yordam beradi va real loyihalar orqali
              bilimlaringizni mustahkamlaydi.
            </p>
            <p className="teacher-list-text">
              <FaCheckCircle className="check" /> 1+ yillik dasturlash tajribasi
            </p>
            <p className="teacher-list-text">
              <FaCheckCircle className="check" /> Talabalar bilan individual
              ishlash tajribasi
            </p>
            <p className="teacher-list-text">
              <FaCheckCircle className="check" /> AI texnologiyalarini o‘rgatish
            </p>
            <p className="teacher-list-text">
              <FaCheckCircle className="check" /> Amaliy loyihalar orqali
              o‘qitish
            </p>
            <p className="teacher-list-text">
              <FaCheckCircle className="check" /> Zamonaviy IT texnologiyalar va
              metodikalardan foydalanish
            </p>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div className="teacher-modal" onClick={closeModal}>
          <img
            src={activeImg}
            alt="Katta ko'rinish"
            className="teacher-modal-img"
          />
        </div>
      )}
    </div>
  );
}

export default Teacher;
