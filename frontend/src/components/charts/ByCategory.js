import { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Box from "@mui/material/Box";
import { GetData } from "./GetDataRequest";
import CircularProgress from "@mui/material/CircularProgress";
import ChartBox from "./ChartBox";

export default function ByCategory(props) {
  const [dateFrom, setDateFrom] = useState(
    new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().slice(0, 10)
  );
  const [dateTo, setDateTo] = useState(new Date().toISOString().slice(0, 10));
  const [showBy, setShowBy] = useState("all");
  const [showedDateFrom, setShowedDateFrom] = useState(null);
  const [showedDateTo, setShowedDateTo] = useState(null);
  const [loadingChart, setLoadingChart] = useState(false);
  const [loadingTransactions, setLoadingTransactions] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [labels, setLabels] = useState([]);
  const [datasets, setDatasets] = useState([]);
  const [isAnyIncome, setIsAnyIncome] = useState(false);
  const [isAnyExpense, setIsAnyExpense] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsAnyIncome(false);
    setIsAnyExpense(false);
    setSubmitted(true);
    setLoadingTransactions(true);
    setLoadingChart(true);
    setLabels([]);
    setDatasets([]);
    setShowedDateFrom(dateFrom);
    setShowedDateTo(dateTo);
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
      user: props.user,
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
    if (transactions.length > 0 && props.categories.length > 0) {
      let categoriesAndSums = [];
      setIsAnyIncome(false);
      setIsAnyExpense(false);
      props.categories.map((category) => {
        let sum = 0;
        transactions.map((transaction) => {
          if (transaction.przychod === true) {
            setIsAnyIncome(true);
          } else if (transaction.przychod === false) {
            setIsAnyExpense(true);
          }
          if (transaction.kategoria === category.id) {
            sum += parseFloat(transaction.kwota);
            setLabels((labels) =>
              labels.some((item) => item === category.nazwa) ? labels : [...labels, category.nazwa]
            );
            if (!categoriesAndSums.some((item) => item.id === category.id)) {
              categoriesAndSums.push({ id: category.id, nazwa: category.nazwa, sum, przychod: transaction.przychod });
            } else if (categoriesAndSums.some((item) => item.id === category.id)) {
              categoriesAndSums.map((item) => {
                if (item.id === category.id) {
                  item.sum += parseFloat(transaction.kwota);
                }
              });
            }
          }
        });
      });
      console.log(categoriesAndSums);
      setDatasets([
        {
          data: categoriesAndSums.map((item) => item.sum),
          backgroundColor: categoriesAndSums.map((item) =>
            item.przychod === true ? "rgba(0, 255, 0, 0.2)" : "rgba(255, 0, 0, 0.2)"
          ),
          borderColor: categoriesAndSums.map((item) => (item.przychod === true ? "green" : "red")),
          borderWidth: 1,
          datalabels: {
            display: true,
            color: "black",
            anchor: "center",
            align: "end",
            offset: 5,
            font: {
              size: 12,
              weight: "bold",
              lineHeight: 1.2,
            },
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
    setLoadingChart(false);
  }, [transactions, props.categories]);

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
            <FormControlLabel value="all" control={<Radio />} label="Wszystko" />
            <FormControlLabel value="incomes" control={<Radio />} label="Przychody" />
            <FormControlLabel value="expenses" control={<Radio />} label="Wydatki" />
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
          {props.loadingCategories ? (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress color="success" />
            </Box>
          ) : (
            <Button type="submit" variant="contained" color="success">
              Pokaż wykres
            </Button>
          )}
        </form>
      </Box>
      {submitted && (
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
          tab={props.tab}
        />
      )}
    </>
  );
}
