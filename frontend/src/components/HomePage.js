import { useContext } from "react";
import AuthContext from "../context/AuthContext";

function HomePage() {
  const { user } = useContext(AuthContext);
  return (
    <>
      <div>
        Witoj przybyszu na stronie głównej
      </div>
      {user && <p>Hello {user.username}</p>}
    </>
  );
}

export default HomePage;
