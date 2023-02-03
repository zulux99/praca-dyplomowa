import { useContext, useState, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import Box from "@mui/material/Box";
import AccountsBalance from "./AccountsBalance";
import { GetAllBills } from "../bills/GetAllBills";
import { GetTransactionsByPage } from "../transactions/GetTransactionsByPage";
import { GetTransactionsFromDateToDate } from "../transactions/GetTransactionsFromDateToDate";
import Incomes from "./Incomes";
import Expenses from "./Expenses";
import LastTransactions from "./LastTransactions";
import Balance from "./Balance";
import { GetAllCategories } from "../categories/GetAllCategoriesRequest";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import CircularProgress from "@mui/material/CircularProgress";

export default function DashBoard() {
  const user = useContext(AuthContext);
  const [bills, setBills] = useState([]);
  const [last30DaysTransactions, setLast30DaysTransactions] = useState([]);
  const [lastTransactions, setLastTransactions] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  const [loadingLast30DaysTransactions, setLoadingLast30DaysTransactions] = useState(true);
  const [loadingLastTransactions, setLoadingLastTransactions] = useState(true);
  const [loadingBills, setLoadingBills] = useState(true);
  const [loadingCategoryList, setLoadingCategoryList] = useState(true);

  useEffect(() => {
    GetAllBills(user).then((response) => {
      if (response === -1) {
        console.log("Nie udało się pobrać danych o rachunkach");
      } else {
        setBills(response);
        setLoadingBills(false);
      }
    });
    GetTransactionsFromDateToDate({
      user: user,
      date_from: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split("T")[0],
      date_to: new Date().toISOString().split("T")[0],
    }).then((response) => {
      if (response === -1) {
        console.log("Nie udalo sie pobrać transakcji do wykresu");
      } else {
        setLast30DaysTransactions(
          response.results.sort((a, b) => (a.data > b.data ? -1 : a.data === b.data ? (a.id > b.id ? -1 : 1) : 1))
        );
        setLoadingLast30DaysTransactions(false);
      }
    });
    GetAllCategories({
      user: user,
      url: "/api/categories/",
    }).then((response) => {
      if (response === -1) {
        console.log("Nie udało się pobrać danych o kategoriach");
      } else {
        setCategoryList(response);
        setLoadingCategoryList(false);
      }
    });
    loadLastTransactions();
  }, [user]);

  const loadLastTransactions = () => {
    GetTransactionsByPage({ user: user, url: "/api/transactions/?page=1" }).then((response) => {
      if (response === -1) {
        console.log("Nie udało się pobrać ostatnich transakcji");
      } else {
        setLastTransactions(response.results);
        setLoadingLastTransactions(false);
      }
    });
  };

  return (
    <>
      {!loadingLastTransactions && lastTransactions.length > 0 && (
        <Box className="dashboard-container">
          <Box className="box dashboard-card">
            <AccountsBalance user={user} bills={bills} loading={loadingBills} />
          </Box>
          <Box className="box dashboard-card">
            <Incomes transactions={last30DaysTransactions} loading={loadingLast30DaysTransactions} />
          </Box>
          <Box className="box dashboard-card">
            <Expenses transactions={last30DaysTransactions} loading={loadingLast30DaysTransactions} />
          </Box>
          <Box className="box dashboard-card">
            <Balance transactions={last30DaysTransactions} loading={loadingLast30DaysTransactions} />
          </Box>
          <Box className="box dashboard-transactions">
            <LastTransactions
              user={user}
              transactions={lastTransactions}
              setTransactions={setLastTransactions}
              categoryList={categoryList}
              loading={loadingLastTransactions}
              bills={bills}
              reloadTransactions={loadLastTransactions}
            />
          </Box>
        </Box>
      )}
      {loadingLastTransactions && (
        <Box
          className="box"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            pt: "32px",
            pb: "32px",
            textAlign: "center",
          }}>
          <CircularProgress color="success" size={128} />
        </Box>
      )}
      {!loadingLastTransactions && lastTransactions.length === 0 && (
        <Box
          className="box"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            pt: "32px",
            mb: "32px",
            textAlign: "center",
          }}>
          <Typography variant="h4">Nie masz żadnych transakcji</Typography>
          <Typography variant="h5" sx={{ mt: "16px" }}>
            W jaki sposób zacząć korzystać z aplikacji?
          </Typography>
          <List sx={{ mt: "32px", mb: "32px", p: "0 32px" }}>
            <ListItem
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
              <Typography variant="h6">Krok 1.</Typography>
            </ListItem>
            <ListItem>
              Po pierwszym uruchomieniu aplikacji, musisz utworzyć co najmniej jedno konto, które będzie źródłem Twoich
              pieniędzy.
            </ListItem>
            <ListItem
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
              <Typography variant="h6">Krok 2.</Typography>
            </ListItem>
            <ListItem>
              Następnie możesz dodawać kategorie swoich przychodów i wydatków. Możesz to zrobić podczas dodawania nowych
              transakcji lub w osobnej zakładce.
            </ListItem>
            <ListItem
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
              <Typography variant="h6">Krok 3.</Typography>
            </ListItem>
            <ListItem>
              W zakładce "Lista transakcji" możesz zobaczyć wszystkie swoje transakcje, w tym przychody i wydatki.
            </ListItem>
            <ListItem
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
              <Typography variant="h6">Krok 4.</Typography>
            </ListItem>
            <ListItem>
              W zakładce "Wykresy" możesz zobaczyć wykresy swoich transakcji według kategorii i czasu.
            </ListItem>
            <ListItem
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
              <Typography variant="h6">Krok 5.</Typography>
            </ListItem>
            <ListItem>
              W zakładce "Dłużnicy" możesz śledzić swoje pożyczki poprzez dodawanie rekordów dotyczących osób, którym
              pożyczyłeś pieniądze, oraz śledzenie ich spłat.
            </ListItem>
            <ListItem
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
              <Typography variant="h6">Krok 6.</Typography>
            </ListItem>
            <ListItem>
              Kontynuuj dodawanie swoich transakcji i śledzenie swoich finansów. Aplikacja pomoże Ci zachować pełen
              wgląd w swoje finanse i łatwo nadzorować swoje przychody i wydatki.
            </ListItem>
            <ListItem
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mt: "32px",
              }}>
              <Typography variant="h6">Miłego korzystania z aplikacji!</Typography>
            </ListItem>
          </List>
        </Box>
      )}
    </>
  );
}
