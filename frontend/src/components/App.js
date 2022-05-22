import { createRoot } from "react-dom/client";
import Navbar from "./Navbar";
import Przekierowania from "./Przekierowania";

function App() {
  return (
    <>
      <div>
        {/* <Navbar /> */}
        <Przekierowania />
        {/* Hello world! */}
      </div>
    </>
  );
}

export default App;

const container = document.getElementById("index");
const root = createRoot(container);
root.render(<App />);
