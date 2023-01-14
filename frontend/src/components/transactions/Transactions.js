import { useContext, useState, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import Box from "@mui/material/Box";
import { GetAllCategories } from "../categories//GetAllCategoriesRequest";
import "react-confirm-alert/src/react-confirm-alert.css";
import SearchForm from "./SearchForm";
import ListOfTransactions from "./ListOfTransactions";

export default function Transactions() {
  const user = useContext(AuthContext);
  const [bills, setBills] = useState([]);
  const [bill, setBill] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const [categoriesTab, setCategoriesTab] = useState(1);
  const [startDate, setStartDate] = useState(
    new Date(new Date().setDate(new Date().getDate() - 7)).toISOString().slice(0, 10)
  );
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10));
  const [inputValue, setInputValue] = useState("");
  const [inputValueBill, setInputValueBill] = useState("");
  const [category, setCategory] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [transactions, setTransactions] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    let url = "";
    if (categoriesTab === 1) {
      url = "api/categories/?incomes";
    } else {
      url = "api/categories/?expenses";
    }
    setCategoryList([]);
    GetAllCategories({
      user: user,
      url: url,
    }).then((response) => {
      if (response === -1) {
        console.log("Nie udało się pobrać kategorii");
      } else {
        setCategoryList(response);
      }
    });
  }, [categoriesTab]);

  return (
    <Box>
      <Box className="box">
        {/* <SearchForm
          categoryList={categoryList}
          setCategoryList={setCategoryList}
          user={user}
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          inputValue={inputValue}
          setInputValue={setInputValue}
          category={category}
          setCategory={setCategory}
        /> */}
        <ListOfTransactions
          user={user}
          bills={bills}
          setBills={setBills}
          bill={bill}
          setBill={setBill}
          categoryList={categoryList}
          setCategoryList={setCategoryList}
          inputValue={inputValue}
          setInputValue={setInputValue}
          inputValueBill={inputValueBill}
          setInputValueBill={setInputValueBill}
          category={category}
          setCategory={setCategory}
          transactions={transactions}
          setTransactions={setTransactions}
          hasMore={hasMore}
          setHasMore={setHasMore}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          categoriesTab={categoriesTab}
          setCategoriesTab={setCategoriesTab}
        />
      </Box>
    </Box>
  );
}
