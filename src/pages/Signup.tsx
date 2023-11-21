import IAuth from "../auth/IAuth";
import LoginForm from "../components/LoginForm";
interface SignupProps {
  auth: IAuth;
}

const Signup = ({auth}: SignupProps) => {
    return (
      <LoginForm buttonText='Sign up with Email' authorization={auth}/>
    )
}

export default Signup;