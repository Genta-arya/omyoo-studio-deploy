import React, { useEffect, useState } from "react";
import background from "../../../Asset/fail.png";
import { useNavigate } from "react-router-dom";

const Mobile = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth > 768);
 

  useEffect(() => {
    if (isMobile) {
      navigate("/dashboard");
    }
  }, [isMobile, navigate]);

  return (
    <div className="container mx-auto 3 p-5">
      <div className="flex justify-center items-center h-96 ">
        <div
          className="bg-cover bg-center w-60 h-60 border-2 border-red-600 rounded-full"
          style={{
            backgroundImage: `url(${background})`,
          }}
        ></div>
      </div>
      <div className="text-center border-2 border-gray-700 p-4">
        <h2 className="text-2xl font-bold mb-4 ">
          Akses dari Perangkat Mobile di tolak
        </h2>
        <p className="text-gray-600">
          Maaf, kami menyarankan untuk mengakses situs web ini dari perangkat
          desktop atau tablet.
        </p>
      </div>
    </div>
  );
};

export default Mobile;
