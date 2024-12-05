export type CreateAccountDTO = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
};

export type SubmitDocumentDTO = {
  address: string;
  fileName: string;
  fileUrl: string;
  city: string;
  state: string;
  zipCode: string;
};
export type loginDTO = {
  email: string;
  password: string;
  longitude: number;
  latitude: number;
};

export interface User {
  avatar: null | string;
  deactivateReason: null | string;
  deleteReason: null | string;
  email: string;
  firstName: string;
  fullName: string;
  hasUnreadNotifcations: boolean;
  id: string;
  isActive: boolean;
  isAvailable: boolean;
  isOnboardingDocumentSubmitted: boolean;
  isVerified: boolean;
  lastName: string;
  latitude: string;
  longitude: string;
  phoneNumber: string;
  stripeCustomerId: null | string;
  type: "rider";
  verificationDocument: {
    acceptedAt: null | string;
    address: string;
    city: string;
    createdAt: string;
    fileName: string;
    id: string;
    isApproved: null | boolean;
    isPending: boolean;
    isVerificationStatus: boolean;
    lineOne: string;
    rejectedAt: null | string;
    rejectionReason: null | string;
    state: string;
    url: string;
    userId: string;
    zipCode: string;
  };
}

export type LaundryServiceType = {
  id: string;
  name: string;
  description: string;
};

export type LaundryServiceTypesData = {
  status: boolean;
  message: string;
  data: LaundryServiceType[];
};

export interface LaundryRequestDTO {
  laundryRequestServiceId: string;
  laundryRequestTypeId: string;
  pickupDate: string;
  pickupTime: string;
  timeframe: string;
  detergentType: string;
  waterTemperature: string;
  softener: boolean;
  bleach: boolean;
  dye: boolean;
  dyeColor: string;
}
export interface LaundryReRequestDTO {
  laundryRequestId: string;
}

export type UpdateAccountDTO = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  avatar?: string;
};
export type ContactUsDTO = {
  message: string;
};

export type useForgotPasswordDTO = {
  email: string;
};
export type useVerifyOtpDTO = {
  email: string;
  otp: string;
};
export type CreditCatDTO = {
  number: string;
  cvv: string;
  exp_month: number;
  exp_year: number;
};
export type useResetPasswordDTO = {
  password: string;
};
export type useChangePasswordDTO = {
  oldPassword: string;
  newPassword: string;
};

export type useAcceptRequestDTO = {
  riderRequestId: string;
};
export type UpdatePricingDTO = {
  riderRequestId: string;
  fee: number;
};
export type UpdateStatus = {
  riderRequestId: string;
  status: string;
};
