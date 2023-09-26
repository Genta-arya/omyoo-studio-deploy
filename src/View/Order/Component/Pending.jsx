import React, { useEffect, useState } from "react";
import pendingImage from "../../../Asset/Pending.png";
import { useAppContext } from "../../../Utils/GlobalState";
import { useNavigate, useParams } from "react-router-dom";
import DetailNotFound from "../../Home/Component/NotFound";
import { API_ENDPOINTS } from "../../../Service/API";

function Pending() {
  const { state } = useAppContext();
  const { redirectUrl, order_id } = state || {};
  const navigate = useNavigate();

  const [orderStatus, setOrderStatus] = useState("pending");


  useEffect(() => {
    document.title = `OmYoo-Studio | Payment`;
  });

  useEffect(() => {
    const fetchOrderStatus = () => {
      fetch(`${API_ENDPOINTS.STATUS}/${order_id}`)
        .then((response) => response.json())
        .then((data) => {
          const { status } = data;
          setOrderStatus(status);

          if (status === "settled") {
            navigate("/sukses");
          } else if (status === "canceled" || status === "expired") {
            navigate("/gagal");
          } else if (status === "pending") {
            navigate("/pending");
          }
        })
        .catch((error) => {
          console.error("Error checking order status:", error);
        });
    };

    const intervalId = setInterval(fetchOrderStatus, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, [order_id, navigate]);

  if (redirectUrl === null || order_id === null) {
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
        <h1 className="text-3xl font-semibold mb-4">Payment Pending</h1>
        <div className="flex items-center justify-center mb-4">
          <img src={pendingImage} alt="Pending" className="w-40 h-50" />
        </div>
        <p className="text-gray-600">Thank you for your order.</p>
        <p className="text-gray-600">Please complete your payment soon.</p>

        <div className="mt-6">
          <a
            href={"/"}
            className="inline-block px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition duration-300 mb-4"
          >
            Back to Home
          </a>
          {redirectUrl && order_id && (
            <a
              href={redirectUrl}
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-block px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition duration-300 mb-4 ml-2"
            >
              Complete Payment
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default Pending;
