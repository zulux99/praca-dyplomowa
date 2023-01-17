import { useContext, useState, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import Box from "@mui/material/Box";
import { GetAllCategories } from "../categories/GetAllCategoriesRequest";
import { isMobile, isBrowser } from "react-device-detect";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { GetData } from "./GetDataRequest";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import CircularProgress from "@mui/material/CircularProgress";

import ChartDataLabels from "chartjs-plugin-datalabels";
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
  const [loadingChart, setLoadingChart] = useState(false);
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
        setLoadingCategories(false);
      }
    });
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoadingTransactions(true);
    setLoadingChart(true);
    setLabels([]);
    setDatasets([]);
    let url = "/api/transactions/";
    url += "?no_pagination";
    if (showBy === "incomes") {
      url += "&incomes";
    } else if (showBy === "expenses") {
      url += "&expenses";
    } else if (showBy === "all") {
    }
    url += "&date_from=" + dateFrom;
    url += "&date_to=" + dateTo;
    GetData({
      user,
      url,
    }).then((response) => {
      setLoadingTransactions(false);
      if (response === -1) {
        console.log("Nie udało się pobrać transakcji");
      } else {
        setTransactions(response);
      }
    });
  };

  useEffect(() => {
    if (transactions.length > 0 && categories.length > 0) {
      console.log("transactions", transactions);
      console.log("categories", categories);
      let categoriesAndSums = [];
      categories.map((category) => {
        let sum = 0;
        transactions.map((transaction) => {
          if (transaction.kategoria === category.id) {
            sum += parseFloat(transaction.kwota);
            setLabels((labels) =>
              labels.some((item) => item === category.nazwa) ? labels : [...labels, category.nazwa]
            );
            // add category to categoriesAndSums if not already there
            if (!categoriesAndSums.some((item) => item.id === category.id)) {
              categoriesAndSums.push({ id: category.id, nazwa: category.nazwa, sum });
            }
          }
        });
      });
      setDatasets([
        {
          label: "Kwota",
          data: categoriesAndSums.map((item) => item.sum),
          backgroundColor: categoriesAndSums.map((item) =>
            item.sum > 0 ? "rgba(0, 255, 0, 0.5)" : "rgba(255, 0, 0, 0.5)"
          ),
          borderColor: categoriesAndSums.map((item) => (item.sum > 0 ? "rgba(0, 255, 0, 1)" : "rgba(255, 0, 0, 1)")),
          borderWidth: 1,
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
            formatter: (value) => {
              return value + " zł";
            },
          },
        },
      ]);
    }
    setLoadingChart(false);
  }, [transactions, categories]);

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
      <Box
        className="box"
        sx={{
          display: transactions.length > 0 ? "flex" : loadingTransactions ? "flex" : "none",
          justifyContent: "center",
        }}>
        {loadingChart ? (
          <CircularProgress color="success" />
        ) : (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}>
              Halo
            </Box>
            <Box
              sx={{
                width: isBrowser ? (labels.length > 0 ? labels.length < 10 && labels.length * 250 : 0) : "100%",
              }}>
              <Bar
                data={{
                  labels: labels,
                  datasets: datasets,
                }}
                height={isMobile ? (labels.length > 0 ? labels.length * 50 : 0) : 300}
                options={{
                  maintainAspectRatio: false,
                  indexAxis: isMobile ? "y" : "x",
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
}
