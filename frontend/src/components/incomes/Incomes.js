import { useContext, useState, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import AddIncomeForm from "./AddIncomeForm";
import Box from "@mui/material/Box";
import IncomesChart from "./IncomesChart";
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
      {/* <Box className="tabs">
        <Tabs value={activeTab} variant="scrollable" centered fullWidth>
          <Tab label="Lista" onClick={() => setActiveTab(0)} />
          <Tab label="Dodaj przychód" onClick={() => setActiveTab(1)} />
          <Tab label="Wykres" onClick={() => setActiveTab(2)} />
        </Tabs>
      </Box>
      <SwipeableViews
        containerStyle={{
          transition: "transform 0.35s cubic-bezier(0.15, 0.3, 0.25, 1) 0s",
        }}
        index={activeTab}
        onChangeIndex={(index) => setActiveTab(index)}>
        <Box className="box">
          <p>W tym miejscu będą wyświetlane ostatnie przychody</p>
        </Box>
        <Box className="box">
          <AddIncomeForm />
        </Box>
        <Box className="box">
          <IncomesChart />
        </Box>
      </SwipeableViews> */}

      <Box className="box">
        <IncomesChart />
      </Box>
      <Box className="box">
        <AddIncomeForm
          categoryList={categoryList}
          setCategoryList={setCategoryList}
          billId={billId}
          setBillId={setBillId}
          bills={bills}
          setBills={setBills}
        />
      </Box>
      <Box className="box">
        <IncomesList incomes={incomes} setIncomes={setIncomes} categoryList={categoryList} bills={bills} />
      </Box>
    </>
  );
}
