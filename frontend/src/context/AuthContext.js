import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem("authTokens")) : null
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens") ? jwt_decode(localStorage.getItem("authTokens")) : null
  );
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const loginUser = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post(
        "/api/token/",
        JSON.stringify({ username: e.target.username.value, password: e.target.password.value }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setAuthTokens(response.data);
      setUser(jwt_decode(response.data.access));
      localStorage.setItem("authTokens", JSON.stringify(response.data));
      navigate("/");
    } catch (err) {
      console.log(err.response);
      if (err.response.status !== 200) {
        alert("Coś poszło nie tak");
      }
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/");
  };

  const updateToken = async () => {
    try {
      let response = await axios.post("/api/token/refresh/", JSON.stringify({ refresh: authTokens.refresh }), {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setAuthTokens(response.data);
      setUser(jwt_decode(response.data.access));
      localStorage.setItem("authTokens", JSON.stringify(response.data));
    } catch (err) {
      setAuthTokens(null);
      setUser(null);
      localStorage.removeItem("authTokens");
    }
    if (loading) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) {
      updateToken();
    }
    const fourMinutes = 1000 * 60 * 4;
    const interval = setInterval(() => {
      if (authTokens) {
        updateToken();
      }
    }, fourMinutes);
    return () => {
      clearInterval(interval);
    };
  }, [authTokens, loading]);

  const contextData = {
    user: user,
    authTokens: authTokens,
    loginUser: loginUser,
    logoutUser: logoutUser,
  };
  return <AuthContext.Provider value={contextData}>{loading ? null : children}</AuthContext.Provider>;
};