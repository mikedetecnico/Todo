import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import ApiInstance from '../../services/apiInstance';
import IAuth from '../auth/IAuth';
import { useUser } from '../auth/useUser';

interface DeleteTodoParams {
    id: string;
}

export function useDeleteTodo(auth: IAuth) {
    const queryClient = useQueryClient();
    const {user} = useUser(auth);
  
    const { isPending: isDeleting, mutate: deleteTodo } = useMutation({
      mutationFn: async (params: DeleteTodoParams) => { await ApiInstance.getInstance(import.meta.env.VITE_API_URL).deleteTodoById(params.id, user);},
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