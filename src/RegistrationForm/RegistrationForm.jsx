import React, { useState } from "react";
import "./RegistrationForm.css";
import { PiTelegramLogo } from "react-icons/pi";

function RegistrationForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "+998",
    course: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const BOT_TOKEN = "8726729560:AAG191SqVQnIbl6G0u_9IUPiUNM7tIHVGuw";
    const CHAT_ID = "7315293633";

    const text = `
Yangi ro'yxatdan o'tish:
👤 Ism: ${formData.fullName || "(kiritilmagan)"}
📱 Telefon: ${formData.phone || "(kiritilmagan)"}
📚 Kurs: ${formData.course || "(tanlanmagan)"}
💬 Izoh: ${formData.message || "(yo‘q)"}
    `.trim();

    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: text,
        parse_mode: "HTML",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.ok) {
          setSuccessMessage("✅ Ma'lumotlar muvaffaqiyatli yuborildi!");

          setTimeout(() => {
            setSuccessMessage("");
          }, 3000);
          setFormData({ fullName: "", phone: "", course: "", message: "" });
        } else {
          alert("Xatolik yuz berdi: " + (data.description || "Noma'lum xato"));
        }
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
        alert("Internet bilan bog‘liq muammo yuz berdi.");
      });
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

                if (value.length < 4) {
                  value = "+998";
                }

                if (!value.startsWith("+998")) {
                  value = "+998";
                }

                setFormData((prev) => ({
                  ...prev,
                  phone: value,
                }));
              }}
              required
            />
          </div>

          <div className="form-group">
            <label>Kurs</label>
            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Kursni tanlang
              </option>
              <option value="Universitetga kirishga tayyorgarlik">
                Universitetga kirishga tayyorgarlik
              </option>
              <option value="Milliy sertifikat tayyorlash">
                Milliy sertifikat tayyorlash
              </option>
              <option value="Olimpiadaga tayyorgarlik">
                Olimpiadaga tayyorgarlik
              </option>
              <option value="IT bo‘yicha kurslar">IT bo‘yicha kurslar</option>
            </select>
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
