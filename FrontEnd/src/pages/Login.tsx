import IAuth from "../features/auth/IAuth";
import { useLogin } from "../features/auth/useLogin";
import LoginForm from "../components/LoginForm";

interface LoginProps {
  auth: IAuth;
}

const Login = ({auth}: LoginProps) => {
    const { login, isPending } = useLogin(auth);

    return (
      <LoginForm buttonText='Login' isLoading={isPending} onSubmitCallback={login} route='/signup' routeText="Don't have an account? Sign up" displayName={false}/>
    )
}

export default Login;