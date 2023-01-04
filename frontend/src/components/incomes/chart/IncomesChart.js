import { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { ChartSetLabels, ChartSetData } from "./ChartSetLabels";
import { isBrowser, isMobile } from "react-device-detect";
import CircularProgress from "@mui/material/CircularProgress";

import ChartDataLabels from "chartjs-plugin-datalabels";
import { Bar } from "react-chartjs-2";
import { Chart, BarController, BarElement, LinearScale, CategoryScale, Title } from "chart.js";
Chart.register(BarController, BarElement, LinearScale, CategoryScale, Title, ChartDataLabels);

export default function IncomesChart(props) {
  const [loading, setLoading] = useState(true);
  const [interval, setInterval] = useState(0);
  const [arrowValue, setArrowValue] = useState(0);
  const [data, setData] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [sum, setSum] = useState(0);
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
    setLabels(ChartSetLabels({ interval: interval, currentMonth: currentMonth, currentYear: currentYear }));
  }, [interval, currentMonth, currentYear]);

  useEffect(() => {
    setArrowValue(0);
  }, [interval]);

  useEffect(() => {
    setLoading(true);
    setData(
      ChartSetData({
        interval: interval,
        arrowValue: arrowValue,
        setStartDate: setStartDate,
        setEndDate: setEndDate,
        setCurrentMonth: setCurrentMonth,
        setCurrentYear: setCurrentYear,
        setSum: setSum,
        user: props.user,
        setLoading: setLoading,
      })
    );
  }, [interval, arrowValue, props.user]);

  return (
    <>
      <Tabs value={interval} indicatorColor="primary" textColor="primary" centered>
        <Tab label="Tydzień" onClick={() => setInterval(0)} />
        <Tab label="Miesiąc" onClick={() => setInterval(1)} />
        <Tab label="Rok" onClick={() => setInterval(2)} />
      </Tabs>
      <Box
        sx={{
          position: "relative",
        }}>
        <Bar
          data={{
            labels: labels,
            datasets: [
              {
                label: "Przychody",
                data: data,
                backgroundColor: ["rgba(50, 205, 50, 0.5)"],
                borderColor: ["rgba(50, 205, 50, 1)"],
                borderWidth: 1,
              },
            ],
          }}
          height={isMobile ? window.innerHeight * 0.6 : window.innerHeight * 0.2}
          width={isMobile ? window.innerWidth * 0.9 : window.innerWidth * 0.4}
          options={{
            indexAxis: isMobile ? "y" : "x",
            maintainAspectRatio: true,
            responsive: true,
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
              datalabels: {
                display: true,
                color: "black",
                anchor: "center",
                align: "center",
                offset: 5,
                font: {
                  size: 12,
                  weight: "bold",
                  lineHeight: 1.2,
                },
              },
            },
          }}
        />
        {loading && <CircularProgress color="success" sx={{ position: "absolute", top: "50%", left: "50%" }} />}
      </Box>
      {interval === 0 &&
        new Date(startDate).toLocaleDateString("pl-PL", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }) +
          " - " +
          new Date(endDate).toLocaleDateString("pl-PL", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}

      {interval === 1 &&
        new Date(currentYear, currentMonth, 1).toLocaleString("pl-PL", { month: "long" }) +
          " " +
          currentYear.toLocaleString("pl-PL")}
      {interval === 2 && startDate}
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton onClick={() => setArrowValue(arrowValue - 1)}>
          <NavigateBeforeIcon />
        </IconButton>
        <IconButton onClick={() => setArrowValue(arrowValue + 1)}>
          <NavigateNextIcon />
        </IconButton>
      </Box>
      <label>Łączna kwota {sum.toLocaleString("pl-PL", { style: "currency", currency: "PLN" })}</label>
    </>
  );
}
