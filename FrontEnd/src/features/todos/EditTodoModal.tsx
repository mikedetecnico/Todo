import { Todo } from '../../services/apiTodos';
import IAuth from '../auth/IAuth';
import { useEditTodos } from './useEditTodo';
import TodoModal from './TodoModal';

interface EditTodoModalProps {
    auth: IAuth;
    showModal: boolean;
    onClose: () => void;
    todo: Todo;
}

const EditTodoModal = ({auth, showModal, onClose, todo}: EditTodoModalProps) => {   
    const {editTodo, isPending} = useEditTodos();
    
    return (
        <TodoModal 
            auth={auth} 
            showModal={showModal} 
            onClose={onClose} 
            todo={todo} 
            submitTodo={editTodo} 
            isPending={isPending} 
            okayButtonText='Edit Task' 
        />
    )
}

export default EditTodoModal;