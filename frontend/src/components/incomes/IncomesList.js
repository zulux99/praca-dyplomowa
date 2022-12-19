import { useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Menu3Dots from "./Menu3Dots";

export default function IncomesList(props) {
  useEffect(() => {
    console.log("props in IncomesList: ", props.incomes);
  }, [props]);

  return (
    <>
      <h2>Ostatnie przychody</h2>
      <list className="lista-przychodow">
        {props.incomes
          .sort((a, b) => (a.data > b.data ? -1 : 1))
          .map((income) => (
            <ListItem key={income.id}>
              <label>{income.kwota}</label>
              <label>{props.categoryList.find((category) => category.id === income.kategoria).nazwa}</label>
              <Menu3Dots />
            </ListItem>
          ))}
      </list>
    </>
  );
}
