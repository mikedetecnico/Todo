import { useMutation, useQueryClient } from '@tanstack/react-query';
import Api, { Todo } from "../../api/api";
import toast from 'react-hot-toast';

export function useEditTodos() {
    const queryClient = useQueryClient();
  
    const { mutate: editTodo, isPending } = useMutation({
      mutationFn: async (todo: Todo) => { await Api.updateTodoById(todo);},
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