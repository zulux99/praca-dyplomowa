import axios from "axios";
import { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import InfiniteScroll from "react-infinite-scroller";
import TransactionAccordion from "../transactions/TransactionAccordion";

export default function ExpensesList(props) {
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [expanded, setExpanded] = useState(false);

  const loadMore = async () => {
    try {
      const response = await axios.get("/api/transactions/?" + "&expenses" + "&page=" + pageNumber, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${props.user.authTokens.access}`,
        },
      });
      props.setTransactions(props.transactions.concat(response.data.results));
      setPageNumber(pageNumber + 1);
      if (response.data.next === null) {
        setHasMore(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <span
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <h2>Przychody</h2>
      </span>
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
        <InfiniteScroll
          loadMore={loadMore}
          hasMore={hasMore}
          loader={
            <div className="loader" key={0}>
              Ładowanie...
            </div>
          }>
          {props.transactions
            .sort((a, b) => (a.data > b.data ? -1 : 1))
            .sort((a, b) => (a.data === b.data ? (a.id > b.id ? -1 : 1) : 0))
            .map((transaction) => (
              <TransactionAccordion
                user={props.user}
                key={transaction.id}
                transaction={transaction}
                transactions={props.transactions}
                setTransactions={props.setTransactions}
                expanded={expanded}
                setExpanded={setExpanded}
                categoryList={props.categoryList}
                bills={props.bills}
              />
            ))}
        </InfiniteScroll>
      </List>
    </>
  );
}
