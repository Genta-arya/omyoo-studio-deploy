import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { sendWhatsAppMessage } from "../../../Service/API";
import sukses from "../../../Asset/fail.png";
import formatRupiah from "../../../Utils/Format";

function FailedPage() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `OmYoo-Studio | Failed`;
  });
  

  const orderData = location.state ? location.state.orderData : null;



  const handleContactAdminClick = () => {
    sendWhatsAppMessage(orderData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-600 p-12">
      <div className="bg-white  rounded-xl text-center  p-12 flex flex-col items-center shadow-2xl drop-shadow-2xl shadow-red-800">
        <h1 className="text-3xl font-semibold mb-4">Payment Failed</h1>
        <div className="flex items-center justify-center mb-4">
          <img src={sukses} alt="Success" className="w-40 h-50" />
        </div>
        <p className="text-gray-600">
          Your payment was not successful. You can try placing the order again.
        </p>
        <p>You can try placing the order again.</p>

        
        <div className="mt-6">
          <a
            href="/"
            className="inline-block px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition duration-300 mb-4"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}

export default FailedPage;
