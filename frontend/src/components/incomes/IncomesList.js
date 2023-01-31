import { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Menu3Dots from "./Menu3Dots";
import InfiniteScroll from "react-infinite-scroller";
import { GetIncomesByPage } from "./GetIncomesByPage";
import TransactionAccordion from "../transactions/TransactionAccordion";

export default function IncomesList(props) {
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [expanded, setExpanded] = useState(false);

  const loadMore = () => {
    GetIncomesByPage({
      user: props.user,
      url: "/api/incomes/?page=" + pageNumber,
    }).then((response) => {
      if (response === -1) {
        console.log("Nie udało się pobrać listy przychodów");
      } else {
        props.setIncomes(props.incomes.concat(response.results));
        setPageNumber(pageNumber + 1);
        if (response.next === null) {
          setHasMore(false);
        }
      }
    });
  };

  return (
    <>
      <h2>Ostatnie przychody</h2>
      <List className="lista-przychodow">
        <ListItem>
          <label
            style={{
              width: "calc(100% * 1/3)",
            }}>
            <b>Kwota</b>
          </label>
          <label
            style={{
              width: "calc(100% * 1/3)",
            }}>
            <b>Data</b>
          </label>
          <label
            style={{
              width: "calc(100% * 1/3)",
            }}>
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
          {props.incomes
            // sort by date then by id
            .sort((a, b) => (a.data > b.data ? -1 : 1))
            .sort((a, b) => (a.data === b.data ? (a.id > b.id ? -1 : 1) : 0))
            .map((income) => (
              <TransactionAccordion
                user={props.user}
                key={income.id}
                transaction={income}
                setTransactions={props.setIncomes}
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
