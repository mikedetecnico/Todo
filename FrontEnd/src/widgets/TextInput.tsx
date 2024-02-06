
interface TextInputProps {
    id: string;
    isPassword?: boolean;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
}

const TextInput = ({id, isPassword, placeholder, onChange, value}: TextInputProps) => {
    return (
        <input className='shadow appearance-none border rounded w-full py-2 px-3 text-primarygray leading-tight focus:outline-none focus:shadow-outline' 
            id={id} 
            type={isPassword ? 'password' : 'text'} 
            placeholder={placeholder} 
            onChange={onChange}
            value={value}
        />
    );
}

export default TextInput;