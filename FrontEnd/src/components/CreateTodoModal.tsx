import { useEffect, useState } from 'react';
import { Todo } from '../api/api';
import { useCreateTodos } from '../features/todos/useCreateTodo';
import toast from 'react-hot-toast';
import { useUser } from '../features/auth/useUser';
import IAuth from '../features/auth/IAuth';
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { DayPicker } from "react-day-picker";

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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

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
                <form onSubmit={handleSubmit} className='bg-primarygray shadow-md rounded px-8 pt-6 pb-8 mb-4 w-3/4'>
                    <div className='mb-4'>
                        <input className='shadow appearance-none border rounded w-full py-2 px-3 text-primarygray leading-tight focus:outline-none focus:shadow-outline' 
                            id='taskDescription' 
                            type='text' 
                            placeholder={task} 
                            onChange={(e) => setTask(e.target.value)}
                        />
                    </div>
                    <div className='mb-4'>
                        <input className='shadow appearance-none border rounded w-full py-2 px-3 text-primarygray leading-tight focus:outline-none focus:shadow-outline' 
                            id='taskScheduledDate' 
                            type='text' 
                            placeholder={'Select a date'} 
                            value={scheduledDate.toDateString()}
                            onClick={() => setShowDatePopup(!showDatePopup)}
                        />
                        {showDatePopup &&
                            <DayPicker
                                mode="single"
                                selected={scheduledDate}
                                onSelect={handleDateChange}
                                showOutsideDays
                                className="border-0"
                                classNames={{
                                caption: "flex justify-center py-2 mb-4 relative items-center",
                                caption_label: "text-sm font-medium text-gray-900",
                                nav: "flex items-center",
                                nav_button:
                                    "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
                                nav_button_previous: "absolute left-1.5",
                                nav_button_next: "absolute right-1.5",
                                table: "w-full border-collapse",
                                head_row: "flex font-medium text-gray-900",
                                head_cell: "m-0.5 w-9 font-normal text-sm",
                                row: "flex w-full mt-2",
                                cell: "text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                                day: "h-9 w-9 p-0 font-normal",
                                day_range_end: "day-range-end",
                                day_selected:
                                    "rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white",
                                day_today: "rounded-md bg-gray-200 text-gray-900",
                                day_outside:
                                    "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
                                day_disabled: "text-gray-500 opacity-50",
                                day_hidden: "invisible",
                                }}
                                components={{
                                IconLeft: ({ ...props }) => (
                                    <BsChevronLeft {...props} className="h-4 w-4 stroke-2" />
                                ),
                                IconRight: ({ ...props }) => (
                                    <BsChevronRight {...props} className="h-4 w-4 stroke-2" />
                                ),
                                }}
                            />
                        }
                    </div>
                    <div className='md:flex md:items-center'>
                        <div className='md:w-2/3 flex flex-row items-start justify-between'>
                            <button disabled={isPending} className='shadow bg-primaryblue hover:bg-hoverblue focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded' onClick={handleClose}>
                                Cancel
                            </button>
                            <button disabled={isPending} className='shadow bg-primaryblue hover:bg-hoverblue focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded' type='submit'>
                                Add Task
                            </button>
                        </div>
                    </div>
                </form>
            }
        </>
    )
}

export default CreateTodoModal;