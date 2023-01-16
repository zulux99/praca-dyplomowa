import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import "../css/Main.css";
import OfflinePage from "./OfflinePage";
import AppForUser from "./apps/AppForUser";
import { ConfirmProvider } from "material-ui-confirm";
import "dayjs/locale/pl";

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
          </ConfirmProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}
export default App;
