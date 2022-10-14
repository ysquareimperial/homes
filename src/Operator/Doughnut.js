import { Doughnut } from 'react-chartjs-2'
// import { Chart, ArcElement, Tooltip,  } from 'chart.js'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  // labels: ["Male", "Female"],
  datasets: [{
    data: [50, 50],
    backgroundColor: [
      'rgb(34, 64, 41, 0.6)',
      'rgb(186, 207, 68, 0.6)',
    ],
    borderColor: [
      'rgba(34, 64, 41, 0)',
      'rgba(186, 207, 68, 0)',
    ],
    borderWidth: 1,
  }]
}
export default function DoughnutChart() {
  return (
    <>
      <div>
        <Doughnut data={data} />
      </div>
    </>
  )
}