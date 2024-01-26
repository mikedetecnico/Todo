import Sidebar from "../components/Sidebar";
import { Todo } from "../api/api";
import { useState } from "react";
import IAuth from "../auth/IAuth";
import { BsPlus } from "react-icons/bs";
import TodoModal from "../components/TodoModal";
import { useUser } from "../auth/useUser";
import { useTodos } from "../features/todos/useTodos";
import { useDeleteTodo } from "../features/todos/useDeleteTodo";

interface HomeProps {
    auth: IAuth;
}

const Home = ({auth}: HomeProps) => {
    const { user } = useUser(auth);
    const {todos} = useTodos(user?.uid);
    const {deleteTodo} = useDeleteTodo();

    const [showModal, setShowModal] = useState<boolean>(false);

    const handleCloseModal = () => {
        setShowModal(!showModal);
    }

    const handleOpenModal = () => {
        setShowModal(!showModal);
    }

    const handleDeleteTodo = (id: string) => {
        deleteTodo({
            id: id
        });
    }

    return (
        <div className='bg-primary flex flex-row min-h-screen h-screen'>
            <Sidebar auth={auth}/>
            <div className='flex flex-col w-full h-full bg-primary items-center content-center p-20'>
                <h1 className='text-white text-3xl'>Inbox</h1>
                <div className='flex flex-col w-1/2 h-1/2 bg-primary rounded-md'>
                    {todos?.map((todo: Todo, index: number) => {
                        return (
                            <div key={`todo${index}`} className='flex flex-row w-full h-1/6 bg-primary p-6 hover:bg-hovergray'>
                                <div className='flex flex-col w-1/6 h-full'>
                                    <input type='checkbox' placeholder='Complete' onClick={() => handleDeleteTodo(todo.id)}/>
                                </div>
                                <div className='flex flex-col w-5/6 h-full text-white'>
                                    <h1>{todo.task}</h1>
                                </div>
                                <div className='flex flex-col w-5/6 h-full text-white'>
                                    <h1>{todo.scheduledDate}</h1>
                                </div>
                            </div>
                        );
                    })}
                    <div> 
                        <button className='text-white hover:bg-hovergray flex flex-row w-full m-2 p-2 items-center' onClick={handleOpenModal}>
                            <BsPlus className='text-2xl'/>
                            Add task
                        </button>
                        {showModal && 
                            <TodoModal auth={auth} showModal={showModal} onClose={handleCloseModal}/>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;