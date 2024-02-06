interface CustomButtonProps {
    buttonText: string;
    onClickCallback: () => void;
    Icon?: React.ElementType;
}

const CustomButton = ({buttonText, onClickCallback, Icon}: CustomButtonProps) => {
    return (
        <button className='text-primaryblue hover:bg-hovergray flex flex-row w-full m-2 p-2 items-center' onClick={onClickCallback}>
            {Icon && <Icon className='text-2xl'/>}
            {buttonText}
        </button>
    )
}

export default CustomButton;