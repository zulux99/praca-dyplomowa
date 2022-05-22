import { BrowserRouter, Route, Routes } from "react-router-dom";
import Bills from "./Bills";

function Przekierowania() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/home" component={HomePage} /> */}
        <Route path="bills" element={<Bills />} />
        {/* <Route exact path="/income" component={Income} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default Przekierowania;
