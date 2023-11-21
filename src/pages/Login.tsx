import IAuth from "../auth/IAuth";
import LoginForm from "../components/LoginForm";

interface LoginProps {
  auth: IAuth;
}

const Login = ({auth}: LoginProps) => {
    return (
      <LoginForm buttonText='Login' authorization={auth}/>
    )
}

export default Login;