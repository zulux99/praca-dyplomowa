import Box from "@mui/material/Box";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Bar } from "react-chartjs-2";
import { Chart, BarController, BarElement, LinearScale, CategoryScale, Title } from "chart.js";
Chart.register(BarController, BarElement, LinearScale, CategoryScale, Title, ChartDataLabels);

export default function Charts() {
  return (
    <>
      <Box className="box">
        <Bar
          data={{
            labels: ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela"],
            datasets: [
              {
                label: "Przychody",
                data: [12, 19, 3, 5, 2, 3, 1],
                backgroundColor: "#3f51b5",
                borderColor: "#3f51b5",
                borderWidth: 1,
              },
              {
                label: "Wydatki",
                data: [2, 3, 20, 5, 1, 4, 3],
                backgroundColor: "#f50057",
                borderColor: "#f50057",
                borderWidth: 1,
              },
            ],
          }}
          height={400}
          options={{
            plugins: {
              datalabels: {
                display: true,
                color: "white",
              },
            },
            indexAxis: "y",
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      </Box>
    </>
  );
}
