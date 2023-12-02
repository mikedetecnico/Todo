import IAuth from "../auth/IAuth";
import { useLogin } from "../auth/useLogin";
import LoginForm from "../components/LoginForm";

interface LoginProps {
  auth: IAuth;
}

const Login = ({auth}: LoginProps) => {
    const { login, isPending } = useLogin(auth);

    return (
      <LoginForm buttonText='Login' isLoading={isPending} onSubmitCallback={login} route='/signup' routeText="Don't have an account? Sign up" />
    )
}

export default Login;