import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Maintenance",
    },
  },
};

// Month names for display
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function BarChart() {
  const token = localStorage.getItem("access_token");
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Maintenance by months",
        data: [],
        backgroundColor: "rgba(104, 104, 104, 0.6)",
      },
    ],
  });

  const fetchMaintenanceData = () => {
    if (!token) {
      console.error("No access token found");
      return;
    }

    axios
      .get(
        "https://projectestate.onrender.com/api/dashboard/maintenance-by-month",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        const apiData = response.data;

        const labels = [];
        const data = [];

        Object.entries(apiData).forEach(([key, value]) => {
          const [year, month] = key.split("-");
          const monthIndex = parseInt(month, 10) - 1;
          const monthName = monthNames[monthIndex] + " " + year;

          labels.push(monthName);
          data.push(value);
        });

        setChartData({
          labels,
          datasets: [
            {
              label: "Maintenance by months",
              data,
              backgroundColor: "rgba(104, 104, 104, 0.6)",
            },
          ],
        });
      })
      .catch((err) => {
        console.log("Error fetching data", err);
      });
  };

  useEffect(() => {
    fetchMaintenanceData();
  }, [token]);

  return (
    <div>
      <Bar options={options} data={chartData} />
    </div>
  );
}
