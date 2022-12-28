import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Menu3Dots from "./Menu3Dots";

export const findCategoryName = (categoryList, categoryId) => {
  try {
    return categoryList.find((category) => category.id === categoryId).nazwa;
  } catch (err) {
    return "Nieznana";
  }
};

export default function IncomesList(props) {
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
        {props.incomes
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
      </List>
    </>
  );
}
