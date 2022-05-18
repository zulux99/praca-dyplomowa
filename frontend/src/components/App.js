import { createRoot } from 'react-dom/client';
import Navbar from './Navbar';

function App() {
  return (
    <div>
      <Navbar/>
      {/* Hello world! */}
    </div> 
  )
}

export default App;

const container = document.getElementById("index");
const root = createRoot(container);
root.render(<App />);
