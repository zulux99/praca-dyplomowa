import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import Container from '@mui/material/Container';
import Bills from './bills/Bills';
import HomePage from './HomePage';
import Navbar from './Navbar';
import Register from './Register';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import CssBaseline from '@mui/material/CssBaseline';
import Income from './Income';
import Categories from './Categories';
import BottomMenu from './BottomMenu';
import { MobileView, isMobile } from 'react-device-detect';

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <div>
            <CssBaseline />
            <Navbar />
          </div>
          <Container
            className="main"
            sx={{
              padding: '16px',
              marginBottom: isMobile ? '56px' : '0'
            }}>
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
                    <Categories />
                  </PrivateRoute>
                }
              />
              <Route path="register" element={<Register />} />
              <Route path="login" element={<Login />} />
            </Routes>
            <footer>
              <MobileView>
                <BottomMenu />
              </MobileView>
            </footer>
          </Container>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}
export default App;
const container = document.getElementById('index');
const root = createRoot(container);
root.render(<App />);
