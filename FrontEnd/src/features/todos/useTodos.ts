import { useQuery } from '@tanstack/react-query';
import ApiTodos from '../../services/apiTodos';

export function useTodos(userId: string | undefined) {
    const {
        data: todos,
        isLoading,
        isError,
        error,
        isFetching,
        refetch,
    } = useQuery({
      queryKey: ['todos'],
      queryFn: async () => { return await ApiTodos.getTodos(userId);}
    });

    return { todos, isLoading, isError, error, isFetching, refetch }
}