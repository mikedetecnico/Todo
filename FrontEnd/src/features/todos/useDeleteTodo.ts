import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import ApiInstance from '../../services/apiInstance';

interface DeleteTodoParams {
    id: string;
}

export function useDeleteTodo() {
    const queryClient = useQueryClient();
  
    const { isPending: isDeleting, mutate: deleteTodo } = useMutation({
      mutationFn: async (params: DeleteTodoParams) => { await ApiInstance.getInstance(import.meta.env.VITE_API_URL).deleteTodoById(params.id);},
      onSuccess: () => {
        toast.success('Todo deleted.');

        queryClient.invalidateQueries({queryKey: ['todos']});
      },
      onError: (err) => {
        console.log('ERROR', err);
        toast.error('Unable to delete todo.');
      },
    });
  
    return { isDeleting, deleteTodo };
}