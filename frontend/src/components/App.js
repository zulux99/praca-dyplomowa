import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import "../css/Main.css";
import OfflinePage from "./OfflinePage";
import AppForUser from "./apps/AppForUser";
import { ConfirmProvider } from "material-ui-confirm";
import "dayjs/locale/pl";
import { ToastContainer } from "react-toastify";

function App() {
  if (navigator.onLine) {
  } else {
    return <OfflinePage />;
  }
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <ConfirmProvider
            dialogProps={{
              maxWidth: "xs",
              fullWidth: true,
              disableBackdropClick: true,
              disableEscapeKeyDown: true,
            }}>
            <AppForUser />
            <ToastContainer position="bottom-center" autoClose={2000} />
          </ConfirmProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}
export default App;
