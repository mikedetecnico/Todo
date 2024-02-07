import { Todo } from "../services/apiTodos";

interface TodoWidgetProps {
    todo: Todo;
    index: number;
    onDeleteTodo: (id: string) => void;
    onOpenEditModal: (currentTodo: Todo) => void;
}

const TodoWidget = ({todo, index, onDeleteTodo, onOpenEditModal}: TodoWidgetProps) => {
    return (
        <div key={`todo${index}`} className='flex flex-row w-full h-1/6 bg-primary p-6 hover:bg-hovergray'>
            <div className='flex flex-col w-1/6 h-full justify-center'>
                <input type='checkbox' className='rounded-lg bg-primary' placeholder='Complete' onClick={() => onDeleteTodo(todo.id)}/>
            </div>
            <div className='flex flex-row w-full h-full' onClick={() => onOpenEditModal(todo)}>
                <div className='flex flex-col w-5/6 h-full text-white justify-center'>
                    <h1>{todo.task}</h1>
                </div>
                <div className='flex flex-col w-5/6 h-full text-white justify-center'>
                    <h1>{todo.scheduledDate}</h1>
                </div>
            </div>
        </div>
    )
}

export default TodoWidget;