import { createRoot } from "react-dom/client";
import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import axios from "axios";
import Bills from "./Bills";
import HomePage from "./HomePage";
import Navbar from "./Navbar";
import Register from "./Register";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import { CssBaseline } from "@mui/material";

function App() {
  const [user, setUser] = useState([]);
  useEffect(() => {
    const getUser = () => {
      axios
        .get("/api/user")
        .then((res) => {
          console.log(res.data);
          setUser(res.data);
        })
        .catch((err) => {
          alert(err);
        });
    };
    getUser();
  }, []);
  let userData = user.map((val) => {
    return (
      <>
        <p>{val.username}</p>
        <p>{val.id}</p>
      </>
    );
  });
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <div>
            <CssBaseline />
            <Navbar />
          </div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="rachunki"
              element={
                <PrivateRoute>
                  <Bills />
                </PrivateRoute>
              }
            />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}
export default App;
const container = document.getElementById("index");
const root = createRoot(container);
root.render(<App />);
