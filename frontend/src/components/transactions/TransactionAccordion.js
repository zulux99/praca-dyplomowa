import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Divider from "@mui/material/Divider";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import DeleteIcon from "@mui/icons-material/Delete";
import { DeleteTransaction } from "./DeleteTransactionRequest";
import { useConfirm } from "material-ui-confirm";
import { toast } from "react-toastify";

export const findCategoryName = (categoryList, categoryId) => {
  try {
    return categoryList.find((category) => category.id === categoryId).nazwa;
  } catch (err) {
    return "Nieznana";
  }
};

export const findBillName = (billList, billId) => {
  try {
    return billList.find((bill) => bill.id === billId).nazwa;
  } catch (err) {
    return "Nieznane";
  }
};

export default function TransactionAccordion(props) {
  const confirm = useConfirm();
  const handleDeleteTransaction = (transaction) => {
    confirm({
      title: "Potwierdź usunięcie",
      description: "Czy na pewno usunąć tą transakcję?",
      confirmationText: "Usuń",
      cancellationText: "Anuluj",
      confirmationButtonProps: {
        color: "success",
      },
      cancellationButtonProps: {
        color: "success",
      },
    })
      .then(() => {
        DeleteTransaction({
          user: props.user,
          id: transaction.id,
        }).then((response) => {
          if (response === -1) {
            console.log("Nie udało się usunąć transakcji");
          } else {
            props.setTransactions(props.transactions.filter((t) => t.id !== transaction.id));
            if (props.reloadTransactions) props.reloadTransactions();
            toast.success("Usunięto transakcję");
          }
        });
      })
      .catch(() => {});
  };

  return (
    <Accordion
      key={props.transaction.id}
      expanded={props.expanded === props.transaction.id}
      onChange={(event, isExpanded) => {
        if (event.target.tagName !== "BUTTON") {
          props.setExpanded(isExpanded ? props.transaction.id : false);
        }
      }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <ListItem
          key={props.transaction.id}
          sx={{
            padding: "0px",
          }}>
          {props.transaction.przychod ? (
            <span
              style={{
                color: "green",
                width: "calc(100% * 1/3)",
                paddingRight: "10px",
              }}>
              + {props.transaction.kwota} zł
            </span>
          ) : (
            <span
              style={{
                color: "red",
                width: "calc(100% * 1/3)",
                paddingRight: "10px",
              }}>
              - {props.transaction.kwota} zł
            </span>
          )}
          <span
            style={{
              width: "calc(100% * 1/3)",
              paddingRight: "10px",
            }}>
            {new Date(props.transaction.data).toLocaleDateString("pl-PL", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <span
            style={{
              width: "calc(100% * 1/3)",
            }}>
            {findCategoryName(props.categoryList, props.transaction.kategoria)}
          </span>
        </ListItem>
      </AccordionSummary>
      <AccordionDetails>
        <Divider />
        <ListItem
          key={props.transaction.id}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-start",
            width: "100%",
          }}>
          <span>
            Kwota: <b>{props.transaction.kwota} zł</b>
          </span>
          <span>
            Data:{" "}
            <b>
              {new Date(props.transaction.data).toLocaleDateString("pl-PL", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </b>
          </span>
          <span>
            Kategoria: <b>{findCategoryName(props.categoryList, props.transaction.kategoria)}</b>
          </span>
          <span>
            Konto: <b>{findBillName(props.bills, props.transaction.rachunek)}</b>
          </span>
          <span>
            Opis: <b>{props.transaction.opis}</b>
          </span>
          <span
            style={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
            }}>
            <IconButton onClick={() => handleDeleteTransaction(props.transaction)}>
              <DeleteIcon color="error" />
            </IconButton>
          </span>
        </ListItem>
      </AccordionDetails>
    </Accordion>
  );
}
