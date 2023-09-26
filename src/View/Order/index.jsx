import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../../Service/API";
import HeaderOrder from "./Component/Navbar";
import formatRupiah from "../../Utils/Format";
import CustomAlert from "./Component/CustomeAlert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import Footer from "../Home/Component/Footer";
import { useAppContext } from "../../Utils/GlobalState";

function FormOrder() {
  const navigate = useNavigate();
  const { setGlobalState } = useAppContext();
  const location = useLocation();
  const [isFormValid, setIsFormValid] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertTime, setShowAlertTime] = useState(false);
  const [showAlertEmail, setShowAlertEmail] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    nama: "",
    kontak: "",
    alamat: "",
    email: "",
    tanggal: "",
    waktu: "",
  });

  useEffect(() => {
    document.title = "OmYoo-Studio | OrderNow";
  });

  useEffect(() => {
    if (!location.state || !location.state.productData) {
      navigate("/");
    }
  }, [location.state, navigate]);

  const productData = location.state ? location.state.productData : null;

  const handleNamaChange = (event) => {
    const nama = event.target.value;
    const isValid = nama.length >= 3;
    setIsFormValid(isValid);
    setFormData((prevData) => ({
      ...prevData,
      nama: nama,
    }));
  };

  const handleKontakChange = (event) => {
    const kontak = event.target.value;
    const isValid = /^\d+$/.test(kontak);
    setIsFormValid(isValid);
    setFormData((prevData) => ({
      ...prevData,
      kontak: kontak,
    }));
  };

  const handleEmailChange = (event) => {
    const email = event.target.value;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    const isValidEmail = emailPattern.test(email);
    setIsFormValid(isValidEmail); // Set isFormValid based on email validity

    setFormData((prevData) => ({
      ...prevData,
      email: email,
      emailError: isValidEmail ? "" : "Invalid Email",
    }));

    if (!isValidEmail) {
      setShowAlertEmail(true);
    }
  };

  const handleAlamatChange = (event) => {
    const alamat = event.target.value;
    setIsFormValid(alamat);
    setFormData((prevData) => ({
      ...prevData,
      alamat: alamat,
    }));
  };

  const handleTanggalChange = (event) => {
    setFormData({
      ...formData,
      tanggal: event.target.value,
    });
  };

  const handleWaktuChange = (e) => {
    const selectedTime = e.target.value;
    const minTime = "10:00";
    const maxTime = "16:00";

    const selectedTimeObj = new Date(`2000-01-01T${selectedTime}`);
    const minTimeObj = new Date(`2000-01-01T${minTime}`);
    const maxTimeObj = new Date(`2000-01-01T${maxTime}`);

    if (selectedTimeObj >= minTimeObj && selectedTimeObj <= maxTimeObj) {
      setFormData({ ...formData, waktu: selectedTime });
    } else {
      setShowAlertTime(true);
      setFormData({ ...formData, waktu: minTime });
    }
  };

  const handleOrderButtonClick = async () => {
    setLoading(true);
    if (
      !formData.nama ||
      !/^\d+$/.test(formData.kontak) ||
      !formData.email ||
      !formData.alamat ||
      !formData.tanggal ||
      !formData.waktu
    ) {
      setLoading(false);
      return;
    }

    const orderData = {
      id_product: productData.id,
      nm_product: productData.title,
      price: productData.price,
      name: formData.nama,
      contact: formData.kontak,
      email: formData.email,
      address: formData.alamat,
      date: formData.tanggal,
      time: formData.waktu,
    };

    try {
      const response = await fetch(`${API_ENDPOINTS.ORDER}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const midtransResponse = await response.json();
        const { redirectUrl, order_id } = midtransResponse;

        setGlobalState({
          redirectUrl,
          order_id,
          orderData: orderData,
        });

        const orderStatusResponse = await fetch(
          `${API_ENDPOINTS.STATUS}/${order_id}`
        );

        if (orderStatusResponse.ok) {
          const orderStatusData = await orderStatusResponse.json();
          const { status } = orderStatusData;

          if (status === "settled") {
            navigate("/sukses");
          } else {
            navigate("/pending");
          }
        }
      } else {
        setShowAlert(true);
      }
    } catch (error) {
      setShowAlert(true);
      console.log("payment sudha ada");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseAlert = () => {
    setShowAlertTime(false);
    setShowAlert(false);
    setShowAlertEmail(false);
  };

  return (
    <div>
      <HeaderOrder />
      <div className="container mx-auto  p-12 ">
        {productData ? (
          <>
            <div className="border-b-2 border-gray-400 p-4 mb-8">
              <h2 className="text-3xl font-semibold mb-4 text-white bg-black shine p-4 rounded-full w-60">
                Your Package :{" "}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 border-b-2 border-gray-400 ">
              <div className="md:col-span-1 ">
                <img
                  src={productData.imageUrl}
                  alt={productData.title}
                  className="w-full rounded-2xl mb-8 border-2 border-black hover:scale-95 transition-all delay-150 shadow-2xl drop-shadow-2xl shadow-slate-900"
                />
              </div>
              <div className="md:col-span-1">
                <h3 className="text-2xl font-bold mb-2 ">
                  {productData.title}
                </h3>
                <ul className="flex flex-col space-y-2 mt-4">
                  {productData.features.map((benefitsGroup, index) => (
                    <li key={index}>
                      <h3 className="font-semibold">Benefits:</h3>
                      <ul className="ml-4 space-y-1">
                        {benefitsGroup.map((benefit, benefitIndex) => (
                          <li
                            key={benefitIndex}
                            className="flex items-center space-x-2"
                          >
                            <FontAwesomeIcon
                              icon={faCheckCircle}
                              className="text-green-500"
                            />
                            <span className=" p-2">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>

                <p className="text-gray-600 mb-4 mt-4">
                  {productData.description}
                </p>
                <p className="text-lg font-semibold mb-4">
                  Price: {formatRupiah(productData.price)}
                </p>
              </div>
            </div>

            <div>
              <p className="text-3xl font-semibold mb-4 text-white bg-black shine p-2 rounded-full w-52 top-12 justify-center items-center flex left-10">
                Form Order
              </p>
            </div>

            <form className="mt-6 p-5 border border-gray-400 rounded-lg">
              <div className="mb-4 mt-6">
                <label htmlFor="nama" className="block text-gray-600">
                  Name:
                </label>
                <input
                  type="text"
                  id="nama"
                  name="nama"
                  placeholder="Enter your name here"
                  className="border border-gray-300 px-3 py-2 rounded-md w-full"
                  onChange={handleNamaChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="kontak" className="block text-gray-600">
                  Contact:
                </label>
                <input
                  type="text"
                  id="kontak"
                  name="kontak"
                  className="border border-gray-300 px-3 py-2 rounded-md w-full"
                  onChange={handleKontakChange}
                  required
                  placeholder="Enter your contact here"
                  pattern="[0-9]*"
                  title="Kontak hanya boleh diisi dengan angka"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-600">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`border border-gray-300 px-3 py-2 rounded-md w-full ${
                    formData.emailError ? "border-red-500" : ""
                  }`}
                  onChange={handleEmailChange}
                  placeholder="example@email.com"
                  required
                  title="Email tidak valid"
                />
                {formData.emailError && (
                  <p className="text-red-500 text-sm mt-1">
                    {formData.emailError}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="tanggal" className="block text-gray-600">
                  Date:
                </label>
                <input
                  type="date"
                  id="tanggal"
                  name="tanggal"
                  className="border border-gray-300 px-3 py-2 rounded-md w-full"
                  value={formData.tanggal}
                  onChange={handleTanggalChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="waktu" className="block text-gray-600">
                  Time:
                </label>
                <input
                  type="time"
                  id="waktu"
                  name="waktu"
                  className="border border-gray-300 px-3 py-2 rounded-md w-full"
                  value={formData.waktu}
                  onChange={handleWaktuChange}
                  required
                />
                {showAlertTime && (
                  <CustomAlert
                    message="Sorry , but our service is only available from 10:00 AM to 4:00 PM (10:00 to 16:00)."
                    onClose={handleCloseAlert}
                  />
                )}
                {showAlert && (
                  <CustomAlert
                    message="Sorry, the service is currently unavailable during that time. For further assistance, please contact us through the 'Contact Us' section."
                    onClose={handleCloseAlert}
                  />
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="alamat" className="block text-gray-600 ">
                  Address:
                </label>
                <textarea
                  id="alamat"
                  name="alamat"
                  placeholder="Enter your address here"
                  className="border border-gray-300 px-3 py-2 rounded-md w-full"
                  onChange={handleAlamatChange}
                  required
                ></textarea>
              </div>

              {loading ? (
                <div className="loader-container ">
                  <div className="custom-loader">
                    <div className="loader" />
                  </div>
                </div>
              ) : (
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleOrderButtonClick}
                    className={`${
                      formData.nama &&
                      /^\d+$/.test(formData.kontak) &&
                      formData.email &&
                      formData.alamat &&
                      formData.tanggal &&
                      formData.waktu
                        ? "bg-gray-900 hover:bg-gray-600 hover:scale-110 transition-all delay-75"
                        : "bg-gray-300 cursor-not-allowed"
                    } text-white px-4 py-2 rounded-md`}
                    disabled={
                      !(
                        formData.nama &&
                        /^\d+$/.test(formData.kontak) &&
                        formData.email &&
                        formData.alamat &&
                        formData.tanggal &&
                        formData.waktu
                      )
                    }
                  >
                    Order Now
                  </button>
                </div>
              )}
            </form>
          </>
        ) : null}
      </div>
      <Footer />
    </div>
  );
}

export default FormOrder;
