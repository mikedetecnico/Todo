import { useEffect, useState } from 'react';
import { Todo } from '../api/api';
import { useCreateTodos } from '../features/todos/useCreateTodo';
import toast from 'react-hot-toast';
import { useUser } from '../features/auth/useUser';
import IAuth from '../features/auth/IAuth';
import DatePicker from '../widgets/DatePicker';
import CustomButton from '../widgets/CustomButton';

interface CreateTodoModalProps {
    auth: IAuth;
    showModal: boolean;
    onClose: () => void;
}

const CreateTodoModal = ({auth, showModal, onClose}: CreateTodoModalProps) => {
    const { user } = useUser(auth);
    
    const {createTodo, isPending} = useCreateTodos();
    const [show, setShow] = useState<boolean>(false);
    const [task, setTask] = useState<string>('Task');
    const [showDatePopup, setShowDatePopup] = useState<boolean>(false);
    const [scheduledDate, setScheduledDate] = useState<Date>(new Date());

    useEffect(() => {
        setShow(showModal);
    }, [showModal])

    const handleClose = () => {
        setShow(!show);
        onClose();
    }

    const handleSubmit = () => {
        const todo: Todo = {
            id: '',
            task: task,
            scheduledDate: scheduledDate ? scheduledDate.toDateString() : '',
            completed: false,
            userId: user?.uid
        }

        if (todo) {
            createTodo(todo);
        } else {
            toast.error('Todo is undefined');
        }

        setShow(!show);
    }

    const handleDateChange = (date: Date | undefined) => {
        if (!date) {
            return;
        }

        setScheduledDate(date);
        setShowDatePopup(!showDatePopup);
    }
    
    return (
        <>
            {show &&
                <div className='bg-primarygray shadow-md rounded px-8 pt-6 pb-8 mb-4 w-3/4'>
                    <div className='mb-4'>
                        <input className='shadow appearance-none border rounded w-full py-2 px-3 text-primarygray leading-tight focus:outline-none focus:shadow-outline' 
                            id='taskDescription' 
                            type='text' 
                            placeholder={task} 
                            onChange={(e) => setTask(e.target.value)}
                        />
                    </div>
                    <DatePicker scheduledDate={scheduledDate} showDatePopup={showDatePopup} setShowDatePopup={setShowDatePopup} handleDateChange={handleDateChange}/>
                    <div className='md:flex md:items-center'>
                        <div className='md:w-2/3 flex flex-row items-start justify-between'>
                            <CustomButton disabled={isPending} onClickCallback={handleClose} buttonText='Cancel' styling='shadow bg-primaryblue hover:bg-hoverblue focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'/>
                            <CustomButton disabled={isPending} buttonText='Add Task' styling='shadow bg-primaryblue hover:bg-hoverblue focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded' onClickCallback={handleSubmit}/>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default CreateTodoModal;