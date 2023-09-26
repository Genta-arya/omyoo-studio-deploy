import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaCalendarAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaMapMarkerAlt,
} from "react-icons/fa"; // Import ikon-ikon yang diperlukan
import { API_ENDPOINTS } from "../../../Service/API";

const BookedOrders = () => {
  const [bookedOrders, setBookedOrders] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [years, setYears] = useState([]);
  const [loading, setLoading] = useState(false); 

  
  const fetchBookedOrders = () => {
    setLoading(true); 

    axios
      .get(`${API_ENDPOINTS.ORDERS}`)
      .then((response) => {
        
    
        const settledOrders = response.data.filter(
          (order) => order.status === "settled"
        );
        setBookedOrders(settledOrders);

        const uniqueYears = Array.from(
          new Set(
            settledOrders.map((order) => new Date(order.date).getFullYear())
          )
        );
        setYears(uniqueYears);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        
      })
      .finally(() => {
        setLoading(false); 
      });
  };

  const handleYearChange = (event) => {
    const newYear = event.target.value;
    setSelectedYear(newYear);
  };

  useEffect(() => {
    fetchBookedOrders();
  }, [selectedYear]);

  return (
    <div className="container mx-auto p-8 rounded-2xl border-2 border-gray-600">
      <h2 className="text-3xl font-semibold mb-12 rounded-full w-60 text-center bg-black text-white p-2">
        Our Schedule
      </h2>

      <div className="mb-4 flex items-center">
        <FaCalendarAlt className="mr-2 text-gray-500" />
        <label className="block text-lg font-medium mb-1 mr-2">
          Pilih Tahun
        </label>
        <select
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
          value={selectedYear}
          onChange={handleYearChange}
        >
          <option value="">Semua Tahun</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {loading ? ( 
        <div className="loader-container">
          <div className="custom-loader">
            <div className="loader" />
          </div>
        </div>
      ) : bookedOrders.length === 0 ? (
        <p className="text-lg">Tidak ada orderan yang ditemukan.</p>
      ) : (
        <div className="flex flex-wrap -mx-4">
          {bookedOrders
            .filter((order) =>
              selectedYear
                ? new Date(order.date).getFullYear() === parseInt(selectedYear)
                : true
            )
            .map((order) => (
              <div key={order.uid} className="w-96 px-4 mb-4">
                <div className="bg-white rounded-lg shadow-md p-4 border-2 border-gray-500">
                  <div className="flex items-center mb-2 border-2 p-2 border-gray-500">
                    <FaCalendarAlt className="mr-2 text-gray-500" />
                    <p className="text-lg font-semibold">
                      Tanggal: {new Date(order.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center mb-2 border-2 p-2 border-gray-500">
                    <FaPhone className="mr-2 text-gray-500" />
                    <p className="text-lg">
                      <a href={`https://wa.me/62${order.contact}`}>
                        {order.contact}
                      </a>
                    </p>
                  </div>
                  <div className="flex items-center mb-2 border-2 p-2 border-gray-500">
                    <FaEnvelope className="mr-2 text-gray-500" />
                    <p className="text-lg ">
                      <a href={`mailto:${order.email}`}>{order.email}</a>
                    </p>
                  </div>
                  <div className="flex items-center mb-2 border-2 p-2 border-gray-500">
                    <FaClock className="mr-2 text-gray-500" />
                    <p className="text-lg">{order.time}</p>
                  </div>
                  <div className="flex items-center mb-2 border-2 p-2 border-gray-500">
                    <FaMapMarkerAlt className="mr-2 text-gray-500" />
                    <p className="text-lg">{order.addres}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default BookedOrders;
