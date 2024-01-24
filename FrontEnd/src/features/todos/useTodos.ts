import { useQuery } from '@tanstack/react-query';
import Api from '../../api/api';

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
      queryFn: async () => { return await Api.getTodos(userId);}
    });

    return { todos, isLoading, isError, error, isFetching, refetch }
}