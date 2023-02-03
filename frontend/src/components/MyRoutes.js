import { Route, Routes } from "react-router-dom";
import Bills from "./bills/Bills";
import DashBoard from "./dashboard/DashBoard";
import Register from "./Register";
import Login from "./Login";
import Debtors from "./debtors/Debtors";
import PrivateRoute from "./PrivateRoute";
import Transactions from "./transactions/Transactions";
import ProfilePage from "./profile/ProfilePage";
import Charts from "./charts/Charts";
import Categories from "./categories/Categories";
import Incomes from "./incomes/Incomes";
import Expenses from "./expenses/Expenses";

function MyRoutes(props) {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <DashBoard />
          </PrivateRoute>
        }
      />
      <Route
        path="accounts"
        element={
          <PrivateRoute>
            <Bills />
          </PrivateRoute>
        }
      />
      <Route
        path="incomes"
        element={
          <PrivateRoute>
            <Incomes />
          </PrivateRoute>
        }
      />
      <Route
        path="expenses"
        element={
          <PrivateRoute>
            <Expenses />
          </PrivateRoute>
        }
      />
      <Route
        path="transactions"
        element={
          <PrivateRoute>
            <Transactions />
          </PrivateRoute>
        }
      />
      <Route
        path="charts"
        element={
          <PrivateRoute>
            <Charts />
          </PrivateRoute>
        }
      />
      <Route
        path="debtors"
        element={
          <PrivateRoute>
            <Debtors />
          </PrivateRoute>
        }
      />
      <Route
        path="profile"
        element={
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        }
      />
      <Route
        path="categories"
        element={
          <PrivateRoute>
            <Categories />
          </PrivateRoute>
        }
      />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
    </Routes>
  );
}

export default MyRoutes;
