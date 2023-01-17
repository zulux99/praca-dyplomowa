import { useContext, useState, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import { GetAllCategories } from "../categories/GetAllCategoriesRequest";
import ByCategory from "./ByCategory";
import ChartBox from "./ChartBox";

export default function Charts() {
  const user = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [showedDateFrom, setShowedDateFrom] = useState(null);
  const [showedDateTo, setShowedDateTo] = useState(null);
  const [loadingChart, setLoadingChart] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingTransactions, setLoadingTransactions] = useState(false);
  const [labels, setLabels] = useState([]);
  const [datasets, setDatasets] = useState([]);
  const [isAnyIncome, setIsAnyIncome] = useState(false);
  const [isAnyExpense, setIsAnyExpense] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    GetAllCategories({
      user,
      url: "/api/categories/",
    }).then((response) => {
      if (response === -1) {
        console.log("Nie udało się pobrać kategorii");
      } else {
        setCategories(response);
        setLoadingCategories(false);
      }
    });
  }, [user]);

  return (
    <>
      <ByCategory
        user={user}
        categories={categories}
        transactions={transactions}
        showedDateFrom={showedDateFrom}
        showedDateTo={showedDateTo}
        loadingChart={loadingChart}
        loadingCategories={loadingCategories}
        loadingTransactions={loadingTransactions}
        labels={labels}
        datasets={datasets}
        setLabels={setLabels}
        setDatasets={setDatasets}
        setLoadingChart={setLoadingChart}
        setLoadingTransactions={setLoadingTransactions}
        setShowedDateFrom={setShowedDateFrom}
        setShowedDateTo={setShowedDateTo}
        setTransactions={setTransactions}
        setIsAnyIncome={setIsAnyIncome}
        setIsAnyExpense={setIsAnyExpense}
        setSubmitted={setSubmitted}
      />
      <ChartBox
        labels={labels}
        datasets={datasets}
        showedDateFrom={showedDateFrom}
        showedDateTo={showedDateTo}
        loadingChart={loadingChart}
        loadingCategories={loadingCategories}
        loadingTransactions={loadingTransactions}
        transactions={transactions}
        isAnyIncome={isAnyIncome}
        isAnyExpense={isAnyExpense}
        submitted={submitted}
      />
    </>
  );
}
