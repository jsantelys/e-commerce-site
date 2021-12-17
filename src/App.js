import NavBar from './components/NavBar'
import SignUp from './components/SignUp';
import Profile from '././components/Profile'
import LogIn from './components/LogIn';
import Dashboard from './components/Dashboard';
import AddProduct from './components/AddProduct';
import Cart from './components/Cart'
import { Container } from 'react-bootstrap';
import { AuthProvider } from './contexts/AuthContext'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import ForgotPassword from './components/ForgotPassword';
import UpdateProfile from './components/UpdateProfile';
import './App.css'

function App() {

  return (
    <>
      <Router>
        <AuthProvider>
          <NavBar />
          <Container className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "80vh" }
            } >
            <Routes>
              <Route path='login' element={<LogIn />} />
              <Route path='signup' element={<SignUp />} />
              <Route path='Profile' element={<PrivateRoute component={Profile} />} />
              <Route path='/' element={<PrivateRoute component={Dashboard} />} />
              <Route path='add-product' element={<AddProduct />} />
              <Route path='forgot-password' element={<ForgotPassword />} />
              <Route path='/update-profile' element={<PrivateRoute component={UpdateProfile} />} />
              <Route path='/cart' element={<PrivateRoute component={Cart} />} />
            </Routes>
          </Container >
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
