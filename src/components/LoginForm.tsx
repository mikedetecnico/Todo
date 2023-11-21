interface LoginFormProps {
    buttonText: string;
}

const LoginForm = ({buttonText}: LoginFormProps) => {
    return (
        <div className='h-screen flex items-center justify-center bg-primary'>
            <form className='bg-primarygray shadow-md rounded px-8 pt-6 pb-8 mb-4 w-3/4'>
                <div className='mb-4'>
                    <label className='block text-white text-sm font-bold mb-2'>
                    Email
                    </label>
                    <input className='shadow appearance-none border rounded w-full py-2 px-3 text-primarygray leading-tight focus:outline-none focus:shadow-outline' id='email' type='text' placeholder='Email' />
                </div>
                <div className='mb-4'>
                    <label className='block text-white text-sm font-bold mb-2'>
                    Password
                    </label>
                    <input className='shadow appearance-none border rounded w-full py-2 px-3 text-primarygray mb-3 leading-tight focus:outline-none focus:shadow-outline' id='password' type='password' placeholder='password' />
                </div>
                <div className='md:flex md:items-center'>
                    <div className='md:w-2/3'>
                    <button className='shadow bg-primaryblue hover:bg-hoverblue focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded' type='submit'>
                        {buttonText}
                    </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default LoginForm;