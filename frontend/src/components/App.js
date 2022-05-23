import { createRoot } from "react-dom/client";
import { Link, Outlet } from "react-router-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Bills from "./Bills";
import HomePage from "./HomePage";
import Navbar from "./Navbar";

function App() {
  return (
    <>
      <BrowserRouter>
        <div>
          <Navbar />
          <Link to="/">HomePage</Link>
          <br />
          <Link to="bills">Bils</Link>
        </div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="bills" element={<Bills />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;

const container = document.getElementById("index");
const root = createRoot(container);
root.render(<App />);
