import { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { GetTransactionsByPage } from "../transactions/GetTransactionsByPage";
import InfiniteScroll from "react-infinite-scroller";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import { GetAllBills } from "../bills/GetAllBills";
import { DeleteTransaction } from "../transactions/DeleteTransactionRequest";
import { toast } from "react-toastify";
import { useConfirm } from "material-ui-confirm";
import Button from "@mui/material/Button";
import TransactionAccordion from "./TransactionAccordion";
import Box from "@mui/material/Box";

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
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: "16px",
            flexDirection: "column",
            alignItems: "center",
            padding: "16px",
            width: "100%",
          }}>
          <ToggleButtonGroup
            value={props.categoriesTab}
            exclusive
            color="success"
            sx={{
              display: "flex",
              justifyContent: "center",
              paddingBottom: "16px",
              width: "100%",
              maxWidth: "500px",
            }}>
            <ToggleButton
              value={1}
              onClick={() => props.setCategoriesTab(1)}
              sx={{
                width: "50%",
              }}>
              Przychody
            </ToggleButton>
            <ToggleButton
              value={2}
              onClick={() => props.setCategoriesTab(2)}
              sx={{
                width: "50%",
              }}>
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
              maxWidth: "500px",
              marginBottom: "16px",
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
              maxWidth: "500px",
              marginBottom: "16px",
            }}
          />
          <Button
            variant="contained"
            color="success"
            size="large"
            sx={{
              width: "100%",
              maxWidth: "500px",
              marginBottom: "16px",
            }}
            onClick={() => {
              showTransactions();
            }}>
            Pokaż transakcje
          </Button>
        </Box>
        <InfiniteScroll
          style={{
            width: "100%",
          }}
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
                <TransactionAccordion
                  user={props.user}
                  transaction={transaction}
                  onDelete={handleDeleteTransaction}
                  setTransactions={props.setTransactions}
                  transactions={props.transactions}
                  expanded={expanded}
                  setExpanded={setExpanded}
                  categoryList={props.categoryList}
                  bills={props.bills}
                />
              ))
          )}
        </InfiniteScroll>
      </Box>
    </>
  );
}
