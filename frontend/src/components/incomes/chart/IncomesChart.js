import { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { ChartSetLabels, ChartSetData } from "./ChartSetLabels";

import { Bar } from "react-chartjs-2";
import { Chart, BarController, BarElement, LinearScale, CategoryScale, Title } from "chart.js";
Chart.register(BarController, BarElement, LinearScale, CategoryScale, Title);

export default function IncomesChart(props) {
  const [interval, setInterval] = useState(0);
  const [arrowValue, setArrowValue] = useState(0);
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [labels, setLabels] = useState([
    "Poniedziałek",
    "Wtorek",
    "Środa",
    "Czwartek",
    "Piątek",
    "Sobota",
    "Niedziela",
  ]);

  useEffect(() => {
    setLabels(ChartSetLabels({ interval: interval }));
  }, [interval]);

  useEffect(() => {
    setData(
      ChartSetData({
        interval: interval,
        arrowValue: arrowValue,
        incomes: props.incomes,
        setStartDate: setStartDate,
        setEndDate: setEndDate,
      })
    );
  }, [interval, arrowValue, props]);

  return (
    <>
      <Tabs value={interval} indicatorColor="primary" textColor="primary" centered>
        <Tab label="Tydzień" onClick={() => setInterval(0)} />
        <Tab label="Miesiąc" onClick={() => setInterval(1)} />
        <Tab label="Rok" onClick={() => setInterval(2)} />
      </Tabs>
      <Bar
        data={{
          labels: labels,
          datasets: [
            {
              label: "Przychody",
              data: data,
              backgroundColor: ["rgba(50, 205, 50, 0.7)"],
              borderColor: ["rgba(50, 205, 50, 1)"],
              borderWidth: 1,
            },
          ],
        }}
        height={100}
        options={{
          maintainAspectRatio: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            title: {
              display: true,
              text: "Przychody",
            },
            legend: {
              display: false,
            },
          },
        }}
      />
      {startDate + " - " + endDate}
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton>
          <NavigateBeforeIcon onClick={() => setArrowValue(arrowValue - 1)} />
        </IconButton>
        <IconButton>
          <NavigateNextIcon onClick={() => setArrowValue(arrowValue + 1)} />
        </IconButton>
      </Box>
    </>
  );
}
