import { useMutation, useQueryClient } from '@tanstack/react-query';
import Api, { Todo } from "../../api/api";
import toast from 'react-hot-toast';

interface TodoParams {
    todo: Todo;
}

export function useCreateTodos() {
    const queryClient = useQueryClient();
  
    const { mutate: createTodo, isPending } = useMutation({
      mutationFn: async (params: TodoParams) => { await Api.addTodo(params.todo);},
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