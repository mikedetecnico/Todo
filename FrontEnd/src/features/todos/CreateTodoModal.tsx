import { useCreateTodos } from './useCreateTodo';
import IAuth from '../auth/IAuth';
import TodoModal from './TodoModal';

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