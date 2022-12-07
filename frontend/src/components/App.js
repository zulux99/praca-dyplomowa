import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import "../css/Main.css";
import OfflinePage from "./OfflinePage";
import AppForUser from "./apps/AppForUser";

function App() {
  if (navigator.onLine) {
  } else {
    return <OfflinePage />;
  }
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <AppForUser />
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}
export default App;
