import React from "react";
import products from "../../../Model/ProductData";
import formatRupiah from "../../../Utils/Format";
import MostPopularProducts from "./Graphic";
import EarningsChart from "./GraphicMoney";

const Produk = () => {
  return (
    <div className=" rounded-2xl border-2 border-gray-600 p-8">
      <h1 className="text-3xl font-semibold  text-center text-white bg-black w-60 rounded-2xl p-2  mb-4">
        Daftar Produk
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4  rounded-lg drop-shadow-2xl shadow-2xl shadow-gray-500 mb-12">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-800">
              {product.name}
            </h2>
            <p className="text-gray-600">{product.description}</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-gray-500 font-semibold text-xl">
                {formatRupiah(product.price.toFixed(2))}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className=" mt-8">
        <MostPopularProducts />
      </div>

      <div className=" mt-8">
        <EarningsChart />
      </div>
    </div>
  );
};

export default Produk;
