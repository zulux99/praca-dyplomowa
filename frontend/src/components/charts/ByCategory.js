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

export default function ByCategory(props) {
  const [dateFrom, setDateFrom] = useState(
    new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().slice(0, 10)
  );
  const [dateTo, setDateTo] = useState(new Date().toISOString().slice(0, 10));
  const [showBy, setShowBy] = useState("all");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.setIsAnyIncome(false);
    props.setSubmitted(true);
    props.setIsAnyExpense(false);
    props.setLoadingTransactions(true);
    props.setLoadingChart(true);
    props.setLabels([]);
    props.setDatasets([]);
    props.setShowedDateFrom(dateFrom);
    props.setShowedDateTo(dateTo);
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
      props.setLoadingTransactions(false);
      if (response === -1) {
        console.log("Nie udało się pobrać transakcji");
      } else {
        props.setTransactions(response);
      }
    });
  };

  useEffect(() => {
    if (props.transactions.length > 0 && props.categories.length > 0) {
      console.log(props.transactions);
      let categoriesAndSums = [];
      props.setIsAnyIncome(false);
      props.setIsAnyExpense(false);
      props.categories.map((category) => {
        let sum = 0;
        props.transactions.map((transaction) => {
          if (transaction.przychod === true) {
            props.setIsAnyIncome(true);
          } else if (transaction.przychod === false) {
            props.setIsAnyExpense(true);
          }
          if (transaction.kategoria === category.id) {
            sum += parseFloat(transaction.kwota);
            props.setLabels((labels) =>
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
      props.setDatasets([
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
    props.setLoadingChart(false);
  }, [props.transactions, props.categories]);

  return (
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
  );
}
