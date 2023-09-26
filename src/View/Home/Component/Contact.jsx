import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import profil from "../../../Asset/profil.png";
import ContactMap from "../Component/Maps";
import "../../../Style/ContactLinks.css";

function ContactLinks() {
  return (
    <div className="relative">
      <div
        id="contactSection"
        className="flex flex-col items-center justify-center text-center bg-gradient-to-b from-gray-900 via-gray-700 to-gray-500 p-5 w-screen overflow-hidden relative"
      >
        <div className="gradient-border">
          {" "}
          <img
            src={profil}
            alt="Contact Us"
            className="w-40 h-40 rounded-full p-1"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5">
          <a
            href="mailto:arionovrian192@gmail.com"
            className="text-white hover:text-gray-400 flex items-center transition-transform transform hover:scale-105 hover:z-10"
          >
            <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
            Email
          </a>

          <a
            href="https://wa.me/6289680768061"
            className="text-white hover:text-gray-400 flex items-center mr-5 transition-transform transform hover:scale-105 hover:z-10"
          >
            <FontAwesomeIcon icon={faWhatsapp} className="mr-2" />
            WhatsApp
          </a>

          <a
            href="https://www.instagram.com/nvrn_a/"
            className="text-white hover:text-gray-400 flex items-center transition-transform transform hover:scale-105 hover:z-10"
          >
            <FontAwesomeIcon icon={faInstagram} className="mr-2" />
            Instagram
          </a>
        </div>
        <ContactMap />
      </div>
    </div>
  );
}

export default ContactLinks;
