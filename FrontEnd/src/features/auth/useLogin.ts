import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { IAuthParams } from './useSignup';
import IAuth from './IAuth';

export function useLogin(auth: IAuth) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending } = useMutation({
    mutationFn: async (params: IAuthParams) => { await auth.signIn(params.email, params.password); },
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user);
      
      navigate('/home', { replace: true });
    },
    onError: (err) => {
      console.log('ERROR', err);
      toast.error('Provided email or password are incorrect');
    },
  });

  return { login, isPending };
}