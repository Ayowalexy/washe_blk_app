import { useQuery } from "@tanstack/react-query";
import api from "../api";

export function useGetCurrentUser() {
  return useQuery({
    queryFn: () => api.get(`/auth/user`).then((resp) => resp.data),
    queryKey: ["user"],
    enabled: false,
  });
}
