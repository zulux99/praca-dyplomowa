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
import TextField from "@mui/material/TextField";
import Check from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Close from "@mui/icons-material/Close";
import { useConfirm } from "material-ui-confirm";
import { DeleteBill } from "./DeleteBillRequest";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function Bills() {
  const user = useContext(AuthContext);
  const [bills, setBills] = useState([]);
  const [billEditing, setBillEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addBillFormOpen, setAddBillFormOpen] = useState(false);
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

  const updateBill = async (bill) => {
    setLoading(true);
    try {
      const response = await axios.put(
        `/api/bills/update/${bill.id}/`,
        JSON.stringify({ user: user_id, nazwa: bill.nazwa, kwota: bill.kwota }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.authTokens.access}`,
          },
        }
      );
      console.log(response.data);
      getBills();
      setBillEditing(null);
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
      .catch(() => {});
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
      <Box
        className="box"
        sx={{
          display: loading && "flex",
          justifyContent: loading && "center",
          padding: loading && "64px",
        }}>
        {loading ? (
          <CircularProgress color="success" size={128} />
        ) : (
          <Box>
            <Box>
              <DoughnutChart bills={bills} />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                margin: "32px 0",
              }}>
              <Button
                variant="contained"
                color="success"
                onClick={() => setAddBillFormOpen(true)}
                size="large"
                sx={{
                  width: "100%",
                  maxWidth: "240px",
                }}>
                Dodaj konto
              </Button>
            </Box>
            <List>
              {bills.map((bill, index) => (
                <Link onClick={() => makeDefault(bill)}>
                  <Box key={index}>
                    <ListItem
                      key={index}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                      }}>
                      <Box
                        component="span"
                        sx={{
                          backgroundColor: bill.domyslne && "rgba(0, 255, 0, 0.15)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "100%",
                          maxWidth: "640px",
                          padding: "8px 16px",
                        }}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: "75%",
                          }}>
                          {billEditing === bill.id && (
                            <TextField
                              defaultValue={bill.nazwa}
                              variant="standard"
                              onChange={(e) => (bills[index].nazwa = e.target.value)}
                              color="success"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                              }}
                              onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                  updateBill(bills[index]);
                                  e.target.blur();
                                }
                              }}
                            />
                          )}
                          {billEditing !== bill.id && (
                            <InputLabel className="konto_nazwa" sx={{}}>
                              {bill.nazwa + " "}
                            </InputLabel>
                          )}
                          {billEditing === bill.id && (
                            <TextField
                              sx={{
                                marginLeft: "16px",
                              }}
                              defaultValue={bill.kwota}
                              variant="standard"
                              onChange={(e) => (bills[index].kwota = e.target.value)}
                              color="success"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                              }}
                              // numeric input
                              type="number"
                              InputProps={{
                                inputProps: {
                                  inputMode: "numeric",
                                },
                              }}
                              onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                  updateBill(bills[index]);
                                  e.target.blur();
                                }
                              }}
                            />
                          )}
                          {billEditing !== bill.id && <InputLabel className="konto_kwota">{bill.kwota} zł</InputLabel>}
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            width: "25%",
                          }}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}>
                          <IconButton
                            onClick={() => setBillEditing(bill.id)}
                            sx={billEditing == bill.id ? { display: "none" } : { display: "block" }}>
                            <EditIcon color="info" />
                          </IconButton>
                          <IconButton
                            onClick={() => updateBill(bill)}
                            sx={billEditing == bill.id ? { display: "block" } : { display: "none" }}>
                            <Check color="success" />
                          </IconButton>
                          <IconButton
                            onClick={() => setBillEditing(null)}
                            sx={billEditing == bill.id ? { display: "block" } : { display: "none" }}>
                            <Close color="error" />
                          </IconButton>
                          <IconButton onClick={() => deleteBill(bill.id)}>
                            <DeleteIcon color="error" />
                          </IconButton>
                        </Box>
                      </Box>
                    </ListItem>
                  </Box>
                </Link>
              ))}
            </List>
            <AddBill
              bills={bills}
              user={user}
              getBills={getBills}
              open={addBillFormOpen}
              setOpen={setAddBillFormOpen}
            />
          </Box>
        )}
      </Box>
    </>
  );
}

export default Bills;
