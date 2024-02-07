import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Todo } from "../../services/apiTodos";
import toast from 'react-hot-toast';
import ApiInstance from '../../services/apiInstance';

export function useEditTodos() {
    const queryClient = useQueryClient();
  
    const { mutate: editTodo, isPending } = useMutation({
      mutationFn: async (todo: Todo) => { await ApiInstance.getInstance(import.meta.env.VITE_API_URL).updateTodoById(todo);},
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