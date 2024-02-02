import Sidebar from "../components/Sidebar";
import { Todo } from "../api/api";
import { useState } from "react";
import IAuth from "../features/auth/IAuth";
import { BsPlus } from "react-icons/bs";
import CreateTodoModal from "../components/CreateTodoModal";
import { useUser } from "../features/auth/useUser";
import { useTodos } from "../features/todos/useTodos";
import { useDeleteTodo } from "../features/todos/useDeleteTodo";
import EditTodoModal from "../components/EditTodoModal";

interface HomeProps {
    auth: IAuth;
}

const Home = ({auth}: HomeProps) => {
    const { user } = useUser(auth);
    const {todos} = useTodos(user?.uid);
    const {deleteTodo} = useDeleteTodo();

    const [showCreateModal, setShowCreateModal] = useState<boolean>(false);

    const [showEditModal, setShowEditModal] = useState<boolean>(false);

    const [selectedTodo, setSelectedTodo] = useState<Todo>();

    const handleCloseCreateModal = () => {
        setShowCreateModal(!showCreateModal);
    }

    const handleOpenCreateModal = () => {
        setShowCreateModal(!showCreateModal);
    }

    const handleDeleteTodo = (id: string) => {
        deleteTodo({
            id: id
        });
    }

    const handleOpenEditModal = (currentTodo: Todo) => {
        setSelectedTodo(currentTodo);
        setShowEditModal(!showEditModal);
    }

    const handleCloseEditModal = () => {
        setShowEditModal(!showEditModal);
    }

    return (
        <div className='bg-primary flex flex-row min-h-screen h-screen'>
            <Sidebar auth={auth} onOpenAddTaskModal={handleOpenCreateModal}/>
            <div className='flex flex-col w-full h-full bg-primary items-center content-center p-20'>
                <h1 className='text-white text-3xl'>Inbox</h1>
                <div className='flex flex-col w-1/2 h-1/2 bg-primary rounded-md'>
                    {todos?.map((todo: Todo, index: number) => {
                        return (
                            <div key={`todo${index}`} className='flex flex-row w-full h-1/6 bg-primary p-6 hover:bg-hovergray'>
                                <div className='flex flex-col w-1/6 h-full'>
                                    <input type='checkbox' placeholder='Complete' onClick={() => handleDeleteTodo(todo.id)}/>
                                </div>
                                <div className='flex flex-row w-full h-full' onClick={() => handleOpenEditModal(todo)}>
                                    <div className='flex flex-col w-5/6 h-full text-white'>
                                        <h1>{todo.task}</h1>
                                    </div>
                                    <div className='flex flex-col w-5/6 h-full text-white'>
                                        <h1>{todo.scheduledDate}</h1>
                                    </div>
                                </div>

                            </div>
                        );
                    })}
                    <div>
                        {(showEditModal && selectedTodo) && 
                            <EditTodoModal showModal={showEditModal} onClose={handleCloseEditModal} todo={selectedTodo}/>
                        }
                    </div>
                    <div> 
                        <button className='text-white hover:bg-hovergray flex flex-row w-full m-2 p-2 items-center' onClick={handleOpenCreateModal}>
                            <BsPlus className='text-2xl'/>
                            Add task
                        </button>
                        {showCreateModal && 
                            <CreateTodoModal auth={auth} showModal={showCreateModal} onClose={handleCloseCreateModal}/>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;