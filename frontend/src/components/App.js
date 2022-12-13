import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import "../css/Main.css";
import OfflinePage from "./OfflinePage";
import AppForUser from "./apps/AppForUser";
import Scrollbars from "react-custom-scrollbars-2";

function App() {
  if (navigator.onLine) {
  } else {
    return <OfflinePage />;
  }
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          {/* <Scrollbars
            className="scroll-bar"
            autoHide
            style={{
              height: "100vh",
            }}> */}
          <AppForUser />
          {/* </Scrollbars> */}
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}
export default App;
