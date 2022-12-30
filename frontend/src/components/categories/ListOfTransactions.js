import { useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { GetTransactionsByPage } from "../transactions/GetTransactionsByPage";
import InfiniteScroll from "react-infinite-scroller";
import ListItem from "@mui/material/ListItem";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";

export const findCategoryName = (categoryList, categoryId) => {
  try {
    return categoryList.find((category) => category.id === categoryId).nazwa;
  } catch (err) {
    return "Nieznana";
  }
};

export default function ListOfTransactions(props) {
  useEffect(() => {
    props.setTransactions([]);
    loadMore();
    props.setHasMore(true);
  }, [props.category]);

  useEffect(() => {
    props.setTransactions([]);
    props.setPageNumber(1);
    props.setHasMore(true);
    props.setCategory(null);
    props.setInputValue("");
  }, [props.categoriesTab]);

  const loadMore = () => {
    if (props.category === null) return;
    GetTransactionsByPage({
      user: props.user,
      url: "/api/transactions/?category=" + props.category.id + "&page=" + props.pageNumber,
    }).then((response) => {
      if (response === -1) {
        console.log("Nie udało się pobrać listy przychodów");
      } else {
        props.setTransactions([...props.transactions, ...response.results]);
        props.setPageNumber(props.pageNumber + 1);
        if (response.next === null) {
          props.setHasMore(false);
          props.setPageNumber(1);
        }
      }
    });
  };

  return (
    <>
      <h1>Lista transakcji</h1>
      {props.category !== null && props.category.id + " " + props.inputValue + " " + props.pageNumber}
      <ToggleButtonGroup value={props.categoriesTab} exclusive>
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
      <InfiniteScroll
        loadMore={loadMore}
        hasMore={props.hasMore}
        loader={
          <div className="loader" key={0}>
            Ładowanie...
          </div>
        }>
        {props.transactions
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
