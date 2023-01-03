import { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";

export default function Balance(props) {
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    setAmount(
      //   get sum of all transactions if przychod === true (income) and subtract sum of all transactions if przychod === false (expense)
      props.transactions
        .filter((transaction) => transaction.przychod === true)
        .reduce((acc, transaction) => {
          return acc + parseFloat(transaction.kwota);
        }, 0) -
        props.transactions
          .filter((transaction) => transaction.przychod === false)
          .reduce((acc, transaction) => {
            return acc + parseFloat(transaction.kwota);
          }, 0)
    );
  }, [props.transactions]);

  return (
    <>
      <h2>Bilans</h2>
      {props.loading ? (
        <CircularProgress color="success" />
      ) : amount >= 0 ? (
        amount === 0 ? (
          <h3
            style={{
              color: "black",
            }}>
            {amount.toLocaleString("pl-PL", {
              style: "currency",
              currency: "PLN",
            })}{" "}
          </h3>
        ) : (
          <h3
            style={{
              color: "green",
            }}>
            +{" "}
            {amount.toLocaleString("pl-PL", {
              style: "currency",
              currency: "PLN",
            })}{" "}
          </h3>
        )
      ) : (
        <h3
          style={{
            color: "red",
          }}>
          -{" "}
          {amount.toLocaleString("pl-PL", {
            style: "currency",
            currency: "PLN",
          })}{" "}
        </h3>
      )}
      <h4>/ ostatnie 30 dni</h4>
    </>
  );
}
