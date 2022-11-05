import axios from 'axios';
import { useContext, useState, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function Categories() {
  const user = useContext(AuthContext);
  const user_id = user.user.user_id;
  const [categoryName, setCategoryName] = useState('');
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const response = await axios.get('/api/categories', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.authTokens.access}`
        }
      });
      console.log(response.data);
      setCategoryList(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        '/api/categories',
        JSON.stringify({ user: user_id, nazwa: categoryName }),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.authTokens.access}`
          }
        }
      );
      console.log(response.data);
      e.target.reset();
      setCategoryName('');
    } catch (err) {
      console.log(err.response.data);
      alert('Nie udało się dodać kategorii');
    }
  };

  return (
    <Box>
      <h1>Lista kategorii</h1>
      <Box className="kategorie_lista">
        {categoryList.map((category) => (
          <Box key={category.id} className="kategorie_lista_element">
            {category.nazwa}
          </Box>
        ))}
      </Box>
      <form onSubmit={addCategory}>
        <TextField
          type="text"
          label="Nazwa kategorii"
          onChange={(e) => setCategoryName(e.target.value)}></TextField>
        <Button type="submit" variant="contained">
          Dodaj
        </Button>
      </form>
    </Box>
  );
}

export default Categories;
