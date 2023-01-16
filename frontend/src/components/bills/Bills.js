import AuthContext from "../../context/AuthContext";
import AddBill from "./AddBill";
import DoughnutChart from "./DoughnutChart";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Check from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Menu3Dots from "../Menu3Dots";
import CircularProgress from "@mui/material/CircularProgress";
import { useConfirm } from "material-ui-confirm";
import { DeleteBill } from "./DeleteBillRequest";
import { ToastContainer, toast } from "react-toastify";

function Bills() {
  const user = useContext(AuthContext);
  const [bills, setBills] = useState([]);
  const [billEditing, setBillEditing] = useState(-1);
  const [loading, setLoading] = useState(true);
  const user_id = user.user.user_id;
  const confirm = useConfirm();

  useEffect(() => {
    getBills();
    return () => {
      setBills([]);
    };
  }, []);

  const getBills = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/bills/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.authTokens.access}`,
        },
      });
      setBills(response.data);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const changeBillName = async (bill) => {
    setLoading(true);
    try {
      const response = await axios.put(
        `/api/bills/update/${bill.id}/`,
        JSON.stringify({ user: user_id, nazwa: bill.nazwa }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.authTokens.access}`,
          },
        }
      );
      console.log(response.data);
      getBills();
      setBillEditing(-1);
      toast.success("Zmieniono nazwę konta");
    } catch (err) {
      console.log(err.response.data);
    }
    setLoading(false);
  };

  const deleteBill = async (id) => {
    confirm({
      title: "Potwierdź usunięcie",
      content: (
        <span>
          <b>Uwaga!</b> Usunięcie konta spowoduje usunięcie wszystkich transakcji powiązanych z tym kontem.
          <p>
            Wpisz <b>tak</b> aby potwierdzić usunięcie.
          </p>
        </span>
      ),
      confirmationKeyword: "tak",
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
        setLoading(true);
        DeleteBill({
          id,
          user,
        }).then((response) => {
          if (response === -1) {
            console.log("Nie udało się usunąć konta");
          } else {
            getBills();
            toast.success("Usunięto konto");
          }
          setLoading(false);
        });
      })
      .catch(() => {
        console.log("Anulowano usunięcie konta");
      });
  };

  const makeDefault = async (bill) => {
    setLoading(true);
    if (bill.domyślne === 1) {
      return;
    }
    try {
      await axios.put(
        `/api/bills/update/${bill.id}/`,
        JSON.stringify({ user: user_id, nazwa: bill.nazwa, domyslne: true }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.authTokens.access}`,
          },
        }
      );
      getBills();
      toast.success("Ustawiono domyślne konto");
    } catch (err) {
      alert("Nie udało się ustawić domyślnego konta");
    }
    setLoading(false);
  };

  return (
    <>
      <ToastContainer position="bottom-center" autoClose={2000} />
      <Container align="center">
        <Box>
          <DoughnutChart bills={bills} />
        </Box>
        <List>
          {loading ? (
            <CircularProgress color="success" />
          ) : (
            bills.map((bill, index) => (
              <Box key={index}>
                <ListItem key={index}>
                  <form onSubmit={(e) => e.preventDefault()}>
                    <TextField
                      defaultValue={bill.nazwa}
                      variant="standard"
                      onChange={(e) => ((bills[index].nazwa = e.target.value), console.log(bills))}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          changeBillName(bills[index]);
                          e.target.blur();
                        }
                      }}
                    />
                  </form>
                  <Box className="konto" sx={bill.domyslne ? { backgroundColor: "lightgreen" } : null}>
                    <Box className="konto_nazwa_kwota">
                      <InputLabel className="konto_nazwa">{bill.nazwa + " "}</InputLabel>
                      <InputLabel className="konto_kwota">{bill.kwota} zł</InputLabel>
                    </Box>
                    <Box className="konto_edytuj" onClick={() => setBillEditing(bill.id)}>
                      <IconButton>
                        <EditIcon color="info" />
                      </IconButton>
                    </Box>
                    <Box
                      className="konto_zatwierdz"
                      sx={billEditing == bill.id ? { display: "block" } : { display: "none" }}>
                      <IconButton onClick={() => changeBillName(bill)}>
                        <Check color="success" />
                      </IconButton>
                    </Box>
                    <Box>
                      <IconButton onClick={() => deleteBill(bill.id)}>
                        <DeleteIcon color="error" />
                      </IconButton>
                    </Box>
                    <Menu3Dots bill={bill} id={bill.id} makeDefault={makeDefault} deleteBill={deleteBill} />
                  </Box>
                </ListItem>
              </Box>
            ))
          )}
        </List>
        <AddBill bills={bills} user={user} getBills={getBills} />
      </Container>
    </>
  );
}

export default Bills;
