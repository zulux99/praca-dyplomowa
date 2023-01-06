import { useContext, useState, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import base_url from "../../UrlAndPort";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { ToastContainer, toast } from "react-toastify";
import AddDebt from "./AddDebt";
import AddPayment from "./AddPayment";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BorderLinearProgress from "@mui/material/LinearProgress";
import { GetAllDebts } from "./GetAllDebts";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CloseIcon from "@mui/icons-material/Close";
import { DeleteDebt } from "./DeleteDebtRequest";
import { useConfirm } from "material-ui-confirm";
import Divider from "@mui/material/Divider";

function Debtors() {
  const user = useContext(AuthContext);
  const confirm = useConfirm();
  const [openAddDebtor, setOpenAddDebtor] = useState(false);
  const [openAddPayment, setOpenAddPayment] = useState(false);
  const [debts, setDebts] = useState([]);
  const [payments, setPayments] = useState([]);
  const [debtId, setDebtId] = useState(null);
  const [sortType, setSortType] = useState("id");
  const [expanded, setExpanded] = useState(null);
  const [loadingDebts, setLoadingDebts] = useState(true);
  const [loadingPayments, setLoadingPayments] = useState(true);

  useEffect(() => {
    getDebts();
    getPayments();
    return () => {
      setDebts([]);
    };
  }, []);

  const getDebts = () => {
    GetAllDebts(user).then((debts) => {
      setDebts(debts);
      setLoadingDebts(false);
    });
  };

  // TODO: Sort debts

  // useEffect(() => {
  //   const types = {
  //     kwota: 'kwota_do_splaty',
  //     nazwa: 'nazwa_dluznika',
  //     id: 'id'
  //   };
  //   const property = types[sortType];
  //   const sortedDebts = [...debts].sort((a, b) => {
  //     return a[property] - b[property];
  //   });
  //   // if id is selected, sort by id in descending order
  //   if (sortType === 'id') {
  //     sortedDebts.reverse();
  //   }
  //   setDebts(sortedDebts);
  //   console.log(sortedDebts);
  // }, [sortType]);

  const getPayments = async () => {
    try {
      const response = await axios.get(`/api/debts/payments/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.authTokens.access}`,
        },
      });
      setPayments(response.data);
      setLoadingPayments(false);
    } catch (err) {
      console.log(err);
    }
  };

  const getTotalPayments = (debt) => {
    return payments
      .filter((payment) => payment.dlug === debt.id)
      .reduce((acc, payment) => acc + parseFloat(payment.kwota), 0)
      .toFixed(2);
  };

  const openModalAddDebtor = () => setOpenAddDebtor(true);
  const closeModalAddDebtor = () => setOpenAddDebtor(false);

  const openModalAddPayment = (debt_id) => {
    setOpenAddPayment(true);
    setDebtId(debt_id);
  };
  const closeModalAddPayment = () => {
    setOpenAddPayment(false);
    setDebtId(null);
  };

  const deleteDebt = (id) => {
    confirm({
      title: "Potwierdź usunięcie",
      description: "Czy na pewno chcesz usunąć dług?",
      confirmationText: "Usuń",
      cancellationText: "Anuluj",
      confirmationButtonProps: {
        color: "success",
      },
      cancellationButtonProps: {
        color: "success",
      },
    }).then(() => {
      DeleteDebt({
        id,
        user,
      }).then((response) => {
        if (response === -1) {
          console.log("Nie udało się usunąć długu");
        } else {
          setDebts(debts.filter((debt) => debt.id !== id));
          toast.success("Usunięto dług");
        }
      });
    });
  };

  const deletePayment = (id) => {};

  return (
    <>
      <Box
        className="box"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <ToastContainer position="bottom-center" autoClose={2000} />
        <Box
          component="span"
          sx={{
            marginBottom: "32px",
          }}>
          <Button variant="contained" onClick={openModalAddDebtor} color="success" size="large">
            Dodaj dłużnika
          </Button>
        </Box>
        <AddDebt open={openAddDebtor} closeModal={closeModalAddDebtor} getDebts={getDebts} />
        <AddPayment
          open={openAddPayment}
          closeModal={closeModalAddPayment}
          payments={payments}
          getPayments={getPayments}
          getTotalPayments={getTotalPayments}
          debts={debts}
          debtId={debtId}
        />
        <Container>
          <Box className="dlugi">
            {loadingDebts ? (
              <CircularProgress color="success" />
            ) : (
              debts
                .sort((a, b) => {
                  if (a.splacony === b.splacony) {
                    return b.id - a.id;
                  } else {
                    return a.splacony - b.splacony;
                  }
                })
                .map((debt) => (
                  <Accordion
                    key={debt.id}
                    className="dlug"
                    expanded={expanded === debt.id}
                    // dont expand on button click
                    onChange={(event, isExpanded) => {
                      if (event.target.tagName !== "BUTTON") {
                        setExpanded(isExpanded ? debt.id : false);
                      }
                    }}>
                    <AccordionSummary
                      className="accordion-summary"
                      disabled={debt.splacony || getTotalPayments(debt) == debt.kwota_do_splaty}>
                      <List
                        key={debt.id}
                        className="dlug-info"
                        sx={{
                          flexWrap: "wrap",
                        }}>
                        <ListItem className="nazwa_dluznika">{debt.nazwa_dluznika}</ListItem>
                        <ListItem className="kwota_do_splaty">
                          {debt.kwota_do_splaty.toLocaleString("pl-PL", {
                            style: "currency",
                            currency: "PLN",
                          })}{" "}
                          {"zł"}
                        </ListItem>
                        {!debt.splacony && getTotalPayments(debt) != debt.kwota_do_splaty && (
                          <ListItem
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "flex-end",
                              alignItems: "center",
                            }}>
                            <IconButton
                              color="success"
                              onClick={(e) => {
                                openModalAddPayment(debt.id);
                                e.stopPropagation();
                              }}>
                              <AddCircleIcon />
                            </IconButton>
                            <IconButton
                              variant="contained"
                              color="error"
                              onClick={(e) => {
                                deleteDebt(debt.id);
                                e.stopPropagation();
                              }}>
                              <DeleteIcon />
                            </IconButton>
                          </ListItem>
                        )}
                      </List>
                      <BorderLinearProgress
                        className="progress-bar"
                        variant="determinate"
                        color="success"
                        value={(getTotalPayments(debt) / debt.kwota_do_splaty) * 100}
                      />
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box className="szczegoly">
                        <List
                          key={debt.id}
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                          }}>
                          <ListItem key={debt.id}>
                            <span>
                              Nazwa dłużnika: <strong>{debt.nazwa_dluznika}</strong>
                            </span>
                          </ListItem>
                          <ListItem key={debt.id}>
                            <span>
                              Cel: <strong>{debt.cel ? debt.cel : "-"}</strong>
                            </span>
                          </ListItem>
                          <ListItem key={debt.id}>
                            <span>
                              Kwota do spłaty: <strong>{debt.kwota_do_splaty}</strong>
                            </span>
                          </ListItem>
                          <ListItem key={debt.id}>
                            <span>
                              Spłacono:&nbsp;
                              <strong>
                                {getTotalPayments(debt).toLocaleString("pl-PL", {
                                  style: "currency",
                                  currency: "PLN",
                                })}
                                &nbsp; zł
                              </strong>
                            </span>
                          </ListItem>
                        </List>
                      </Box>
                      {getTotalPayments(debt) > 0 && (
                        <div className="splaty">
                          <Divider />
                          <Box className="splaty-header">
                            <h3>Spłaty</h3>
                          </Box>
                          <Box className="splaty-body">
                            {loadingPayments ? (
                              <CircularProgress color="success" />
                            ) : (
                              payments
                                .filter((payment) => payment.dlug === debt.id)
                                //sort by date then by id (newest first)
                                .sort((a, b) => {
                                  if (a.data_splaty === b.data_splaty) {
                                    return b.id - a.id;
                                  } else {
                                    return new Date(b.data_splaty) - new Date(a.data_splaty);
                                  }
                                })
                                .map((payment) => (
                                  <div>
                                    <List className="splata" key={payment.id}>
                                      <ListItem className="kwota">
                                        Kwota:&nbsp;
                                        <strong>
                                          {payment.kwota.toLocaleString("pl-PL", {
                                            style: "currency",
                                            currency: "PLN",
                                          })}
                                          {" zł"}
                                        </strong>
                                      </ListItem>
                                      <ListItem className="data_splaty">
                                        Data spłaty:&nbsp;
                                        <strong>
                                          {new Date(payment.data_splaty).toLocaleDateString("pl-PL", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                          })}
                                        </strong>
                                      </ListItem>
                                    </List>
                                    <Box className="splaty-usun">
                                      <IconButton
                                        color="error"
                                        onClick={(e) => {
                                          deletePayment(payment.id);
                                          e.stopPropagation();
                                        }}>
                                        <DeleteIcon />
                                      </IconButton>
                                    </Box>
                                  </div>
                                ))
                            )}
                          </Box>
                        </div>
                      )}
                      <Button
                        className="close"
                        color="success"
                        onClick={(e) => {
                          setExpanded(false);
                          e.stopPropagation();
                        }}
                        sx={{
                          width: "100%",
                        }}>
                        <ExpandMoreIcon style={{ transform: "rotate(180deg)" }} color="success" />
                      </Button>
                    </AccordionDetails>
                  </Accordion>
                ))
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Debtors;
