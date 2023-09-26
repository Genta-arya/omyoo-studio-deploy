import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import { API_ENDPOINTS } from "../../../Service/API";

const SalesChart = () => {
  const [salesData, setSalesData] = useState({});
  const [loading, setLoading] = useState(true);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_ENDPOINTS.ORDERS}`)
      .then((response) => {
        const orderData = response.data;

     
        const settledOrders = orderData.filter((order) => order.status === "settled");

        const productCount = {};
        settledOrders.forEach((order) => {
          const productId = order.nm_product;
          if (productCount[productId]) {
            productCount[productId]++;
          } else {
            productCount[productId] = 1;
          }
        });

        const chartData = {
          labels: Object.keys(productCount),
          datasets: [
            {
              label: "Jumlah Terjual",
              data: Object.values(productCount),
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 2,
            },
          ],
        };

        setSalesData(chartData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!loading) {
      if (chartInstance) {
        chartInstance.destroy();
      }
      const ctx = document.getElementById("salesChart").getContext("2d");
      const newChartInstance = new Chart(ctx, {
        type: "bar",
        data: salesData,
        options: {
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Jumlah Terjual",
              },
            },
          },
        },
      });
      setChartInstance(newChartInstance);
    }
  }, [salesData, loading]);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="custom-loader">
          <div className="loader" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl text-center font-semibold text-white bg-black rounded-2xl p-2 mb-12">
        Statistik Penjualan
      </h2>
      <div className="chart-container">
        <canvas id="salesChart" width="400" height="200"></canvas>
      </div>
    </div>
  );
};

export default SalesChart;
