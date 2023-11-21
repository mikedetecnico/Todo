import IAuth from "../auth/IAuth";
import LoginForm from "../components/LoginForm";

interface LoginProps {
  auth: IAuth;
}

const Login = ({auth}: LoginProps) => {
    return (
      <LoginForm buttonText='Login' onSubmitCallback={auth.signIn} route='/signup' routeText="Don't have an account? Sign up" />
    )
}

export default Login;