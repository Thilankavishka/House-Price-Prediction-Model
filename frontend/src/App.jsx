import React, { useState } from "react";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({
    longitude: "",
    latitude: "",
    housing_median_age: "",
    total_rooms: "",
    total_bedrooms: "",
    population: "",
    households: "",
    median_income: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: parseFloat(e.target.value),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/predict",
        formData,
      );
      setResult(response.data.predicted_house_value);
    } catch (error) {
      alert("Backend connection error");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          🏠 AI House Price Predictor
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {Object.keys(formData).map((key) => (
            <input
              key={key}
              type="number"
              step="any"
              name={key}
              placeholder={key.replace(/_/g, " ")}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          ))}

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-300"
            >
              {loading ? "Predicting..." : "Predict House Price"}
            </button>
          </div>
        </form>

        {result && (
          <div className="mt-6 text-center">
            <h2 className="text-xl font-semibold text-gray-700">
              💰 Predicted Value:
            </h2>
            <p className="text-3xl font-bold text-indigo-600 mt-2">
              ${result.toFixed(2)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
