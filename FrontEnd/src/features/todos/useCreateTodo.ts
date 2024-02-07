import { useMutation, useQueryClient } from '@tanstack/react-query';
import ApiTodos, { Todo } from "../../services/apiTodos";
import toast from 'react-hot-toast';

export function useCreateTodos() {
    const queryClient = useQueryClient();
  
    const { mutate: createTodo, isPending } = useMutation({
      mutationFn: async (todo: Todo) => { await ApiTodos.addTodo(todo);},
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