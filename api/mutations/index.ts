import api from "../api";
import { useMutation } from "@tanstack/react-query";
import {
  ContactUsDTO,
  CreateAccountDTO,
  CreditCatDTO,
  LaundryReRequestDTO,
  LaundryRequestDTO,
  SubmitDocumentDTO,
  UpdateAccountDTO,
  loginDTO,
  useForgotPasswordDTO,
  useResetPasswordDTO,
  useVerifyOtpDTO,
} from "../types";
import axios from "axios";
import { Buffer } from "buffer";

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

export function useCreateCard() {
  return useMutation({
    mutationFn: (data: CreditCatDTO) =>
      axios.post("https://api.stripe.com/v1/payment_methods", null, {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${process.env.EXPO_PUBLIC_STRIPE_SK}:`
          ).toString("base64")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        params: {
          type: "card",
          "card[number]": data.number,
          "card[exp_month]": data.exp_month,
          "card[exp_year]": data.exp_year,
          "card[cvc]": data.cvv,
        },
      }),
  });
}

export function useAddCard() {
  return useMutation({
    mutationFn: (data: Record<string, string | boolean>) =>
      api.post("/payments/card", data).then((resp) => resp.data),
  });
}

export function useMakePayment() {
  return useMutation({
    mutationFn: (data: Record<string, string | boolean>) =>
      api.post("/requests/pay", data).then((resp) => resp.data),
  });
}
export function useForgotPassword() {
  return useMutation({
    mutationFn: (data: useForgotPasswordDTO) =>
      api.post("/auth/forget-password", data).then((resp) => resp),
  });
}
export function useVerifyOtpEndpoint() {
  return useMutation({
    mutationFn: (data: useVerifyOtpDTO) =>
      api.post("/auth/verify-forget-password", data).then((resp) => resp),
  });
}
export function useResetPassword() {
  return useMutation({
    mutationFn: (data: useResetPasswordDTO) =>
      api.post("/auth/reset-password", data).then((resp) => resp),
  });
}
