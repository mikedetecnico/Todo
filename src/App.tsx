import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css'
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <Router>
      <section className='navbar-section'>
        <nav className='main-navbar'>
          <div className='container'>
            <ul className='navbar-nav'>
              <li className='nav-item'>
                <Link className='navlink' to={'/login'}>Login</Link>
              </li>
              <li className='nav-item'>
                <Link className='navlink' to={'/signup'}>Signup</Link>
              </li>
            </ul>
          </div>
        </nav>
      </section>
      <section className='auth-section'>
        <div className='auth-wrapper'>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </section>
    </Router>
  )
}

export default App
