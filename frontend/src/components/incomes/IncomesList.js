import { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Menu3Dots from "./Menu3Dots";
import InfiniteScroll from "react-infinite-scroller";
import { GetIncomesByPage } from "./GetIncomesByPage";

export const findCategoryName = (categoryList, categoryId) => {
  try {
    return categoryList.find((category) => category.id === categoryId).nazwa;
  } catch (err) {
    return "Nieznana";
  }
};

export default function IncomesList(props) {
  const [incomes, setIncomes] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = () => {
    GetIncomesByPage({
      user: props.user,
      url: "/api/incomes/?page=" + pageNumber,
    }).then((response) => {
      if (response === -1) {
        console.log("Nie udało się pobrać listy przychodów");
      } else {
        setIncomes(incomes.concat(response.results));
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
          <label>
            <b>Kwota</b>
          </label>
          <label>
            <b>Kategoria</b>
          </label>
          <label>
            <b>Data</b>
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
          {incomes
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
                <Menu3Dots income={income} user={props.user} incomes={props.incomes} setIncomes={props.setIncomes} />
              </ListItem>
            ))}
        </InfiniteScroll>
      </List>
    </>
  );
}
