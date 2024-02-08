import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Todo } from "../../services/apiTodos";
import toast from 'react-hot-toast';
import ApiInstance from '../../services/apiInstance';
import { useUser } from '../auth/useUser';
import IAuth from '../auth/IAuth';

export function useCreateTodos(auth: IAuth) {
    const queryClient = useQueryClient();
    const {user} = useUser(auth);

    const { mutate: createTodo, isPending } = useMutation({
      mutationFn: async (todo: Todo) => { await ApiInstance.getInstance(import.meta.env.VITE_API_URL).addTodo(todo, user);},
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['todos']});
      },
      onError: (err) => {
        console.log('ERROR', err);
        toast.error('Unable to create todo.');
      },
    });
  
    return { createTodo, isPending };
}