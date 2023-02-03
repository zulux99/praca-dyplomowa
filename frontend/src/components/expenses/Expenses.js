import { useContext, useState, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import Box from "@mui/material/Box";
import { GetAllBills } from "../bills/GetAllBills";
import { GetAllCategories } from "../categories/GetAllCategoriesRequest";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import ExpensesChart from "./chart/ExpensesChart";
import ExpensesList from "./ExpensesList";
import AddExpenseForm from "./AddExpenseForm";

export default function Expenses(props) {
  const user = useContext(AuthContext);
  const [categoryList, setCategoryList] = useState([]);
  const [bills, setBills] = useState([]);
  const [billId, setBillId] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    GetAllBills(user).then((response) => {
      if (response === -1) {
        console.log("Nie udało się pobrać listy kont");
      } else {
        setBills(response);
        const defaultBill = response.find((bill) => bill.domyslne === true);
        setBillId(defaultBill.id);
      }
    });
    GetAllCategories({
      user: user,
      url: "/api/categories/?&expenses",
    }).then((response) => {
      if (response === -1) {
        console.log("Nie udało się pobrać listy kategorii");
      } else {
        setCategoryList(response);
      }
    });
  }, [user]);

  const closeModalAddTransaction = () => {
    setOpen(false);
  };

  return (
    <>
      <Box className="box">
        <ExpensesChart user={user} setOpen={setOpen} transactions={transactions} />
      </Box>
      <Box className="box">
        <ExpensesList
          categoryList={categoryList}
          bills={bills}
          user={user}
          transactions={transactions}
          setTransactions={setTransactions}
        />
      </Box>

      <Modal className="modal" open={open} onClose={closeModalAddTransaction} aria-labelledby="Dodaj wydatek">
        <Fade in={open}>
          <Box className="modal-box">
            <AddExpenseForm
              categoryList={categoryList}
              setCategoryList={setCategoryList}
              billId={billId}
              setBillId={setBillId}
              bills={bills}
              setBills={setBills}
              setTransactions={setTransactions}
              closeModalAddTransaction={closeModalAddTransaction}
            />
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
