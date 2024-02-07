interface CustomLabelProps {
    text: string;
}

const CustomLabel = ({text}: CustomLabelProps) => {
    return (
        <label className='block text-white text-sm font-bold mb-2'>
        {text}
        </label>
    );
}

export default CustomLabel;