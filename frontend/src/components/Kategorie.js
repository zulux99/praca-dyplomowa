import axios from 'axios';
import { useContext } from 'react';
import { useState } from 'react';
import AuthContext from '../context/AuthContext';
import { Box } from '@mui/system';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function Kategorie() {
  const user = useContext(AuthContext);
  const user_id = user.user.user_id;
  const [categoryName, setCategoryName] = useState('');

  const addCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        '/api/categories',
        JSON.stringify({ user: user_id, nazwa: categoryName }),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.authTokens.access}`,
            id: user_id
          }
        }
      );
      console.log(response.data);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <Box>
      <h1>Kategorie</h1>
      <form onSubmit={addCategory}>
        <TextField onChange={(e) => setCategoryName(e.target.value)}></TextField>
        <Button type="submit" variant="contained">
          Dodaj
        </Button>
      </form>
    </Box>
  );
}

export default Kategorie;
