import IAuth from "../auth/IAuth";
import LoginForm from "../components/LoginForm";

interface SignupProps {
  auth: IAuth;
}

const Signup = ({auth}: SignupProps) => {
    return (
      <LoginForm buttonText='Sign up with Email' onSubmitCallback={auth.signUp} route='/login' routeText='Already have an account? Login' />
    )
}

export default Signup;