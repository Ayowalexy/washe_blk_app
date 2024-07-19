import { useQuery } from "@tanstack/react-query";
import api from "../api";
import { queryClient } from "../../provider/app-provider";

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
      api
        .get(`/requests?descending=true`)
        .then((resp) => {
          queryClient.invalidateQueries({ queryKey: ["saved-requests"] });
          return resp.data ?? [];
        })
        .catch((e) => {
          return [];
        }),
    queryKey: ["user-requests"],
    enabled: true,
    staleTime: 1,
  });
}
export function useGetLaundryServices() {
  return useQuery({
    queryFn: () => api.get(`/requests/services`).then((resp) => resp.data),
    queryKey: ["laundry-services"],
    enabled: true,
  });
}
export function useGetLaundryType() {
  return useQuery({
    queryFn: () => api.get(`/requests/types`).then((resp) => resp.data),
    queryKey: ["laundry-types"],
    enabled: true,
  });
}

export function useGetPaymentMethods() {
  return useQuery({
    queryFn: () => api.get(`/payments/card`).then((resp) => resp.data),
    queryKey: ["payment-cards"],
  });
}
export function useGetSavedRequests() {
  queryClient.invalidateQueries({ queryKey: ["saved-requests"] });
  return useQuery({
    queryFn: () =>
      api.get(`/requests/saved-requests`).then((resp) => resp.data).catch(() => []),
    queryKey: ["saved-requests"],
    enabled: true,
    staleTime: 1,
  });
}
