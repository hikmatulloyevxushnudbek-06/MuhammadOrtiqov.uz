import { BookOpenIcon, TrophyIcon } from "@heroicons/react/16/solid";
import React from "react";
import { BiTrophy } from "react-icons/bi";
import { FaAward, FaDesktop, FaGraduationCap } from "react-icons/fa";
import { Link } from "react-scroll";
import "./section1.css"
function section1() {
  return (
    <section id="section1">
      <div className="container">
        <h2 className="course-title">Bizning Kurslarimiz</h2>
        <p className="course-text">
          Har bir daraja uchun mo'ljallangan keng qamrovli dasturlar -
          matematika bo'yicha birinchi qadamlardan olimpiadadagi
          mukammallikgacha
        </p>
        <ul className="course-list">
          <li className="course-list-item">
            <span className="course-span">
              <FaGraduationCap className="FaGraduationCap"/>
            </span>
            <h3>Universitetga kirishga tayyorgarlik</h3>
            <h5>9–11-sinflar</h5>
            <p>
              Tasdiqlangan strategiyalar va amaliyot testlari bilan
              universitetga kirish imtihonlariga intensiv tayyorgarlik
            </p>
            <p>⏱ 2–3 yil</p>
            <button><Link to="data" smooth={true} duration={500}>Ma’lumot olish</Link></button>
          </li>
          <li className="course-list-item">
            <span className="course-span">
              <FaAward  className="FaAward"/>
            </span>
            <h3>Milliy sertifikat tayyorlash</h3>
            <h5>Barcha darajalar</h5>
            <p>
              Milliy matematika bo'yicha attestatsiya imtihonlariga yuqori
              o'tish stavkalari bilan maqsadli tayyorgarlik.
            </p>
            <p>⏱ 1–2 yil</p>
            <button><Link to="data" smooth={true} duration={500}>Ma’lumot olish</Link></button>
          </li>
          <li className="course-list-item">
            <span className="course-span">
              <BiTrophy className="BiTrophy"/>
            </span>
            <h3>Olimpiadaga tayyorgarlik</h3>
            <h5>Murakkab</h5>
            <p>
              Mintaqaviy, milliy va xalqaro darajadagi matematika olimpiadalari
              uchun elita treningi
            </p>
            <p>⏱ Yil davomida</p>
            <button><Link to="data" smooth={true} duration={500}>Ma’lumot olish</Link></button>
          </li>
          <li className="course-list-item">
            <span className="course-span">
              <FaDesktop className="FaDesktop"/>
            </span>
            <h3>IT bo‘yicha kurslar</h3>
            <h5>Barcha yoshdagilar</h5>
            <p>
              Tasdiqlangan dars metodikalari va amaliy loyihalar bilan IT ko‘nikmalarini o‘rganish
            </p>
            <p>⏱ 1-yil</p>
            <button><Link to="data" smooth={true} duration={500}>Ma’lumot olish</Link></button>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default section1;
