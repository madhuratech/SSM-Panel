import React, { useState } from "react";

const PackagesPage = () => {
  const [quality, setQuality] = useState("regular");

  const [values, setValues] = useState({
    likes: 850,
    views: 5000,
    followers: 350,
    shares: 550,
  });

  const pricingData = {
    regular: {
      likes: { pricePerUnit: 0.008, min: 250, max: 3000 },
      views: { pricePerUnit: 0.0004, min: 1000, max: 10000 },
      followers: { pricePerUnit: 0.014, min: 100, max: 1000 },
      shares: { pricePerUnit: 0.007, min: 50, max: 1000 },
    },
    high: {
      likes: { pricePerUnit: 0.009 },
      views: { pricePerUnit: 0.0005 },
      followers: { pricePerUnit: 0.016 },
      shares: { pricePerUnit: 0.0085 },
    },
  };

  const calculatePrice = (type) => {
    const unitPrice = pricingData[quality][type].pricePerUnit;
    return (values[type] * unitPrice).toFixed(2);
  };

  const calculateTotal = () => {
    let total = 0;

    Object.keys(values).forEach((type) => {
      const unitPrice = pricingData[quality][type].pricePerUnit;
      total += values[type] * unitPrice;
    });

    return total.toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">
      <div className="w-full max-w-6xl flex gap-8">

        {/* LEFT SIDE */}
        <div className="w-1/3 space-y-6">
          <div className="bg-white rounded-3xl shadow p-6">
            <div className="space-y-2 text-sm">
              {Object.keys(values).map((type) => (
                <div key={type} className="flex justify-between">
                  <span>{values[type]} {type}</span>
                  <span>${calculatePrice(type)}</span>
                </div>
              ))}
            </div>

            <div className="border-t mt-4 pt-4 flex justify-between font-semibold">
              <span>Total</span>
              <span>${calculateTotal()}</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-2/3 bg-purple-100 rounded-3xl shadow p-8">

          {/* Toggle */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setQuality("high")}
              className={`px-6 py-2 rounded-full ${
                quality === "high"
                  ? "bg-purple-600 text-white"
                  : "bg-white"
              }`}
            >
              High Quality
            </button>

            <button
              onClick={() => setQuality("regular")}
              className={`px-6 py-2 rounded-full ${
                quality === "regular"
                  ? "bg-purple-600 text-white"
                  : "bg-white"
              }`}
            >
              Regular
            </button>
          </div>

          {/* Sliders */}
          {Object.keys(values).map((type) => (
            <div key={type} className="bg-white p-6 rounded-2xl mb-6">
              <div className="flex justify-between mb-2">
                <span className="capitalize">{type}</span>
                <span>${calculatePrice(type)}</span>
              </div>

              <input
                type="range"
                min={pricingData.regular[type].min}
                max={pricingData.regular[type].max}
                value={values[type]}
                onChange={(e) =>
                  setValues({
                    ...values,
                    [type]: Number(e.target.value),
                  })
                }
                className="w-full"
              />

              <div className="text-sm mt-2">{values[type]}</div>
            </div>
          ))}

          <div className="flex justify-end">
            <div className="bg-white px-6 py-3 rounded-full">
              Total: <b>${calculateTotal()}</b>
            </div>
          </div>

          <button className="w-full bg-purple-600 text-white py-3 rounded-full hover:bg-purple-700 transition">
            Continue to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackagesPage;