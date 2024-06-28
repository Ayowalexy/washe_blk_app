import api from "../api";
import { useMutation } from "@tanstack/react-query";
import { ContactUsDTO, CreateAccountDTO, LaundryReRequestDTO, LaundryRequestDTO, SubmitDocumentDTO, UpdateAccountDTO, loginDTO } from "../types";

export function useSignUp() {
  return useMutation({
    mutationFn: (data: CreateAccountDTO) =>
      api.post("/onboard/create-account", data).then((resp) => resp.data),
  });
}
export function useSubmitDocument() {
  return useMutation({
    mutationFn: (data: SubmitDocumentDTO) =>
      api.post("/auth/onboarding", data).then((resp) => resp.data),
  });
}
export function useLogin() {
  return useMutation({
    mutationFn: (data: loginDTO) =>
      api.post("/auth/login", data).then((resp) => resp.data),
  });
}
export function useMakeLaundryRequest() {
  return useMutation({
    mutationFn: (data: LaundryRequestDTO) =>
      api.post("/requests", data).then((resp) => resp),
  });
}
export function useReMakeLaundryRequest() {
  return useMutation({
    mutationFn: (data: LaundryReRequestDTO) =>
      api.post("/requests/re-request", data).then((resp) => resp),
  });
}
export function useUpdateProfile() {
  return useMutation({
    mutationFn: (data: UpdateAccountDTO) =>
      api.patch("/update-profile", data).then((resp) => resp.data),
  });
}
export function useContactUs() {
  return useMutation({
    mutationFn: (data: ContactUsDTO) =>
      api.post("/user/contact-us", data).then((resp) => resp.data),
  });
}