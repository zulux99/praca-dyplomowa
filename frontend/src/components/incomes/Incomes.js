import { useContext, useState, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import AddIncomeForm from "./AddIncomeForm";
import Box from "@mui/material/Box";
import IncomesChart from "./chart/IncomesChart";
import IncomesList from "./IncomesList";
import { GetAllBills } from "../bills/GetAllBills";
import { GetAllCategories } from "../categories/GetAllCategoriesRequest";
import { toast, ToastContainer } from "react-toastify";
import { GetAllIncomes } from "./GetAllIncomes";

export default function Incomes() {
  const user = useContext(AuthContext);
  const [incomes, setIncomes] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [bills, setBills] = useState([]);
  const [billId, setBillId] = useState("");

  useEffect(() => {
    GetAllBills(user).then((response) => {
      if (response === -1) {
        toast.error("Nie udało się pobrać listy rachunków");
      } else {
        setBills(response);
        const defaultBill = response.find((bill) => bill.domyslne === true);
        setBillId(defaultBill.id);
      }
    });
    GetAllCategories(user).then((response) => {
      if (response === -1) {
        toast.error("Nie udało się pobrać listy kategorii");
      } else {
        setCategoryList(
          response.filter((category) => category.przychod === true).sort((a, b) => (a.nazwa > b.nazwa ? 1 : -1))
        );
      }
    });
    GetAllIncomes(user).then((response) => {
      if (response === -1) {
        toast.error("Nie udało się pobrać listy przychodów");
      } else {
        setIncomes(response);
      }
    });
  }, [user]);

  return (
    <>
      <ToastContainer position="bottom-center" autoClose={2000} />

      <Box className="box">
        <IncomesChart incomes={incomes} />
      </Box>
      <Box className="box">
        <AddIncomeForm
          categoryList={categoryList}
          setCategoryList={setCategoryList}
          billId={billId}
          setBillId={setBillId}
          bills={bills}
          setBills={setBills}
          incomes={incomes}
          setIncomes={setIncomes}
        />
      </Box>
      <Box className="box">
        <IncomesList incomes={incomes} setIncomes={setIncomes} categoryList={categoryList} bills={bills} user={user} />
      </Box>
    </>
  );
}
