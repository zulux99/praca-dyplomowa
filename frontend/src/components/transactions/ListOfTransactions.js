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
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { Divider } from "@mui/material";
import { DeleteTransaction } from "../transactions/DeleteTransactionRequest";
import { toast, ToastContainer } from "react-toastify";
import { useConfirm } from "material-ui-confirm";
import Button from "@mui/material/Button";

export const findCategoryName = (categoryList, categoryId) => {
  try {
    return categoryList.find((category) => category.id === categoryId).nazwa;
  } catch (err) {
    return "Nieznana";
  }
};

export const findBillName = (billList, billId) => {
  try {
    return billList.find((bill) => bill.id === billId).nazwa;
  } catch (err) {
    return "Nieznane";
  }
};

export default function ListOfTransactions(props) {
  const [noTransactionsToShow, setNoTransactionsToShow] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const confirm = useConfirm();

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
    props.setBill(null);
  }, [props.categoriesTab]);

  useEffect(() => {
    props.setTransactions([]);
    props.setPageNumber(1);
  }, [props.category, props.bill]);
  const makeUrl = () => {
    let url = "/api/transactions/?page=" + props.pageNumber;
    if (props.category) {
      url += "&category=" + props.category.id;
    }
    if (props.bill) {
      url += "&bill=" + props.bill.id;
    }
    if (props.categoriesTab === 1) {
      url += "&incomes";
    } else if (props.categoriesTab === 2) {
      url += "&expenses";
    }
    return url;
  };

  const loadMore = () => {
    let url = makeUrl();
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
        let newTransactions = response.results.filter(
          (transaction) => !props.transactions.find((t) => t.id === transaction.id)
        );
        props.setTransactions([...props.transactions, ...newTransactions]);
        if (response.next === null) {
          props.setHasMore(false);
          props.setPageNumber(1);
        } else {
          props.setPageNumber(props.pageNumber + 1);
        }
      }
    });
  };

  const showTransactions = () => {
    setNoTransactionsToShow(false);
    props.setTransactions([]);
    props.setPageNumber(1);
    props.setHasMore(true);
    loadMore();
  };

  const handleDeleteTransaction = (transaction) => {
    confirm({
      title: "Potwierdź usunięcie",
      description: "Czy na pewno usunąć tą transakcję?",
      confirmationText: "Usuń",
      cancellationText: "Anuluj",
      confirmationButtonProps: {
        color: "success",
      },
      cancellationButtonProps: {
        color: "success",
      },
    })
      .then(() => {
        DeleteTransaction({
          user: props.user,
          id: transaction.id,
        }).then((response) => {
          if (response === -1) {
            console.log("Nie udało się usunąć transakcji");
          } else {
            props.setTransactions(props.transactions.filter((t) => t.id !== transaction.id));
            toast.success("Usunięto transakcję");
          }
        });
      })
      .catch(() => {});
  };

  return (
    <>
      <ToastContainer position="bottom-center" autoClose={2000} />
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
      <Button
        variant="contained"
        color="success"
        onClick={() => {
          showTransactions();
        }}>
        Pokaż transakcje
      </Button>

      <InfiniteScroll
        loadMore={loadMore}
        hasMore={props.hasMore}
        loader={
          <div className="loader" key={0}>
            Ładowanie...
          </div>
        }>
        {noTransactionsToShow ? (
          <div className="loader" key={0}>
            Brak transakcji
          </div>
        ) : (
          props.transactions !== null &&
          props.transactions
            // sort by date then by id
            .sort((a, b) => (a.data > b.data ? -1 : 1))
            .sort((a, b) => (a.data === b.data ? (a.id > b.id ? -1 : 1) : 0))
            .filter((transaction) => {
              if (props.category) {
                return transaction.kategoria === props.category.id;
              } else {
                return true;
              }
            })
            .map((transaction) => (
              <Accordion
                key={transaction.id}
                expanded={expanded === transaction.id}
                onChange={(event, isExpanded) => {
                  if (event.target.tagName !== "BUTTON") {
                    setExpanded(isExpanded ? transaction.id : false);
                  }
                }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <ListItem key={transaction.id}>
                    <span
                      style={{
                        color: "green",
                      }}>
                      + {transaction.kwota} zł
                    </span>
                    <span>
                      {new Date(transaction.data).toLocaleDateString("pl-PL", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    <span>{findCategoryName(props.categoryList, transaction.kategoria)}</span>
                  </ListItem>
                </AccordionSummary>
                <AccordionDetails>
                  <Divider />
                  <ListItem
                    key={transaction.id}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      width: "100%",
                    }}>
                    <span>
                      Kwota: <b>{transaction.kwota} zł</b>
                    </span>
                    <span>
                      Data:{" "}
                      <b>
                        {new Date(transaction.data).toLocaleDateString("pl-PL", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </b>
                    </span>
                    <span>
                      Kategoria: <b>{findCategoryName(props.categoryList, transaction.kategoria)}</b>
                    </span>
                    <span>
                      Konto: <b>{findBillName(props.bills, transaction.rachunek)}</b>
                    </span>
                    <span>
                      Opis: <b>{transaction.opis}</b>
                    </span>
                    <span
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        width: "100%",
                      }}>
                      <IconButton onClick={() => handleDeleteTransaction(transaction)}>
                        <DeleteIcon color="error" />
                      </IconButton>
                    </span>
                  </ListItem>
                </AccordionDetails>
              </Accordion>
            ))
        )}
      </InfiniteScroll>
    </>
  );
}
