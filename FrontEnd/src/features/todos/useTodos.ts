import { useMutation, useQueryClient } from '@tanstack/react-query';
import Api from "../../api/api";
import toast from 'react-hot-toast';

interface TodoParams {
    userId: string;
}

export function useTodos() {
    const queryClient = useQueryClient();
  
    const { mutate: todos, isPending } = useMutation({
      mutationFn: async (params: TodoParams) => { await Api.getTodos(params.userId);},
      onSuccess: (todos) => {
        queryClient.setQueryData(['todos'], todos);
      },
      onError: (err) => {
        console.log('ERROR', err);
        toast.error('Unable to retrieve todos.');
      },
    });
  
    return { todos, isPending };
}