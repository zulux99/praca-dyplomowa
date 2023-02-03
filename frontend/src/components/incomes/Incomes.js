import { useContext, useState, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import IncomesChart from "./chart/IncomesChart";
import IncomesList from "./IncomesList";
import AddIncomeForm from "./AddIncomeForm";
import Box from "@mui/material/Box";
import { GetAllBills } from "../bills/GetAllBills";
import { GetAllCategories } from "../categories/GetAllCategoriesRequest";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

export default function Incomes(props) {
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
      url: "/api/categories/?&incomes",
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
        <IncomesChart user={user} setOpen={setOpen} transactions={transactions} />
      </Box>
      <Box className="box">
        <IncomesList
          categoryList={categoryList}
          bills={bills}
          user={user}
          transactions={transactions}
          setTransactions={setTransactions}
        />
      </Box>

      <Modal className="modal" open={open} onClose={closeModalAddTransaction} aria-labelledby="Dodaj przychód">
        <Fade in={open}>
          <Box className="modal-box">
            <AddIncomeForm
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
