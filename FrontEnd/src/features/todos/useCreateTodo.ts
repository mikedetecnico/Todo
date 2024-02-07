import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Todo } from "../../services/apiTodos";
import toast from 'react-hot-toast';
import ApiInstance from '../../services/apiInstance';

export function useCreateTodos() {
    const queryClient = useQueryClient();
  
    const { mutate: createTodo, isPending } = useMutation({
      mutationFn: async (todo: Todo) => { await ApiInstance.getInstance(import.meta.env.VITE_API_URL).addTodo(todo);},
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