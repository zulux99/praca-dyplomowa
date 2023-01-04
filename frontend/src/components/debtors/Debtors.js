import { useContext, useState, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import Menu3Dots from "../Menu3Dots";
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

function Debtors() {
  const user = useContext(AuthContext);
  const user_id = user.user.user_id;
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

  return (
    <>
      <ToastContainer position="bottom-center" autoClose={2000} />
      <Button variant="contained" onClick={openModalAddDebtor} color="success">
        Dodaj
      </Button>
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
        <h1>Lista dłużników</h1>
        <Box>
          <Button variant="contained" onClick={() => setSortType("nazwa")} color="success">
            Sortuj po nazwie
          </Button>
          <Button variant="contained" onClick={() => setSortType("kwota")} color="success">
            Sortuj po kwocie
          </Button>
        </Box>
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
                    expandIcon={<ExpandMoreIcon />}
                    disabled={debt.splacony || getTotalPayments(debt) == debt.kwota_do_splaty}>
                    <List key={debt.id}>
                      <li className="nazwa_dluznika">{debt.nazwa_dluznika}</li>
                      <li className="cel">{debt.cel}</li>
                      <li className="kwota_do_splaty">
                        {debt.splacony ? debt.kwota_do_splaty : getTotalPayments(debt)}
                        &nbsp;/&nbsp;{debt.kwota_do_splaty}
                      </li>
                      {!debt.splacony && getTotalPayments(debt) != debt.kwota_do_splaty && (
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => {
                            openModalAddPayment(debt.id);
                          }}>
                          Dodaj wpłatę
                        </Button>
                      )}
                      <Menu3Dots />
                    </List>
                    <BorderLinearProgress
                      className="progress-bar"
                      variant="determinate"
                      color="success"
                      value={(getTotalPayments(debt) / debt.kwota_do_splaty) * 100}
                    />
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="splaty">
                      {loadingPayments ? (
                        <CircularProgress color="success" />
                      ) : (
                        payments
                          .filter((payment) => payment.dlug === debt.id)
                          .map((payment) => (
                            <ul className="splata" key={payment.id}>
                              <li className="kwota">{payment.kwota}</li>
                              <li className="data_splaty">{payment.data_splaty}</li>
                            </ul>
                          ))
                      )}
                    </div>
                  </AccordionDetails>
                </Accordion>
              ))
          )}
        </Box>
      </Container>
    </>
  );
}

export default Debtors;
