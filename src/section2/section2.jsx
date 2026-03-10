import React, { useEffect, useState } from "react";
import { FaUsers, FaGraduationCap, FaChartLine, FaClock } from "react-icons/fa";
import "./section2.css";

function Results() {
  const stats = [
    { id: 1, value: 2000, suffix: "+", label: "O'quvchilarga dars bergan", icon: <FaUsers /> },
    { id: 2, value: 2000, suffix: "+", label: "Universitetga qabul", icon: <FaGraduationCap /> },
    { id: 3, value: 95, suffix: "%", label: "Muvaffaqiyat darajasi", icon: <FaChartLine /> },
    { id: 4, value: 11, suffix: "+", label: "Yillik Tajriba", icon: <FaClock /> },
  ];

  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    const intervals = stats.map((stat, index) => {
      return setInterval(() => {
        setCounts((prev) => {
          const newCounts = [...prev];

          if (newCounts[index] < stat.value) {
            newCounts[index] += Math.ceil(stat.value / 80);

            if (newCounts[index] > stat.value) {
              newCounts[index] = stat.value;
            }
          }

          return newCounts;
        });
      }, 20);
    });

    return () => intervals.forEach((interval) => clearInterval(interval));
  }, []);

  return (
    <section className="results" id="section2">
      <div className="container">
        <h2>Tasdiqlangan natijalar</h2>
        <p className="subtitles">
          Raqamlar so'zlardan ko'ra balandroq gapiradi. Bizning tajribamiz izchil mukammallikni namoyish etadi.
        </p>

        <div className="stats">
          {stats.map((stat, index) => (
            <div className="stat" key={stat.id}>
              <div className="icon">{stat.icon}</div>
              <h3>
                {counts[index]}
                {stat.suffix}
              </h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Results;