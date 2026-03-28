import React, { useState } from "react";
import "./RegistrationForm.css";
import { PiTelegramLogo } from "react-icons/pi";

// Firebase importlari
import { db } from "../firebaseConfig"; 
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function RegistrationForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "+998",
    course: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Dropdownni tashqariga bosganda yopish
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".custom-dropdown")) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const BOT_TOKEN = "8726729560:AAG191SqVQnIbl6G0u_9IUPiUNM7tIHVGuw";
    const CHAT_ID = "7315293633";

    const text = `
<b>🚀 Yangi ro'yxatdan o'tish:</b>
👤 <b>Ism:</b> ${formData.fullName || "(kiritilmagan)"}
📱 <b>Telefon:</b> ${formData.phone || "(kiritilmagan)"}
📚 <b>Kurs:</b> ${formData.course || "(tanlanmagan)"}
💬 <b>Izoh:</b> ${formData.message || "(yo‘q)"}
    `.trim();

    try {
      // 1. Firebase Firestore-ga saqlash (Admin panelga moslangan formatda)
      // Kolleksiya nomi "users" bo'lishi shart, chunki AdminUsers shuni o'qiydi
      await addDoc(collection(db, "users"), {
        name: formData.fullName, // Admin panel "name" fieldini o'qiydi
        phone: formData.phone,
        course: formData.course,
        message: formData.message,
        status: "Yangi", // Standart status
        grade: "-",      // Standart daraja
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.fullName)}&background=3b82f6&color=fff`,
        createdAt: serverTimestamp(),
      });

      // 2. Telegram Botga yuborish
      const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: text,
          parse_mode: "HTML",
        }),
      });

      const data = await response.json();

      if (data.ok) {
        setSuccessMessage("✅ Ma'lumotlar muvaffaqiyatli yuborildi!");
        setTimeout(() => setSuccessMessage(""), 3000);
        setFormData({ fullName: "", phone: "+998", course: "", message: "" });
      } else {
        alert("Telegramga yuborishda xato: " + (data.description || "Noma'lum"));
      }
    } catch (err) {
      console.error(err);
      alert("Xatolik yuz berdi. Internetni tekshiring.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container" id="data">
      <div className="container">
        <h2 className="form-container-title">Bog‘lanish uchun ma’lumot qoldiring</h2>
        <div className="underline"></div>
        <p className="subtitle">Ismingiz va telefon raqamingizni qoldiring, biz siz bilan tez orada aloqaga chiqamiz</p>
        
        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-group">
            <label>To'liq Ism</label>
            <input
              type="text"
              name="fullName"
              placeholder="To'liq ismingiz"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Telefon raqami</label>
            <input
              type="tel"
              name="phone"
              placeholder="XX XXX XX XX"
              value={formData.phone}
              onChange={(e) => {
                let value = e.target.value;
                if (!value.startsWith("+998")) value = "+998";
                setFormData((prev) => ({ ...prev, phone: value }));
              }}
              required
            />
          </div>

          <div className="form-group">
            <label>Kurs</label>
            <div className={`custom-dropdown ${formData.course ? "" : "placeholder-active"}`}>
              <div className="dropdown-selected" onClick={() => setDropdownOpen(!dropdownOpen)}>
                {formData.course || "Kursni tanlang"}
                <span className={`dropdown-arrow ${dropdownOpen ? "open" : ""}`}></span>
              </div>
              {dropdownOpen && (
                <ul className="dropdown-options">
                  {[
                    "Universitetga kirishga tayyorgarlik",
                    "Milliy sertifikat tayyorlash",
                    "Olimpiadaga tayyorgarlik",
                    "IT bo‘yicha kurslar"
                  ].map((option) => (
                    <li key={option} onClick={() => {
                      setFormData(prev => ({ ...prev, course: option }));
                      setDropdownOpen(false);
                    }}>
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="form-group">
            <label>Xabar (ixtiyoriy)</label>
            <textarea
              name="message"
              placeholder="Savollar yoki imtiyozlar bormi?"
              value={formData.message}
              onChange={handleChange}
              rows={4}
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Yuborilmoqda..." : "Yuborish"}
            {loading ? <span className="loader"></span> : <PiTelegramLogo />}
          </button>
        </form>
      </div>

      {successMessage && (
        <div className="toast-message">
          {successMessage}
        </div>
      )}
    </div>
  );
}

export default RegistrationForm;