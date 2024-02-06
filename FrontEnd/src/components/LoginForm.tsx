import { useState } from "react";
import MainTopHeader from "./MainTopHeader";
import { UseMutateFunction } from "@tanstack/react-query";
import { IAuthParams } from "../features/auth/useSignup";
import TextInput from "../widgets/TextInput";
import { toast } from "react-hot-toast";

interface LoginFormProps {
    buttonText: string;
    onSubmitCallback: UseMutateFunction<void, Error, IAuthParams, unknown>;
    route: string;
    routeText: string;
    isLoading: boolean;
    displayName: boolean;
    onValidate?: (email: string, password: string) => string | null ;
}

const LoginForm = ({buttonText, onSubmitCallback, route, routeText, isLoading, displayName, onValidate}: LoginFormProps) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (onValidate) {
            const error = onValidate(email, password);

            if (error) {
                toast.error(error);
                return;
            }
        }

        onSubmitCallback({email, password, firstName, lastName});
    }

    return (
        <>
            <MainTopHeader />
            <div className='h-screen flex items-center justify-center bg-primary'>
                <form onSubmit={handleSubmit} className='bg-primarygray shadow-md rounded px-8 pt-6 pb-8 mb-4 w-3/4'>
                    <div className='mb-4'>
                        <label className='block text-white text-sm font-bold mb-2'>
                        Email
                        </label>
                        <TextInput 
                            id='email'
                            placeholder='Email'
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            value={email}
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-white text-sm font-bold mb-2'>
                        Password
                        </label>
                        <TextInput 
                            id='password'
                            isPassword={true}
                            placeholder='Password'
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                            value={password}
                        />
                    </div>
                    {displayName && (
                        <>
                            <div className='mb-4'>
                                <label className='block text-white text-sm font-bold mb-2'>
                                First Name
                                </label>
                                <TextInput 
                                    id='firstName'
                                    placeholder='First Name'
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
                                    value={firstName}
                                />
                            </div>
                            <div className='mb-4'>
                                <label className='block text-white text-sm font-bold mb-2'>
                                Last Name
                                </label>
                                <TextInput 
                                    id='lastName'
                                    placeholder='Last Name'
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
                                    value={lastName}
                                />
                            </div>
                        </>
                    )
                    }
                    <div className='md:flex md:items-center'>
                        <div className='md:w-2/3'>
                            <button disabled={isLoading} className='shadow bg-primaryblue hover:bg-hoverblue focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded' type='submit'>
                                {buttonText}
                            </button>
                            <a className='inline-block align-baseline font-bold text-sm text-primaryblue hover:text-hoverblue px-4' href={route}>
                                {routeText}
                            </a>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default LoginForm;