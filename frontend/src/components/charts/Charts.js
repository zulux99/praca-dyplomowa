import { useContext, useState, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import Box from "@mui/material/Box";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { GetAllCategories } from "../categories/GetAllCategoriesRequest";
import { isMobile } from "react-device-detect";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { GetData } from "./GetDataRequest";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import CreateChart from "./CreateChart";

import { Bar } from "react-chartjs-2";
import { Chart, BarController, BarElement, LinearScale, CategoryScale, Title } from "chart.js";
Chart.register(BarController, BarElement, LinearScale, CategoryScale, Title, ChartDataLabels);

export default function Charts() {
  const user = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [dateFrom, setDateFrom] = useState(
    new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().slice(0, 10)
  );
  const [dateTo, setDateTo] = useState(new Date().toISOString().slice(0, 10));
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingTransactions, setLoadingTransactions] = useState(false);
  const [showBy, setShowBy] = useState("all");
  const [labels, setLabels] = useState([]);
  const [datasets, setDatasets] = useState([]);
  const [height, setHeight] = useState(300);

  useEffect(() => {
    GetAllCategories({
      user,
      url: "/api/categories/",
    }).then((response) => {
      if (response === -1) {
        console.log("Nie udało się pobrać kategorii");
      } else {
        setCategories(response);
      }
    });
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoadingTransactions(true);
    let url = "/api/transactions/";
    url += "?no_pagination";
    if (showBy === "incomes") {
      url += "&incomes";
    } else if (showBy === "expenses") {
      url += "&expenses";
    } else if (showBy === "all") {
    }
    GetData({
      user,
      url,
    }).then((response) => {
      setLoadingTransactions(false);
      if (response === -1) {
        console.log("Nie udało się pobrać transakcji");
      } else {
        setTransactions(response);
        CreateChart({
          transactions: response,
          setTransactions,
          categories,
          setCategories,
          setLabels,
          setDatasets,
        });
      }
    });
  };

  return (
    <>
      <Box className="box">
        <form onSubmit={handleSubmit}>
          <RadioGroup
            row
            defaultValue="top"
            value={showBy}
            onChange={(e) => setShowBy(e.target.value)}
            sx={{ justifyContent: "center" }}>
            <FormControlLabel value="incomes" control={<Radio />} label="Przychody" />
            <FormControlLabel value="expenses" control={<Radio />} label="Wydatki" />
            <FormControlLabel value="all" control={<Radio />} label="Wszystko" />
          </RadioGroup>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pl">
            <DatePicker
              label="Data"
              className="input"
              inputFormat="DD/MM/YYYY"
              value={dateFrom}
              onChange={(newValue) => {
                setDateFrom(newValue.$y + "-" + parseInt(newValue.$M + 1) + "-" + newValue.$D);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pl">
            <DatePicker
              label="Data"
              className="input"
              inputFormat="DD/MM/YYYY"
              value={dateTo}
              onChange={(newValue) => {
                setDateTo(newValue.$y + "-" + parseInt(newValue.$M + 1) + "-" + newValue.$D);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <Button type="submit" variant="contained" color="success">
            Pokaż wykres
          </Button>
        </form>
      </Box>
      <Box className="box">
        <Bar
          data={{
            labels: labels,
            datasets: datasets,
          }}
          height={height}
          options={{
            plugins: {
              datalabels: {
                display: true,
                color: "white",
              },
            },
            indexAxis: isMobile ? "y" : "x",
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
