import { useContext, useState, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';

function Debtors() {
  const user = useContext(AuthContext);
  const [debtors, setDebtors] = useState([]);
  const [debtorName, setDebtorName] = useState('');
  const [debtorValue, setDebtorValue] = useState('');

  useEffect(() => {
    getDebtors();
    console.log(debtors);
    return () => {
      setDebtors([]);
    };
  }, []);

  const getDebtors = async () => {
    try {
      const response = await axios.get(`/api/debtors`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.authTokens.access}`
        }
      });
      setDebtors(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addDebtor = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        '/api/debtors',
        JSON.stringify({ nazwa: debtorName, kwota_do_splaty: debtorValue }),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.authTokens.access}`
          }
        }
      );
      console.log(response.data);
      e.target.reset();
      setDebtorName('');
      getDebtors();
    } catch (err) {
      console.log(err.response.data);
      alert('Nie udało się dodać dłużnika');
    }
  };

  const notify = () => {
    toast('Wow so easy !');
  };

  return (
    <>
      <h1>Dłużnicy</h1>
      <button onClick={notify}>Notify !</button>
      <ToastContainer position="bottom-center" autoClose={2000} />
      <form onSubmit={addDebtor}>
        <TextField
          id="outlined-basic"
          label="Nazwa dłużnika"
          variant="outlined"
          value={debtorName}
          onChange={(e) => setDebtorName(e.target.value)}
        />
        <Button variant="contained" type="submit">
          Dodaj
        </Button>
      </form>
    </>
  );
}

export default Debtors;
