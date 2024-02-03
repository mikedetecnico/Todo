import { BsPlus } from "react-icons/bs";

interface AddButtonProps {
    buttonText: string;
    onClickCallback: () => void;
}

const AddButton = ({buttonText, onClickCallback}: AddButtonProps) => {
    return (
        <button className='text-primaryblue hover:bg-hovergray flex flex-row w-full m-2 p-2 items-center' onClick={onClickCallback}>
            <BsPlus className='text-2xl'/>
            {buttonText}
        </button>
    )
}

export default AddButton;