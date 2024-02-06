import IAuth from "../features/auth/IAuth";
import { useSignup } from "../features/auth/useSignup";
import LoginForm from "../components/LoginForm";

interface SignupProps {
  auth: IAuth;
}

const Signup = ({auth}: SignupProps) => {
    const { signup, isPending } = useSignup(auth);

    const onValidate = (email: string, password: string) : string | null => {
      if (!email) {
        return "Email is required";
      }

      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
        return "Invalid email address";
      }
      
      if (!password) {
        return "Password is required";
      }

      if (password.length < 8) {
        return "Password must be at least 8 characters";
      }

      return null;
    }

    return (
      <LoginForm buttonText='Sign up with Email' onValidate={onValidate} onSubmitCallback={signup} isLoading={isPending} route='/login' routeText='Already have an account? Login' displayName={true}/>
    )
}

export default Signup;