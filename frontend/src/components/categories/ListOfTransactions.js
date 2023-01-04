import { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { GetTransactionsByPage } from "../transactions/GetTransactionsByPage";
import InfiniteScroll from "react-infinite-scroller";
import ListItem from "@mui/material/ListItem";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import { GetAllBills } from "../bills/GetAllBills";
import MenuItem from "@mui/material/MenuItem";

export const findCategoryName = (categoryList, categoryId) => {
  try {
    return categoryList.find((category) => category.id === categoryId).nazwa;
  } catch (err) {
    return "Nieznana";
  }
};

export default function ListOfTransactions(props) {
  const [noTransactionsToShow, setNoTransactionsToShow] = useState(false);

  useEffect(() => {
    GetAllBills(props.user).then((response) => {
      if (response === -1) {
        console.log("Nie udało się pobrać listy rachunków");
      } else {
        props.setBills(response);
      }
    });
  }, [props.user]);

  useEffect(() => {
    props.setTransactions([]);
    props.setPageNumber(1);
    props.setCategory(null);
    props.setInputValue("");
    setNoTransactionsToShow(false);
  }, [props.categoriesTab]);

  useEffect(() => {
    setNoTransactionsToShow(false);
    props.setPageNumber(1);
    props.setTransactions([]);
  }, [props.category, props.bill]);

  const loadMore = () => {
    props.setHasMore(true);
    let url = "/api/transactions/?page=" + props.pageNumber;
    if (props.category) {
      url += "&category=" + props.category.id;
    }
    if (props.bill) {
      url += "&bill=" + props.bill.id;
    }
    GetTransactionsByPage({
      user: props.user,
      url: url,
    }).then((response) => {
      if (response === -1) {
        console.log("Nie udało się pobrać listy przychodów");
      } else {
        if (response.results.length === 0) {
          props.setHasMore(false);
          setNoTransactionsToShow(true);
          return;
        }
        setNoTransactionsToShow(false);
        props.setTransactions([...props.transactions, ...response.results]);
        props.setPageNumber(props.pageNumber + 1);
        if (response.next === null) {
          props.setHasMore(false);
          props.setPageNumber(1);
        }
      }
    });
  };

  useEffect(() => {
    if (props.transactions.length === 0 && props.pageNumber === 1) {
      loadMore();
    }
  }, [props.transactions]);

  return (
    <>
      <h1>Lista transakcji</h1>
      {props.category !== null && props.category.id + " " + props.inputValue + " " + props.pageNumber}
      <ToggleButtonGroup value={props.categoriesTab} exclusive color="success">
        <ToggleButton value={1} onClick={() => props.setCategoriesTab(1)}>
          Przychody
        </ToggleButton>
        <ToggleButton value={2} onClick={() => props.setCategoriesTab(2)}>
          Wydatki
        </ToggleButton>
      </ToggleButtonGroup>
      <Autocomplete
        className="input"
        options={props.categoryList}
        getOptionLabel={(option) => option.nazwa}
        value={props.category}
        onChange={(e, newValue) => props.setCategory(newValue)}
        inputValue={props.inputValue}
        onInputChange={(e, newInputValue) => props.setInputValue(newInputValue)}
        renderInput={(params) => <TextField {...params} label="Kategoria" />}
        sx={{
          width: "100%",
        }}
      />
      {/* <TextField
        className="input"
        select
        label="Konto"
        fullWidth
        value={props.billId === null ? "Wszystkie" : props.billId}
        InputLabelProps={{ shrink: true }}
        onChange={(e) => props.setBillId(e.target.value)}>
        <MenuItem key={0} value={0}>
          <i>Wszystkie</i>
        </MenuItem>
        {props.bills.map((bill) => (
          <MenuItem key={bill.id} value={bill.id}>
            {bill.nazwa}
          </MenuItem>
        ))}
      </TextField> */}
      <Autocomplete
        className="input"
        options={props.bills}
        getOptionLabel={(option) => option.nazwa}
        value={props.bill}
        onChange={(e, newValue) => props.setBill(newValue)}
        inputValue={props.inputValueBill}
        onInputChange={(e, newInputValue) => props.setInputValueBill(newInputValue)}
        renderInput={(params) => <TextField {...params} label="Konto" />}
        sx={{
          width: "100%",
        }}
      />

      <InfiniteScroll
        loadMore={loadMore}
        hasMore={props.hasMore}
        loader={
          <div className="loader" key={0}>
            Ładowanie...
          </div>
        }>
        {noTransactionsToShow && (
          <div className="loader" key={0}>
            Brak transakcji
          </div>
        )}
        {props.transactions !== null &&
          props.transactions
            // sort by date then by id
            .sort((a, b) => (a.data > b.data ? -1 : 1))
            .sort((a, b) => (a.data === b.data ? (a.id > b.id ? -1 : 1) : 0))
            .map((income) => (
              <ListItem key={income.id}>
                <label
                  style={{
                    color: "green",
                  }}>
                  + {income.kwota} zł
                </label>
                <label>{findCategoryName(props.categoryList, income.kategoria)}</label>
                <label>
                  {new Date(income.data).toLocaleDateString("pl-PL", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </label>
              </ListItem>
            ))}
      </InfiniteScroll>
    </>
  );
}
