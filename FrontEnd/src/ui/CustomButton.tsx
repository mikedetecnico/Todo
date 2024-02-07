interface CustomButtonProps {
    buttonText: string;
    onClickCallback: () => void;
    Icon?: React.ElementType;
    styling?: string;
    disabled?: boolean;
}

const CustomButton = ({buttonText, onClickCallback, Icon, styling, disabled}: CustomButtonProps) => {
    return (
        <button className={styling ?? 'text-primaryblue hover:bg-hovergray flex flex-row w-full m-2 p-2 items-center'} onClick={onClickCallback} disabled={disabled ?? false}>
            {Icon && <Icon className='text-2xl'/>}
            {buttonText}
        </button>
    )
}

export default CustomButton;