import { createRoot } from "react-dom/client";
import Navbar from "./Navbar";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { HashRouter } from "react-router-dom";
// import Przekierowania from "./Przekierowania";

function App() {
  return (
    <>
      <div>
        <HashRouter>
          <Routes>
            {/* <Navbar /> */}
            {/* <Przekierowania /> */}
            <Route path="/" element={<Bills />} />
            {/* Hello world! */}
            <Route path="bills" element={<Bills />} />
          </Routes>
        </HashRouter>
      </div>
    </>
  );
}
function Bills() {
  return (
    <>
      <main>
        <h2>Welcome to the bills!</h2>
        <p>You can do this, I believe in you.</p>
      </main>
      <nav>
        <Link to="/bills">About</Link>
      </nav>
    </>
  );
}
export default App;

const container = document.getElementById("index");
const root = createRoot(container);
root.render(<App />);
