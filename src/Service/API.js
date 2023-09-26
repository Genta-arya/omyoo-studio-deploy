import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_API_URL;

const API_ENDPOINTS = {
  ORDER: `${API_BASE_URL}order`,
  ORDERS: `${API_BASE_URL}orders`,
  STATUS: `${API_BASE_URL}order-status`,
  Login: `${API_BASE_URL}login`,
  CheckEmail: `${API_BASE_URL}check-email`,
  ForgotPassowrd: `${API_BASE_URL}forgot-password`,
  VerifOtp: `${API_BASE_URL}verify-token`,
  DeleteOtp: `${API_BASE_URL}delete-token`,
  UpdatePassword: `${API_BASE_URL}update-password`,
  CheckUser: `${API_BASE_URL}get-username`,

};

const sendWhatsAppMessage = (orderData) => {
  if (!orderData) {
    console.error("Order data is missing.");
    return;
  }
  const websiteURL = "https://omyoo-studio.vercel.app/";
  const phoneNumber = "6289680768061";
  const message = `Hello, I would like to order the product ${orderData.nm_product} with the following details:
      Store: ${websiteURL}
      Product Name: ${orderData.nm_product}
      Price: ${orderData.price}
      Name: ${orderData.name}
      Contact: ${orderData.contact}
      Email: ${orderData.email}
      Address: ${orderData.address}
      Time: ${orderData.time}
      Date: ${orderData.date}
  
      Please confirm this order.`;

  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  window.open(whatsappURL, "_blank");
};

export { sendWhatsAppMessage, API_ENDPOINTS };

const login = async (email, password) => {
  try {
    const response = await axios.post(API_ENDPOINTS.Login, { email, password });

    if (response.status === 200) {
      const token = response.data.token;

      return { status: 200, data: { token } };
    }
  } catch (error) {
    return { status: 401 };
  }
};
export default login;
