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
            datalabels: {
              display: true,
              color: "black",
              anchor: "center",
              align: "end",
              offset: 5,
              font: {
                size: 14,
                weight: "bold",
                lineHeight: 1.2,
              },
            },
          },
        }}
        height={200}
        data={{
          labels: props.bills.map((bill) => bill.nazwa),
          datasets: [
            {
              label: "Konta",
              data: props.bills.map((bill) => bill.kwota),
              backgroundColor: [
                "rgba(255, 99, 132)",
                "rgba(54, 162, 235)",
                "rgba(255, 206, 86)",
                "rgba(75, 192, 192)",
                "rgba(153, 102, 255)",
                "rgba(255, 159, 64)",
              ],
            },
          ],
        }}
      />
    </>
  );
}

export default DoughnutChart;
