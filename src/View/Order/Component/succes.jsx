import React, { useEffect } from "react";
import sukses from "../../../Asset/sukses.png";
import { useAppContext } from "../../../Utils/GlobalState";
import { sendWhatsAppMessage } from "../../../Service/API";
import formatRupiah from "../../../Utils/Format";
import DetailNotFound from "../../Home/Component/NotFound";
import { useNavigate, useParams } from "react-router-dom"; 

function Success() {
  const { state } = useAppContext();
  const { orderData } = state || {};
  const navigate = useNavigate();
  
  useEffect(() => {
    document.title = `OmYoo-Studio | Succes`;
  });

  const handleContactAdmin = () => {
    if (orderData) {
      sendWhatsAppMessage(orderData);
    }
  };

  if (orderData == null) {
    navigate("/*");
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-600 p-12">
        <div className="bg-white rounded-xl text-center p-12 flex flex-col items-center shadow-2xl drop-shadow-2xl shadow-green-800">
          <DetailNotFound />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-600 p-12">
      <div className="bg-white rounded-xl text-center p-12 flex flex-col items-center shadow-2xl drop-shadow-2xl shadow-green-800">
        <h1 className="text-3xl font-semibold mb-4">Payment Successful!</h1>
        <div className="flex items-center justify-center mb-4">
          <img src={sukses} alt="Success" className="w-40 h-50" />
        </div>
        <p className="text-gray-600">Thank you for your order.</p>

        <p className="text-gray-600">
          Please check your email for payment proof.
        </p>

        {orderData && (
          <div className="text-left mt-4">
            <h2 className="text-xl font-semibold mb-2">Order Details:</h2>
            <p>Product: {orderData.nm_product}</p>
            <p>Price: {formatRupiah(orderData.price)}</p>
            <p>Name: {orderData.name}</p>
            <p>Contact: {orderData.contact}</p>
            <p>Email: {orderData.email}</p>
            <p>Address: {orderData.address}</p>
            <p>Date: {orderData.date}</p>
            <p>Time: {orderData.time}</p>
          </div>
        )}

        <div className="flex flex-col md:flex-row mt-6">

          <a
            href="/"
            className="inline-block px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition duration-300 mb-4 md:mb-0"
          >
            Back to Home
          </a>
          <button
            onClick={handleContactAdmin}
            className="inline-block px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition duration-300 mb-4 md:mb-0 md:ml-2"
          >
            Contact Admin
          </button>
        </div>
      </div>
    </div>
  );
}

export default Success;
