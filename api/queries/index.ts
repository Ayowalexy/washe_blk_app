import { useQuery } from "@tanstack/react-query";
import api from "../api";

export function useGetCurrentUser() {
  return useQuery({
    queryFn: () => api.get(`/auth/user`).then((resp) => resp.data),
    queryKey: ["user"],
    enabled: true,
  });
}
export function useGetRequests() {
  return useQuery({
    queryFn: () => api.get(`/requests?descending=false`).then((resp) => resp.data),
    queryKey: ["user-requests"],
    enabled: true,
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
  return useQuery({
    queryFn: () => api.get(`/requests/saved-requests`).then((resp) => resp.data),
    queryKey: ["saved-requests"],
    enabled: true,
  });
}