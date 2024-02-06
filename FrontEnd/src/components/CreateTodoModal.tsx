import { useCreateTodos } from '../features/todos/useCreateTodo';
import IAuth from '../features/auth/IAuth';
import TodoModal from '../widgets/TodoModal';

interface CreateTodoModalProps {
    auth: IAuth;
    showModal: boolean;
    onClose: () => void;
}

const CreateTodoModal = ({auth, showModal, onClose}: CreateTodoModalProps) => {    
    const {createTodo, isPending} = useCreateTodos();
    
    return (
        <TodoModal 
            auth={auth} 
            showModal={showModal}  
            onClose={onClose} 
            submitTodo={createTodo} 
            isPending={isPending} 
            okayButtonText='Create Task' 
        />
    )
}

export default CreateTodoModal;