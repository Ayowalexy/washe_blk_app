import api from "../api";
import { useMutation } from "@tanstack/react-query";
import { CreateAccountDTO, SubmitDocumentDTO, loginDTO } from "../types";

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