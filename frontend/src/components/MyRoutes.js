import { Route, Routes } from 'react-router-dom';
import Bills from './bills/Bills';
import HomePage from './HomePage';
import Register from './Register';
import Login from './Login';
import Debtors from './Debtors';
import PrivateRoute from './PrivateRoute';
import Income from './Income';
import Categories from './Categories';

function MyRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="konta"
        element={
          <PrivateRoute>
            <Bills />
          </PrivateRoute>
        }
      />
      <Route
        path="przychody"
        element={
          <PrivateRoute>
            <Income />
          </PrivateRoute>
        }
      />
      <Route
        path="kategorie"
        element={
          <PrivateRoute>
            <Categories />
          </PrivateRoute>
        }
      />
      <Route
        path="dluznicy"
        element={
          <PrivateRoute>
            <Debtors />
          </PrivateRoute>
        }
      />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
    </Routes>
  );
}

export default MyRoutes;
