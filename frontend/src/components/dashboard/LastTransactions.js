import { useState } from "react";
import { CircularProgress } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import TransactionAccordion from "../transactions/TransactionAccordion";

export default function LastTransactions(props) {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}
        className="title">
        <h2>Ostatnie transakcje</h2>
        <Link
          to="/transactions"
          style={{
            color: "green",
          }}>
          Zobacz więcej
        </Link>
      </Box>
      <List className="lista-przychodow">
        <ListItem>
          <label>
            <b>Kwota</b>
          </label>
          <label>
            <b>Data</b>
          </label>
          <label>
            <b>Kategoria</b>
          </label>
        </ListItem>
        {props.loading ? (
          <CircularProgress color="success" />
        ) : (
          props.transactions
            .sort((a, b) => (a.data > b.data ? -1 : 1))
            .sort((a, b) => (a.data === b.data ? (a.id > b.id ? -1 : 1) : 0))
            .map((income) => (
              <TransactionAccordion
                user={props.user}
                transaction={income}
                categoryList={props.categoryList}
                key={income.id}
                expanded={expanded}
                setExpanded={setExpanded}
                transactions={props.transactions}
                setTransactions={props.setTransactions}
                bills={props.bills}
                reloadTransactions={props.reloadTransactions}
              />
            ))
        )}
      </List>
    </>
  );
}
