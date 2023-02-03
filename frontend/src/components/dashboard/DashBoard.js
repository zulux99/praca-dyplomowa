import { useContext, useState, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import AccountsBalance from "./AccountsBalance";
import { GetAllBills } from "../bills/GetAllBills";
import { GetTransactionsByPage } from "../transactions/GetTransactionsByPage";
import { GetTransactionsFromDateToDate } from "../transactions/GetTransactionsFromDateToDate";
import Incomes from "./Incomes";
import Expenses from "./Expenses";
import LastTransactions from "./LastTransactions";
import Balance from "./Balance";
import { GetAllCategories } from "../categories/GetAllCategoriesRequest";

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
    </>
  );
}
