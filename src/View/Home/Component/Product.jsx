import React, { useEffect, useState } from "react";
import products from "../../../Model/ProductData";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../../../Style/Content.css";

import { useNavigate } from "react-router-dom";
import formatRupiah from "../../../Utils/Format";

function ProductLayout() {
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

   
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleOrderClick = async (product) => {
    navigate("/form-order", { state: { productData: product } });
    
  };
  return (
    <div
      className="container mx-auto mt-12 bg-gray-200 rounded-full p-8 border-2 pb-16"
      id="productInfo"
    >
      <h2 className="text-3xl font-bold mb-4 text-center text-white bg-black w-60 rounded-full p-2 shines">
        Our Products
      </h2>
      {isMobile ? (
        <Carousel
          showThumbs={false}
          infiniteLoop={true}
          showStatus={false}
          swipeable={true}
          emulateTouch={true}
          className="mobile-carousel"
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded-lg shadow-md relative drop-shadow-2xl"
            >
              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <p className="text-lg font-semibold">{formatRupiah(product.price)}</p>
              <a
                onClick={() => handleOrderClick(product)}
                className="bg-gray-700 text-white px-4 py-2 mt-2 rounded-md hover:bg-gray-800 text-center block mb-8"
                style={{ cursor: "pointer" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                Order Now
              </a>
            </div>
          ))}
        </Carousel>
      ) : (
        <div className={`grid sm:grid-cols-2 md:grid-cols-3 gap-6`}>
          {products.map((product) => (
            <div
              key={product.id}
              className={`bg-white p-4 rounded-lg shadow-md relative drop-shadow-2xl`}
            >
              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-full h-40 rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <p className="text-lg font-semibold">{formatRupiah(product.price)}</p>
              <a
                onClick={() => handleOrderClick(product)}
                className="bg-gray-700 text-white px-4 py-2 mt-4 rounded-md hover:bg-gray-800 absolute bottom-4 right-4 animate-none hover:scale-110 transition-all delay-75"
                style={{ cursor: "pointer" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                Order Now
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductLayout;
