import { Route, Routes, Redirect } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    !user && navigate("/");
  }, []);
  return user && children;
}

export default PrivateRoute;
