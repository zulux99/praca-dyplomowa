import AuthContext from '../context/AuthContext';
import { useContext } from 'react';
import Typography from '@mui/material/Typography';

function Income() {
  const user = useContext(AuthContext);
  return (
    <>
      <div>Tutaj są twoje przychody</div>
      <Typography variant="body1" color="initial"></Typography>
    </>
  );
}

export default Income;
