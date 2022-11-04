import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import Bills from './bills/Bills';
import HomePage from './HomePage';
import Navbar from './Navbar';
import Register from './Register';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import { CssBaseline } from '@mui/material';
import Income from './Income';
import Kategorie from './Kategorie';

function App() {
  // const [user, setUser] = useState([]);
  // useEffect(() => {
  //   const getUser = () => {
  //     axios
  //       .get('/api/user')
  //       .then((res) => {
  //         console.log(res.data);
  //         setUser(res.data);
  //       })
  //       .catch((err) => {
  //         alert(err);
  //       });
  //   };
  //   getUser();
  // }, []);
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <div>
            <CssBaseline />
            <Navbar />
          </div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="rachunki"
              element={
                <PrivateRoute>
                  <Bills />
                </PrivateRoute>
              }
            />
            <Route
              path="przychody"
              element={
                <PrivateRoute>
                  <Income />
                </PrivateRoute>
              }
            />
            <Route
              path="kategorie"
              element={
                <PrivateRoute>
                  <Kategorie />
                </PrivateRoute>
              }
            />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}
export default App;
const container = document.getElementById('index');
const root = createRoot(container);
root.render(<App />);
