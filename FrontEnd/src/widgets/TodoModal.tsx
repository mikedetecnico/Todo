import { useEffect, useState } from "react";
import CustomButton from "./CustomButton";
import DatePicker from "./DatePicker";
import { Todo } from "../services/apiTodos";
import { useUser } from "../features/auth/useUser";
import IAuth from "../features/auth/IAuth";
import TextInput from "./TextInput";

interface TodoModalProps {
    auth: IAuth;
    showModal: boolean;
    onClose: () => void;
    todo?: Todo;
    submitTodo: (todo: Todo) => void;
    isPending: boolean;
    okayButtonText: string;
}

const TodoModal = ({auth, showModal, onClose, todo, submitTodo, isPending, okayButtonText}: TodoModalProps) => {
    const { user } = useUser(auth);
    const [show, setShow] = useState<boolean>(false);
    const [task, setTask] = useState<string>(todo ? todo.task : '');
    const [showDatePopup, setShowDatePopup] = useState<boolean>(false);
    const [scheduledDate, setScheduledDate] = useState<Date>(new Date(todo ? todo.scheduledDate : new Date()));

    useEffect(() => {
        setShow(showModal);
    }, [showModal])

    const handleClose = () => {
        setShow(!show);
        onClose();
    }

    const handleDateChange = (date: Date | undefined) => {
        if (!date) {
            return;
        }

        setScheduledDate(date);
        setShowDatePopup(!showDatePopup);
    }

    const onSubmit = () => {
        
        if (todo) {
            todo.task = task;
            todo.scheduledDate = scheduledDate.toDateString();
        } else {
            todo = {
                id: '',
                task: task,
                scheduledDate: scheduledDate ? scheduledDate.toDateString() : '',
                completed: false,
                userId: user?.uid
            }
        }

        submitTodo(todo);

        setShow(!show);
    }
    
    return (
        <>
            {show &&
                <div className='bg-primarygray shadow-md rounded px-8 pt-6 pb-8 mb-4 w-3/4'>
                    <div className='mb-4'>
                        <TextInput 
                            id='taskDescription'
                            placeholder='task description'
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTask(e.target.value)}
                            value={task}
                        />
                    </div>
                    <DatePicker scheduledDate={scheduledDate} showDatePopup={showDatePopup} setShowDatePopup={setShowDatePopup} handleDateChange={handleDateChange}/>
                    <div className='md:flex md:items-center'>
                        <div className='md:w-2/3 flex flex-row items-start justify-between'>
                            <CustomButton disabled={isPending} onClickCallback={handleClose} buttonText='Cancel' styling='shadow bg-primaryblue hover:bg-hoverblue focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'/>
                            <CustomButton disabled={isPending} buttonText={okayButtonText} styling='shadow bg-primaryblue hover:bg-hoverblue focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded' onClickCallback={onSubmit}/>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default TodoModal;