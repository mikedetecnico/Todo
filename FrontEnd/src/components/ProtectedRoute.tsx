import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "../auth/useUser";
import IAuth from "../auth/IAuth";

interface ProtectedRouteProps {
    auth: IAuth;
    children?: React.ReactNode;
}

const ProtectedRoute = ({ auth, children }: ProtectedRouteProps) => {
  const navigate = useNavigate();

  // 1. Load the authenticated user
  const { isLoading, isAuthenticated } = useUser(auth);

  // 2. If there is NO authenticated user, redirect to the /login
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isAuthenticated, isLoading, navigate]
  );

  // 4. If there IS a user, render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;