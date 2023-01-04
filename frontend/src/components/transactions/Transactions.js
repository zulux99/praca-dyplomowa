import { useContext, useState, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import Box from "@mui/material/Box";
import { GetAllCategories } from "../categories//GetAllCategoriesRequest";
import { ToastContainer, toast } from "react-toastify";
import AddCategoryForm from "../categories/AddCategoryForm";
import CategoryList from "../categories/CategoryList";
import { DeleteCategory } from "../categories/DeleteCategoryRequest";
import { confirmAlert } from "react-confirm-alert";
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

  const handleDelete = (id) => {
    confirmAlert({
      title: "Potwierdź usunięcie",
      message:
        "Czy na pewno chcesz usunąć tę kategorię? Usunięcie kategorii spowoduje usunięcie wszystkich transakcji z nią powiązanych.",
      buttons: [
        {
          label: "Tak",
          onClick: () => {
            DeleteCategory(user, id).then((response) => {
              if (response === -1) {
                toast.error("Nie udało się usunąć kategorii");
              } else {
                setCategoryList(categoryList.filter((category) => category.id !== id));
                toast.success("Usunięto kategorię");
              }
            });
          },
        },
        {
          label: "Nie",
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <Box>
      <ToastContainer position="bottom-center" autoClose={2000} />
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
      <h1>Lista kategorii</h1>
      <CategoryList categoryList={categoryList} handleDelete={handleDelete} />
      <AddCategoryForm categoryList={categoryList} setCategoryList={setCategoryList} user={user} />
    </Box>
  );
}
