import { useMutation, useQueryClient } from '@tanstack/react-query';
import ApiTodos, { Todo } from "../../services/apiTodos";
import toast from 'react-hot-toast';

export function useEditTodos() {
    const queryClient = useQueryClient();
  
    const { mutate: editTodo, isPending } = useMutation({
      mutationFn: async (todo: Todo) => { await ApiTodos.updateTodoById(todo);},
      onSuccess: () => {
        toast.success('Todo updated successfully.');
        queryClient.invalidateQueries({queryKey: ['todos']});
      },
      onError: (err) => {
        console.log('ERROR', err);
        toast.error('Unable to create todo.');
      },
    });
  
    return { editTodo, isPending };
}