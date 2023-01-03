import { CircularProgress } from "@mui/material";

export default function AccountsBalance(props) {
  return (
    <>
      <h2>Twoje saldo</h2>
      <h3>
        {props.loading ? (
          <CircularProgress color="success" />
        ) : (
          props.bills
            .reduce((acc, bill) => {
              return acc + parseFloat(bill.kwota);
            }, 0)
            .toLocaleString("pl-PL", {
              style: "currency",
              currency: "PLN",
            })
        )}
      </h3>
    </>
  );
}
