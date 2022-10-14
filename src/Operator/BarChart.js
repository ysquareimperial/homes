import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Tenants In/Out ',
    },
  },
};


const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Tenants In',
      data: [1, 2, 3, 4, 5, 6, 7],
      backgroundColor: 'rgba(34, 64, 41, 0.6)',
    },
    {
      label: 'Tenants Out',
      data: [1, 2, 3, 4, 5, 6, 7],
      backgroundColor: 'rgba(186, 207, 68, 0.6)',
    },
  ],
  borderColor: [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
  ]
};

export default function BarChart() {
  return (
    <>
      <div style={{width:''}}>
        <Bar options={options} data={data} />
      </div>
    </>
  )
}