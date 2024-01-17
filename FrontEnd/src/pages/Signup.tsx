import IAuth from "../auth/IAuth";
import { useSignup } from "../auth/useSignup";
import LoginForm from "../components/LoginForm";

interface SignupProps {
  auth: IAuth;
}

const Signup = ({auth}: SignupProps) => {
    const { signup, isPending } = useSignup(auth);

    return (
      <LoginForm buttonText='Sign up with Email' onSubmitCallback={signup} isLoading={isPending} route='/login' routeText='Already have an account? Login' displayName={true}/>
    )
}

export default Signup;