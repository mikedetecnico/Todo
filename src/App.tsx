import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navigationbar from './components/NavigationBar';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <div className="App">
        <Router>
            <Navigationbar />
            <div className="auth-wrapper">
              <div className="auth-inner">
                <Routes>
                  <Route path='/' element={<Login /> }/>
                  <Route path='/login' element={<Login /> }/>
                  <Route path='/signup' element={<Signup />}/>
                </Routes>
              </div>
            </div>
        </Router>
    </div>
  );
}

export default App;
/*
import {NavLink, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';
import Login from './pages/Login';
import Signup from './pages/Signup';


function App() {
  return (
    <Router>
      <div className='App'>
        <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
              <Navbar.Toggle aria-controls="navbarScroll" data-bs-toggle="collapse" data-bs-target="#navbarScroll" />
              <Navbar.Collapse id="navbarScroll">
                  <Nav>
                      <NavLink to="/">Home</NavLink>
                      <NavLink to="/login">Login</NavLink>
                      <NavLink to="/signup">Sign Up</NavLink>
                  </Nav>
              </Navbar.Collapse>     
          </Navbar>
        {
        <section className='auth-section'>
          <div className='auth-wrapper'>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </div>
        </section>
        }
      </div>
    </Router>
  )
}

export default App
*/
