import AuthContext from "../../context/AuthContext";
import { useContext, useState, useEffect } from "react";
import AddIncomeForm from "./AddIncomeForm";

export default function Incomes() {
  const user = useContext(AuthContext);

  return (
    <>
      <AddIncomeForm />
    </>
  );
}
