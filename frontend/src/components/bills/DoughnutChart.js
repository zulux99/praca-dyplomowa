import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Legend, Title } from "chart.js";
Chart.register(ArcElement, Legend, Title);

function DoughnutChart(props) {
  return (
    <>
      <Doughnut
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: "bottom",
            },
            title: {
              display: true,
              text: "Konta",
            },
          },
        }}
        data={{
          labels: props.bills.map((bill) => bill.nazwa),
          datasets: [
            {
              label: "Konta",
              data: props.bills.map((bill) => bill.kwota),
              backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            },
          ],
        }}
      />
    </>
  );
}

export default DoughnutChart;
