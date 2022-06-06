import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import LoginOptions from './pages/LoginOptions';
import MFA from './pages/MFA';
import { Container } from 'react-bootstrap';
import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import { FaRegSadCry } from 'react-icons/fa'

function App() {
  return (
    <Container className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<LoginOptions />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='/mfa' element={<MFA />} />
          <Route exact path='/dashboard' element={<Dashboard />} />
          {/* Display page not found upon requesting unknown routes */}
          <Route path='*' element={<><h1>Page not found <FaRegSadCry /></h1></>} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
