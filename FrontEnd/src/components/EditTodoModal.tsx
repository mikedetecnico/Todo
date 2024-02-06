import { useEffect, useState } from 'react';
import { Todo } from '../api/api';
import toast from 'react-hot-toast';
import { useEditTodos } from '../features/todos/useEditTodo';
import DatePicker from '../widgets/DatePicker';

interface EditTodoModalProps {
    showModal: boolean;
    onClose: () => void;
    todo: Todo;
}

const EditTodoModal = ({showModal, onClose, todo}: EditTodoModalProps) => {   
    const {editTodo, isPending} = useEditTodos();
    const [show, setShow] = useState<boolean>(false);
    const [task, setTask] = useState<string>(todo.task);
    const [showDatePopup, setShowDatePopup] = useState<boolean>(false);
    const [scheduledDate, setScheduledDate] = useState<Date>(new Date());

    useEffect(() => {
        setShow(showModal);
    }, [showModal])

    const handleClose = () => {
        setShow(false);
        onClose();
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (todo) {
            todo.task = task;
            todo.scheduledDate = scheduledDate.toDateString();
            editTodo(todo);
        } else {
            toast.error('Todo is undefined');
        }

        setShow(false);
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
                <div className=''>
                    <form onSubmit={handleSubmit} className='bg-primarygray shadow-md rounded px-8 pt-6 pb-8 mb-4 w-3/4'>
                        <div className='mb-4'>
                            <input className='shadow appearance-none border rounded w-full py-2 px-3 text-primarygray leading-tight focus:outline-none focus:shadow-outline' 
                                id='taskDescription' 
                                type='text' 
                                placeholder={task} 
                                value={task}
                                onChange={(e) => setTask(e.target.value)}
                            />
                        </div>
                        <DatePicker scheduledDate={scheduledDate} showDatePopup={showDatePopup} setShowDatePopup={setShowDatePopup} handleDateChange={handleDateChange}/>
                        <div className='md:flex md:items-center'>
                        <div className='md:w-2/3 flex flex-row items-start'>
                            <button disabled={isPending} className='shadow bg-primaryblue hover:bg-hoverblue focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded' onClick={handleClose}>
                                Cancel
                            </button>
                            <button disabled={isPending} className='shadow bg-primaryblue hover:bg-hoverblue focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 mx-6 rounded' type='submit'>
                                Edit Task
                            </button>
                        </div>
                    </div>
                    </form>
                </div>
            }
        </>
    )
}

export default EditTodoModal;