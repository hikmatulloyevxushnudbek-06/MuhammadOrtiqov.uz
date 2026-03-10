import React from "react";
import "./Address.css";
import { BiLocationPlus } from "react-icons/bi";
import { PiTelegramLogo } from "react-icons/pi";
import { FiPhone } from "react-icons/fi";
function Address() {
  return (
    <div className="contact" id="address">
      <div className="container">
        <h2 className="contact-title">Biz bilan bog'lanish</h2>
        <div className="contact-line"></div>
        <section className="contact">
          <div className="contact-cards">
            <a
              href="https://www.google.com/maps/search/Buxoro+viloyati+Shofirkon+tumani+Chandir+Mahallasi+11maktab/@40.0951737,64.4516261,14z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI2MDIyNS4wIKXMDSoASAFQAw%3D%3D target"
              target="_blank"
              rel="noopener noreferrer"
              className="card"
            >
              <div className="contact-div">
                <BiLocationPlus className="contact-icon1" />
              </div>
              <h3>Manzil</h3>
              <p>Buxoro Viloyati Shofirkon Tumani</p>
            </a>

            <a
              href="tel:+998 93 478 53 35"
              className="card"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="contact-div">
                <FiPhone className="contact-icon2" />
              </div>
              <h3>Telefon</h3>
              <p>+998 93 478 53 35</p>
            </a>

            <a
              href="https://t.me/MuhammadOrtiqov"
              className="card"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="contact-div">
                <PiTelegramLogo className="contact-icon3" />
              </div>
              <h3>Telegram</h3>
              <p className="email">@MuhammadOrtiqov</p>
            </a>
          </div>

          <div className="map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.0!2d64.4567013!3d40.0892791!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDA1JzIxLjQiTiA2NMKwMjcnMzMuNCJF!5e0!3m2!1suz!2suz!4v1690000000000"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Address;
