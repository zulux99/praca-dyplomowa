import AuthContext from '../../context/AuthContext';
import axios from 'axios';
import { useContext } from 'react';
import { useState } from 'react';

function GetBills() {
  const user = useContext(AuthContext);
  const [bills, setBills] = useState([]);
  const user_id = user.user.user_id;

  const billsArray = async () => {
    try {
      const response = await axios.get(`/api/bills`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.authTokens.access}`,
          id: user_id
        }
      });
      setBills(response.data);
      console.log(bills);
    } catch (err) {
      console.log(err);
    }
  };
  return billsArray;
}

export default GetBills;
