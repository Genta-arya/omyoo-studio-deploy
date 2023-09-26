import React, { useEffect } from "react";

const CustomAlert = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center p-5">
      <div className="bg-red-500 text-white px-4 py-2 rounded shadow-md">
        <p>{message}</p>
        <button
          className="absolute top-2 right-2 text-white hover:text-red-200"
          onClick={onClose}
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default CustomAlert;
