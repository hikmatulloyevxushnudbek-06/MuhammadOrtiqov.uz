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
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Close dropdown when clicking outside
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
            <div className={`custom-dropdown ${formData.course ? "" : "placeholder-active"}`}>
              <div 
                className="dropdown-selected" 
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
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
                    <li 
                      key={option} 
                      onClick={() => {
                        setFormData(prev => ({ ...prev, course: option }));
                        setDropdownOpen(false);
                      }}
                    >
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
