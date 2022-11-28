import { useContext, useState, useEffect } from 'react';
import AuthContext from '../../context/AuthContext';
import Menu3Dots from '../Menu3Dots';
import axios from 'axios';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { ToastContainer, toast } from 'react-toastify';
import AddDebt from './AddDebt';
import AddPayment from './AddPayment';
import Box from '@mui/material/Box';
import List from '@mui/material/List';

function debts() {
  const user = useContext(AuthContext);
  const user_id = user.user.user_id;
  const [openAddDebtor, setOpenAddDebtor] = useState(false);
  const [openAddPayment, setOpenAddPayment] = useState(false);
  const [debts, setDebts] = useState([]);
  const [payments, setPayments] = useState([]);
  const [debtId, setDebtId] = useState(null);
  const [sortType, setSortType] = useState('id');

  useEffect(() => {
    getDebts();
    getPayments();
    return () => {
      setDebts([]);
    };
  }, []);

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

  const getDebts = async () => {
    try {
      const response = await axios.get(`/api/debts`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.authTokens.access}`
        }
      });
      setDebts(response.data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getPayments = async () => {
    try {
      const response = await axios.get(`/api/debts/payments`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.authTokens.access}`
        }
      });
      setPayments(response.data);
      console.log(response.data);
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
      <Button variant="contained" onClick={openModalAddDebtor}>
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
          <Button variant="contained" onClick={() => setSortType('nazwa')}>
            Sortuj po nazwie
          </Button>
          <Button variant="contained" onClick={() => setSortType('kwota')}>
            Sortuj po kwocie
          </Button>
        </Box>
        <Box className="dlugi">
          {debts
            .sort((a, b) => {
              if (a.splacony === b.splacony) {
                return b.id - a.id;
              } else {
                return a.splacony - b.splacony;
              }
            })
            .map((debt) => (
              <div key={debt.id} className="dlug">
                <List
                  key={debt.id}
                  className={
                    debt.splacony || getTotalPayments(debt) == debt.kwota_do_splaty
                      ? 'dlug-splacony'
                      : 'dlug-niesplacony'
                  }
                  sx={{
                    background: `linear-gradient(90deg, rgba(0, 255, 0, 0.5) ${
                      (getTotalPayments(debt) / debt.kwota_do_splaty) * 100
                    }%, rgba(255, 0, 0, 0.5) ${
                      (getTotalPayments(debt) / debt.kwota_do_splaty) * 100
                    }%)`
                  }}>
                  <li className="nazwa_dluznika">{debt.nazwa_dluznika}</li>
                  <li className="cel">{debt.cel}</li>
                  <li className="kwota_do_splaty">
                    {debt.splacony ? debt.kwota_do_splaty : getTotalPayments(debt)}
                    &nbsp;/&nbsp;{debt.kwota_do_splaty}
                  </li>
                  {getTotalPayments(debt) < debt.kwota_do_splaty && (
                    <Button
                      variant="contained"
                      onClick={() => {
                        openModalAddPayment(debt.id);
                      }}>
                      Dodaj wpłatę
                    </Button>
                  )}
                  <Menu3Dots />
                </List>
                <div className="splaty">
                  {payments
                    .filter((payment) => payment.dlug === debt.id)
                    .map((payment) => (
                      <ul className="splata" key={payment.id}>
                        <li className="kwota">{payment.kwota}</li>
                        <li className="data_splaty">{payment.data_splaty}</li>
                      </ul>
                    ))}
                </div>
              </div>
            ))}
        </Box>
      </Container>
    </>
  );
}

export default debts;
