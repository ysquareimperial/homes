import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutChart() {
  const [maleCount, setMaleCount] = useState(0);
  const [femaleCount, setFemaleCount] = useState(0);
  const token = localStorage.getItem("access_token");

  const fetchTenantsByGender = () => {
    if (!token) {
      console.error("No access token found");
      return;
    }

    axios
      .get("https://projectestate.onrender.com/api/dashboard/tenants-by-gender", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response?.data || {};
        setMaleCount(data.Male ?? 0);
        setFemaleCount(data.Female ?? 0);
        console.log("API data:", data);
      })
      .catch((err) => {
        console.log("Error fetching data", err);
      });
  };

  useEffect(() => {
    fetchTenantsByGender();
  }, [token]);

  // Move this inside so it uses latest state
  const chartData = {
    // labels: ["Male", "Female"],
    datasets: [
      {
        data: [maleCount ?? 0, femaleCount ?? 0],
        backgroundColor: ["rgba(104, 104, 104, 0.6)", "rgba(190, 190, 190, 0.6)"],
        borderColor: ["rgba(190, 190, 190, 0.6)", "rgba(186, 207, 68, 0)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <Doughnut data={chartData} />
    </div>
  );
}
