import { Route, Routes } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import FirebaseAuth from './auth/FirebaseAuth';

function App() {
  const auth = new FirebaseAuth;
  
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<Login auth={auth}/>} />
          <Route path="/login" element={<Login auth={auth}/>} />
          <Route path="/signup" element={<Signup auth={auth}/>} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
