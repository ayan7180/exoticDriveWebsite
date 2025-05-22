import { brands as brandsData } from "./data/brands.js";
import { useState, useEffect } from "react";

const Brands = () => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    setBrands(brandsData);
  }, []);

  return (
    <>
      <div className="brands-page bg-black min-h-screen p-6">
        <h1 className="text-4xl font-bold text-red-600 mb-8 text-center">
          Our Brands
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="bg-gray-900 border border-red-600 rounded-2xl p-5 shadow-xl hover:scale-105 transition-transform duration-300"
            >
              <img
                src={brand.logo}
                alt={`${brand.brandName} logo`}
                className="w-full h-32 object-contain mb-4 bg-white rounded"
              />
              <h2 className="text-2xl font-semibold text-red-500 mb-1">
                {brand.brandName}
              </h2>
              <p className="text-gray-300 mb-2">{brand.description}</p>
              <p className="text-gray-400 text-sm">
                <strong className="text-red-400">Popular Models:</strong>{" "}
                {brand.popularModels}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Brands;
