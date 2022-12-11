import { Route, Routes } from "react-router-dom";
import Bills from "./bills/Bills";
import DashBoard from "./DashBoard";
import Register from "./Register";
import Login from "./Login";
import Debtors from "./debtors/Debtors";
import PrivateRoute from "./PrivateRoute";
import Incomes from "./incomes/Incomes";
import Categories from "./categories/Categories";
import ProfilePage from "./profile/ProfilePage";

function MyRoutes() {
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
        path="categories"
        element={
          <PrivateRoute>
            <Categories />
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
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
    </Routes>
  );
}

export default MyRoutes;
