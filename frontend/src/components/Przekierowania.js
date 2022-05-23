import { BrowserRouter, Route, Routes } from "react-router-dom";
import Bills from "./Bills";
import Income from "./Income";

function Przekierowania() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="home" component={HomePage} /> */}
        <Route path="bills" element={<Bills />} />
        <Route path="income" element={<Income />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Przekierowania;
