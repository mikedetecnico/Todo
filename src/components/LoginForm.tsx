import { useState } from "react";
import MainTopHeader from "./MainTopHeader";

interface LoginFormProps {
    buttonText: string;
    onSubmitCallback: (userName: string, password: string) => void;
    route: string;
    routeText: string;
}

const LoginForm = ({buttonText, onSubmitCallback, route, routeText}: LoginFormProps) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmitCallback(email, password);
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
                        <input className='shadow appearance-none border rounded w-full py-2 px-3 text-primarygray leading-tight focus:outline-none focus:shadow-outline' 
                            id='email' 
                            type='text' 
                            placeholder='Email' 
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-white text-sm font-bold mb-2'>
                        Password
                        </label>
                        <input className='shadow appearance-none border rounded w-full py-2 px-3 text-primarygray mb-3 leading-tight focus:outline-none focus:shadow-outline' 
                            id='password' 
                            type='password' 
                            placeholder='password' 
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className='md:flex md:items-center'>
                        <div className='md:w-2/3'>
                            <button className='shadow bg-primaryblue hover:bg-hoverblue focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded' type='submit'>
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