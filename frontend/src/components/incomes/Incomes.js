import { useContext, useState, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import AddIncomeForm from "./AddIncomeForm";
import Box from "@mui/material/Box";
import IncomesChart from "./chart/IncomesChart";
import IncomesList from "./IncomesList";
import { GetAllBills } from "../bills/GetAllBills";
import { GetAllCategories } from "../categories/GetAllCategoriesRequest";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

export default function Incomes() {
  const user = useContext(AuthContext);
  const [categoryList, setCategoryList] = useState([]);
  const [bills, setBills] = useState([]);
  const [billId, setBillId] = useState("");
  const [incomes, setIncomes] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    GetAllBills(user).then((response) => {
      if (response === -1) {
        console.log("Nie udało się pobrać listy rachunków");
      } else {
        setBills(response);
        const defaultBill = response.find((bill) => bill.domyslne === true);
        setBillId(defaultBill.id);
      }
    });
    GetAllCategories({
      user: user,
      url: "/api/categories/",
    }).then((response) => {
      if (response === -1) {
        console.log("Nie udało się pobrać listy kategorii");
      } else {
        setCategoryList(
          response.filter((category) => category.przychod === true).sort((a, b) => (a.nazwa > b.nazwa ? 1 : -1))
        );
      }
    });
  }, [user]);

  const closeModalAddIncome = () => {
    setOpen(false);
  };

  return (
    <>
      <Box className="box">
        <IncomesChart user={user} setOpen={setOpen} />
      </Box>
      <Box className="box">
        <IncomesList categoryList={categoryList} bills={bills} user={user} incomes={incomes} setIncomes={setIncomes} />
      </Box>

      <Modal className="modal" open={open} onClose={closeModalAddIncome} aria-labelledby="Dodaj przychód">
        <Fade in={open}>
          <Box className="modal-box">
            <AddIncomeForm
              categoryList={categoryList}
              setCategoryList={setCategoryList}
              billId={billId}
              setBillId={setBillId}
              bills={bills}
              setBills={setBills}
              setIncomes={setIncomes}
              closeModalAddIncome={closeModalAddIncome}
            />
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
