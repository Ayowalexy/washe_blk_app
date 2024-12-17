import { useQuery } from "@tanstack/react-query";
import api from "../api";
import { queryClient } from "../../src/provider/app.provider";

export function useGetCurrentUser() {
  return useQuery({
    queryFn: () => api.get(`/auth/user`).then((resp) => resp.data),
    queryKey: ["user"],
    enabled: true,
  });
}
export function useGetRequests() {
  return useQuery({
    queryFn: () =>
      api.get(`/rider/requests`).then((resp) => {
        return resp.data;
      }),
    queryKey: ["rider-requests"],
    enabled: true,
    staleTime: 1,
  });
}

export function useGetAvatars() {
  queryClient.invalidateQueries({ queryKey: ["avatars"] });
  return useQuery({
    queryFn: () =>
      api
        .get(`/avatar`)
        .then((resp) => resp.data)
        .catch(() => []),
    queryKey: ["avatars"],
    enabled: true,
    staleTime: 1,
  });
}

export function useGetPaymentMethods() {
  return useQuery({
    queryFn: () => api.get(`/payments/card`).then((resp) => resp.data),
    queryKey: ["payment-cards"],
    enabled: true
  });
  
}
export function useToggleAvailability() {
  return useQuery({
    queryFn: () => api.get(`/toggle-availability`).then((resp) => resp.data),
    queryKey: ["toggle-availability"],
    enabled: true
  });
  
}
export function useToggle2FA() {
  return useQuery({
    queryFn: () => api.get(`/toggle-2fa`).then((resp) => resp.data),
    queryKey: ["toggle-2fa"],
    enabled: true
  });
  
}
