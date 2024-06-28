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
};
export type loginDTO = {
  email: string;
  password: string;
};

export interface User {
  id: string;
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  avatar: string | null;
  type: string;
  isOnboardingDocumentSubmitted: boolean;
  isActive: boolean;
  isVerified: boolean;
  stripeCustomerId: string | null;
  deactivateReason: string | null;
  deleteReason: string | null;
  verificationDocument: {
    id: string;
    fileName: string;
    url: string;
    address: string;
    isApproved: boolean | null;
    isPending: boolean;
    userId: string;
    isVerificationStatus: boolean;
    rejectedAt: string | null;
    acceptedAt: string | null;
    rejectionReason: string | null;
    createdAt: string;
  } | null;
  fullName: string;
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
};
export type ContactUsDTO = {
  message: string;
};


export type CreditCatDTO = {
  number: string;
  cvv: string;
  exp_month: number;
  exp_year: number;
}