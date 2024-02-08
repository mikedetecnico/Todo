import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Todo } from "../../services/apiTodos";
import toast from 'react-hot-toast';
import ApiInstance from '../../services/apiInstance';
import IAuth from '../auth/IAuth';
import { useUser } from '../auth/useUser';

export function useEditTodos(auth: IAuth) {
    const queryClient = useQueryClient();
    const {user} = useUser(auth);
  
    const { mutate: editTodo, isPending } = useMutation({
      mutationFn: async (todo: Todo) => { await ApiInstance.getInstance(import.meta.env.VITE_API_URL).updateTodoById(todo, user);},
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