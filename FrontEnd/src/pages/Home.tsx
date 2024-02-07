import Sidebar from "../components/Sidebar";
import { Todo } from "../services/apiTodos";
import { useState } from "react";
import IAuth from "../features/auth/IAuth";
import CreateTodoModal from "../components/CreateTodoModal";
import { useUser } from "../features/auth/useUser";
import { useTodos } from "../features/todos/useTodos";
import { useDeleteTodo } from "../features/todos/useDeleteTodo";
import EditTodoModal from "../components/EditTodoModal";
import CustomButton from "../widgets/CustomButton";
import TodoWidget from "../widgets/TodoWidget";
import { BsPlus } from "react-icons/bs";

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
                            <TodoWidget todo={todo} index={index} onDeleteTodo={handleDeleteTodo} onOpenEditModal={handleOpenEditModal}/>
                        );
                    })}
                    <div>
                        {(showEditModal && selectedTodo) && 
                            <EditTodoModal auth={auth} showModal={showEditModal} onClose={handleCloseEditModal} todo={selectedTodo}/>
                        }
                    </div>
                    <div> 
                        <CustomButton buttonText='Add task' onClickCallback={handleOpenCreateModal} Icon={BsPlus}/>
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