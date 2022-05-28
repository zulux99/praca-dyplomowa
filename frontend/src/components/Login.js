import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  return (
    <>
      <section>
        <p className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
      </section>
    </>
  );
}

export default Login;
