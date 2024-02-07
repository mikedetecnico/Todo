import { useQuery } from '@tanstack/react-query';
import ApiInstance from '../../services/apiInstance';

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
      queryFn: async () => { return await ApiInstance.getInstance(import.meta.env.VITE_API_URL).getTodos(userId);}
    });

    return { todos, isLoading, isError, error, isFetching, refetch }
}