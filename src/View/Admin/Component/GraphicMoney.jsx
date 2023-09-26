import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import { API_ENDPOINTS } from "../../../Service/API";

const EarningsChart = () => {
  const [earningsData, setEarningsData] = useState({});
  const [loading, setLoading] = useState(true);
  const [chartInstance, setChartInstance] = useState(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [availableYears, setAvailableYears] = useState([]); 

  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value));
  };

  useEffect(() => {
    axios
      .get(`${API_ENDPOINTS.ORDERS}`)
      .then((response) => {
        const orderData = response.data;

    
        const settledOrders = orderData.filter((order) => order.status === "settled");

    
        const uniqueYears = Array.from(
          new Set(settledOrders.map((order) => new Date(order.date).getFullYear()))
        );
        setAvailableYears(uniqueYears);

        const filteredOrders = settledOrders.filter((order) => {
          const orderYear = new Date(order.date).getFullYear();
          return orderYear === selectedYear;
        });

        const monthlyEarnings = {};
        filteredOrders.forEach((order) => {
          const date = new Date(order.date);
          const month = date.toLocaleString("default", { month: "long" });

          if (monthlyEarnings[month]) {
            monthlyEarnings[month] += order.price;
          } else {
            monthlyEarnings[month] = order.price;
          }
        });

        const chartData = {
          labels: Object.keys(monthlyEarnings),
          datasets: [
            {
              label: `Penghasilan Bulanan (${selectedYear})`,
              data: Object.values(monthlyEarnings),
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 2,
            },
          ],
        };

        setEarningsData(chartData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [selectedYear]);

  useEffect(() => {
    if (!loading) {
      if (chartInstance) {
        chartInstance.destroy();
      }
      const ctx = document.getElementById("earningsChart").getContext("2d");
      const newChartInstance = new Chart(ctx, {
        type: "bar",
        data: earningsData,
        options: {
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Penghasilan (Rp)",
              },
            },
          },
        },
      });
      setChartInstance(newChartInstance);
    }
  }, [earningsData, loading]);

  return (
    <div>
      <h2 className="text-3xl text-center font-semibold text-white bg-black rounded-2xl p-2 mb-12">
        Statistik Penghasilan
      </h2>
      <div className="flex items-center space-x-2 mb-4">
        <label className="text-black">Pilih Tahun:</label>
        <select
          className="bg-gray-300 text-gray-800 p-2 rounded-md"
          value={selectedYear}
          onChange={handleYearChange}
        >
          {availableYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <canvas id="earningsChart" width="400" height="200"></canvas>
    </div>
  );
};

export default EarningsChart;
