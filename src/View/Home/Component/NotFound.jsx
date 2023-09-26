import React from "react";
import { Link } from "react-router-dom";
import background from "../../../Asset/not_found.png";


const DetailNotFound = () => {
  return (
    <div className="container mx-auto mt-3">
      <div className="flex justify-center items-center h-96 mt-5">
        <div
          className="bg-cover bg-center w-full h-full"
          style={{
            backgroundImage: `url(${background})`,
          }}
        ></div>
      </div>
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Upss, Halaman Tidak Ditemukan</h2>
        <p className="text-gray-600">Maaf, halaman yang Anda cari belum tersedia.</p>
        <Link to="/" className="text-blue-500 hover:text-blue-700">Kembali ke Beranda</Link>
      </div>
 
    </div>
  );
};

export default DetailNotFound;