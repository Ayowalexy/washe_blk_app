// src/atoms.js
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { User } from "../api/types";
import { string } from "yup";

type UserDataProps = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  type: string;
  latitude?: number;
  longitude?: number;
  password?: string;
  passwordConfirmation?: string;
};

export const UserData = atom<UserDataProps>({} as UserDataProps);

interface LocationType {
  latitude: number;
  longitude: number;
}

export const CurrentUserLocation = atom<LocationType>({} as LocationType);

type LaundryRequestProps = {
  laundryRequestServiceId: string;
  laundryRequestServiceName?: string;
  laundryRequestTypeId: string;
  laundryRequestTypeName?: string;
  pickupDate: string;
  pickupTime: string;
  timeframe: string;
  detergentType: string;
  waterTemperature: string;
  softener: boolean;
  bleach: boolean;
  dye: boolean;
  dyeColor: string;
  tax?: number;
  total_amount?: number;
  laundryRequestId?: string;
};

export const LaundryRequests = atom<LaundryRequestProps>(
  {} as LaundryRequestProps
);

type AddressDataProps = {
  address: string;
  city: string;
  state: string;
  zipCode: string;
};
type AcceptedRequestProps = {
  firstName: string;
  lastName: string;
  location: string;
  estimatedTime: string;
  amount: number;
  baseFee: number;
  id: string;
};
export const AddressAtom = atom<AddressDataProps>({} as AddressDataProps);
// atoms.ts
export const openVerificationStateAtom = atom(true);
export const laundryRequestServiceIdAtom = atom("");
export const OnelaundryRequestAtom = atom("");
export const laundryRequestServiceNameAtom = atom("");
export const requestTypeAtom = atom("");
export const persistentUserAtom = atomWithStorage<User | null>(
  "currentUser",
  null
);

export const TwoFactorAuthenticationState = atom(false);
export const oneAcceptedRequestAtom = atom<AcceptedRequestProps>(
  {} as AcceptedRequestProps
);
export const availabilityState = atom(true);
