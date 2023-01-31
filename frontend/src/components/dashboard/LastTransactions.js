import { CircularProgress } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";

export const findCategoryName = (categoryList, categoryId) => {
  try {
    return categoryList.find((category) => category.id === categoryId).nazwa;
  } catch (err) {
    return "Nieznana";
  }
};

export default function LastTransactions(props) {
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
        <h2>Ostatnie transakcje</h2>
        <Link to="/transactions">Zobacz więcej</Link>
      </Box>
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
        {props.loading ? (
          <CircularProgress color="success" />
        ) : (
          props.transactions
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
            ))
        )}
      </List>
    </>
  );
}
