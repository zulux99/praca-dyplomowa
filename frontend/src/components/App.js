import { createRoot } from 'react-dom/client';

function App() {
  return (
    <div>
      Hello world!
    </div> 
  )
}

export default App;

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);
