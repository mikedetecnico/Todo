import { useQuery } from "@tanstack/react-query";
import IAuth from "./IAuth";

export function useUser(auth: IAuth) {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: auth.getCurrentUser,
  });

  return { isLoading, user, isAuthenticated: user !== null };
}