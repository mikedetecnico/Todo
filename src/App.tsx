import { Route, Routes } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import FirebaseAuth from './auth/FirebaseAuth';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});

function App() {
  const auth = new FirebaseAuth;
  
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Router>
        <main>
          <Routes>
            <Route element={<ProtectedRoute auth={auth} />}>
              <Route path="/home" element={<Home />} />
            </Route>
            <Route path="/" element={<Login auth={auth}/>} />
            <Route path="/login" element={<Login auth={auth}/>} />
            <Route path="/signup" element={<Signup auth={auth}/>} />
          </Routes>
        </main>
      </Router>

      <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "gray",
              color: "white",
            },
          }}
        />
    </QueryClientProvider>
  );
}

export default App;
