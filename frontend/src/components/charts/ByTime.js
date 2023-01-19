import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import ChartBox from "./ChartBox";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { GetData } from "./GetDataRequest";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

export default function ByTime(props) {
  const [labels, setLabels] = useState([]);
  const [datasets, setDatasets] = useState([]);
  const [showedDateFrom, setShowedDateFrom] = useState(null);
  const [showedDateTo, setShowedDateTo] = useState(null);
  const [showedDate, setShowedDate] = useState(null);
  const [loadingChart, setLoadingChart] = useState(false);
  const [isAnyIncome, setIsAnyIncome] = useState(false);
  const [isAnyExpense, setIsAnyExpense] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [interval, setInterval] = useState(0);
  const [arrowValueForMonth, setArrowValueForMonth] = useState(0);
  const [arrowValueForYear, setArrowValueForYear] = useState(0);

  useEffect(() => {
    if (interval === 0) {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + arrowValueForMonth;
      let daysInMonth = new Date(year, month + 1, 0).getDate();
      let labels = [];
      for (let i = 1; i <= daysInMonth; i++) {
        labels.push(i);
      }
      setLabels(labels);
      console.log("showedDate: ", showedDate);
    } else if (interval === 1) {
      let date = new Date();
      let year = date.getFullYear() + arrowValueForYear;
      setLabels([
        "Styczeń",
        "Luty",
        "Marzec",
        "Kwiecień",
        "Maj",
        "Czerwiec",
        "Lipiec",
        "Sierpień",
        "Wrzesień",
        "Październik",
        "Listopad",
        "Grudzień",
      ]);
    }
    setLoadingChart(true);
    makeChart();
  }, [interval, arrowValueForMonth, arrowValueForYear]);

  const makeChart = () => {
    if (props.chosenCategory) {
      setIsAnyIncome(false);
      setIsAnyExpense(false);
      setSubmitted(true);
      setDatasets([]);
      setLoadingChart(true);
      let url = "/api/transactions/";
      url += "?no_pagination";
      url += "&category=" + props.chosenCategory.id;
      if (interval === 0) {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + arrowValueForMonth;
        let startDate = new Date(year, month + 1, 1).toISOString().slice(0, 10);
        startDate = startDate.slice(0, 8) + "01";
        let endDate = new Date(year, month + 1, 1).toISOString().slice(0, 10);
        url += "&date_from=" + startDate;
        url += "&date_to=" + endDate;
        setShowedDate(new Date(year, month, 1).toLocaleDateString("pl-PL", { month: "long", year: "numeric" }));
        console.log("startDate: ", startDate);
        console.log("endDate: ", endDate);
      }
      if (interval === 1) {
        let date = new Date();
        let year = date.getFullYear() + arrowValueForYear;
        let startDate = new Date(year, 1, 1).toISOString().slice(0, 10);
        startDate = startDate.slice(0, 8) + "01";
        let endDate = new Date(year + 1, 0, 1).toISOString().slice(0, 10);
        url += "&date_from=" + startDate;
        url += "&date_to=" + endDate;
        setShowedDate(new Date(year, 0, 1).toLocaleDateString("pl-PL", { year: "numeric" }));
        console.log("startDate: ", startDate);
        console.log("endDate: ", endDate);
      }
      GetData({
        user: props.user,
        url,
      }).then((response) => {
        if (response === -1) {
          console.log("Nie udało się pobrać transakcji");
        } else {
          setTransactions(response);
          if (interval === 0) {
            let isIncome = false;
            let data = [];
            response.forEach((transaction) => {
              let date = new Date(transaction.data);
              let day = date.getDate();
              if (data[day - 1]) {
                data[day - 1] += parseFloat(transaction.kwota);
              } else {
                data[day - 1] = parseFloat(transaction.kwota);
              }
              if (transaction.przychod) isIncome = true;
            });
            console.log("data: ", data);
            setDatasets([
              {
                data: data,
                backgroundColor: isIncome ? "rgba(0, 255, 0, 0.2)" : "rgba(255, 0, 0, 0.2)",
                borderColor: isIncome ? "rgba(0, 255, 0, 1)" : "rgba(255, 0, 0, 1)",
                borderWidth: 1,
                datalabels: {
                  formatter: (value) => {
                    if (value > 0) {
                      return value.toLocaleString("pl-PL", {
                        style: "currency",
                        currency: "PLN",
                      });
                    }
                  },
                },
              },
            ]);
          }
          if (interval === 1) {
            let isIncome = false;
            let data = [];
            response.forEach((transaction) => {
              let date = new Date(transaction.data);
              let month = date.getMonth();
              if (data[month]) {
                data[month] += parseFloat(transaction.kwota);
              } else {
                data[month] = parseFloat(transaction.kwota);
              }
              if (transaction.przychod) isIncome = true;
            });
            console.log("data: ", data);
            setDatasets([
              {
                data: data,
                backgroundColor: isIncome ? "rgba(0, 255, 0, 0.2)" : "rgba(255, 0, 0, 0.2)",
                borderColor: isIncome ? "rgba(0, 255, 0, 1)" : "rgba(255, 0, 0, 1)",
                borderWidth: 1,
                datalabels: {
                  formatter: (value) => {
                    if (value > 0) {
                      return value.toLocaleString("pl-PL", {
                        style: "currency",
                        currency: "PLN",
                      });
                    }
                  },
                },
              },
            ]);
          }
        }
      });
      setLoadingChart(false);
    }
  };

  return (
    <>
      <Box className="box">
        {props.loadingCategories ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress color="success" />
          </Box>
        ) : (
          <Autocomplete
            className="input"
            value={props.chosenCategory}
            onChange={(event, newValue) => {
              props.setChosenCategory(newValue);
            }}
            options={props.categories}
            getOptionLabel={(option) => option.nazwa}
            renderInput={(params) => <TextField {...params} label="Kategoria" variant="outlined" />}
          />
        )}
        <Tabs
          value={interval}
          onChange={(event, newValue) => {
            setInterval(newValue);
          }}
          aria-label="Wybierz przedział czasu"
          centered>
          <Tab label="Miesiąc" />
          <Tab label="Rok" />
        </Tabs>
        <Button
          type="submit"
          variant="contained"
          color="success"
          onClick={() => {
            makeChart();
          }}>
          Pokaż wykres
        </Button>
      </Box>
      {submitted && (
        <Box className="box">
          <ChartBox
            labels={labels}
            datasets={datasets}
            showedDateFrom={showedDateFrom}
            showedDateTo={showedDateTo}
            loadingChart={loadingChart}
            transactions={transactions}
            isAnyIncome={isAnyIncome}
            isAnyExpense={isAnyExpense}
            submitted={submitted}
            showedDate={showedDate}
            arrowValueForMonth={arrowValueForMonth}
            arrowValueForYear={arrowValueForYear}
            setArrowValueForMonth={setArrowValueForMonth}
            setArrowValueForYear={setArrowValueForYear}
            interval={interval}
            tab={props.tab}
          />
        </Box>
      )}
    </>
  );
}
