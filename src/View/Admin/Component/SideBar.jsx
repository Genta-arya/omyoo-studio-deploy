import React, { useState,useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faUser } from "@fortawesome/free-solid-svg-icons";
import Produk from "./Produk";
import bg from "../../../Asset/icon.png";
import { useNavigate } from "react-router-dom";
import "../../../Style/Content.css";
import BookedOrders from "./Booked";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedMenuItem, setSelectedMenuItem] = useState("Produk");
  const username = localStorage.getItem("username");



  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
    if (!isSidebarOpen) {
      setIsSidebarOpen(true);
    }

    if (menuItem === "Logout") {
      localStorage.removeItem("token");

      navigate("/login-admin");
    }
    if (menuItem === "Beranda") {
      localStorage.removeItem("token");

      navigate("/");
    }
  };

  return (
    <div className="flex ">
      <div
        className={`${
          isSidebarOpen ? "sidebar open w-64" : "sidebar closed"
        }  min-h-screen py-4 px-4 bg-gray-900 text-white`}
      >
        <img src={bg} alt="Logo" className="mx-auto rounded-2xl mt-12" />
          <h1 className={`text-2xl font-semibold mt-5 items-center justify-center flex `}>Dashboard</h1>
        <div className="flex items-center justify-center gap-4 mt-2 mb-12 border-b-2 border-white p-2">
          <FontAwesomeIcon icon={faUser} size="lg" />
          <p className="text-sm mt-2 ">{username}</p>
        </div>
        <ul className="space-y-2 mt-4 ml-2 ">
    
        <li className="border-b-2 border-white p-2">
            <button
              onClick={() => handleMenuItemClick("Produk")}
              className={`${
                selectedMenuItem === "Produk"
                  ? "bg-gray-800  rounded-xl border-b-2 border-white p-2"
                  : ""
              }`}
            >
              Graphic
            </button>
          </li>

          <li className="border-b-2 border-white p-2">
            <button
              onClick={() => handleMenuItemClick("Jadwal")}
              className={`${
                selectedMenuItem === "Jadwal"
                  ? "bg-gray-800  rounded-xl border-b-2 border-white p-2"
                  : ""
              }`}
            >
              Jadwal
            </button>
          </li>

    
          <li className="border-b-2 border-white p-2">
            <button
              onClick={() => handleMenuItemClick("Beranda")}
              className={`${
                selectedMenuItem === "Beranda"
                  ? "bg-gray-800 p-2 rounded-xl"
                  : ""
              }`}
            >
              Store
            </button>
          </li>

      
          <li className="border-b-2 border-white p-2">
            <button
              onClick={() => handleMenuItemClick("Logout")}
              className={`${
                selectedMenuItem === "Logout"
                  ? "bg-gray-800 p-2 rounded-xl"
                  : ""
              }`}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
      <div className={`flex-1 p-12 ml-${isSidebarOpen ? "60" : "0"}`}>
        <button
          onClick={toggleSidebar}
          className=" top-4 left-4 text-white focus:outline-none z-50 absolute"
        >
          {isSidebarOpen ? (
            <FontAwesomeIcon icon={faTimes} size="lg" />
          ) : (
            <FontAwesomeIcon
              icon={faBars}
              size="lg"
              color="black"
              className="bg-white rounded-full p-4 shadow-2xl drop-shadow-2xl shadow-gray-800  transform hover:scale-95 transition-transform duration-300"
            />
          )}
        </button>

        {selectedMenuItem === "Produk" && <Produk />}
        {selectedMenuItem === "Jadwal" && <BookedOrders />}
      </div>
    </div>
  );
};

export default Sidebar;
