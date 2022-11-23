import { useContext, useState, useEffect } from 'react';
import AuthContext from '../../context/AuthContext';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { ToastContainer, toast } from 'react-toastify';
import AddDebt from './AddDebt';

function debts() {
  const user = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [debts, setDebts] = useState([]);
  const [paymentValue, setPaymentValue] = useState('');
  const [paymentValueValid, setPaymentValueValid] = useState(true);
  const validAmount = new RegExp('^\\$?(([1-9](\\d*|\\d{0,2}(,\\d{3})*))|0)(\\.\\d{1,2})?$');
  const user_id = user.user.user_id;

  useEffect(() => {
    getDebts();
    return () => {
      setDebts([]);
    };
  }, []);

  useEffect(() => {
    validAmount.test(paymentValue) ? setPaymentValueValid(true) : setPaymentValueValid(false);
  }, [paymentValue]);

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

  const addPayment = async (e) => {
    e.preventDefault();
    console.log(paymentValue);
    try {
      const response = await axios.post(
        '/api/debts/payments',
        JSON.stringify({ user: user_id, dlug: 1, kwota_splaty: paymentValue }),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.authTokens.access}`
          }
        }
      );
      console.log(response.data);
      e.target.reset();
      setPaymentValue('');
      toast.success('Dodano wpłatę');
    } catch (err) {
      console.log(err.response.data);
      alert('Nie udało się dodać wpłaty');
    }
  };

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (
    <>
      <ToastContainer position="bottom-center" autoClose={2000} />
      <Button variant="contained" onClick={openModal}>
        Dodaj dłużnika
      </Button>
      <AddDebt open={open} closeModal={closeModal} getDebts={getDebts} />
      <Container>
        <h1>Lista długów</h1>
        {debts.map((debt) => (
          <ul className="dlugi" key={debt.id}>
            <li>
              <div className="nazwa_dluznika">{debt.nazwa_dluznika}</div>
              <div className="cel">{debt.cel}</div>
              <div className="kwota_do_splaty">{debt.kwota_do_splaty}</div>
              <form onSubmit={addPayment}>
                <TextField
                  id="standard-basic"
                  label="Kwota wpłaty"
                  error={!paymentValueValid}
                  onChange={(e) => setPaymentValue(e.target.value)}
                />
                <Button variant="contained" type="submit">
                  Dodaj wpłatę
                </Button>
              </form>
            </li>
          </ul>
        ))}
      </Container>
    </>
  );
}

export default debts;
