import { useQuery } from '@tanstack/react-query';
import ApiInstance from '../../services/apiInstance';
import IAuth from '../auth/IAuth';
import { useUser } from '../auth/useUser';

export function useTodos(auth: IAuth) {
    const {user} = useUser(auth);
    const {
        data: todos,
        isLoading,
        isError,
        error,
        isFetching,
        refetch,
    } = useQuery({
      queryKey: ['todos'],
      queryFn: async () => { return await ApiInstance.getInstance(import.meta.env.VITE_API_URL).getTodos(user?.uid, user);}
    });

    return { todos, isLoading, isError, error, isFetching, refetch }
}