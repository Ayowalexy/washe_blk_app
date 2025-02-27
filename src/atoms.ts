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
  password?: string;
  passwordConfirmation?: string;
  type: string;
};
export const UserData = atom<UserDataProps>({} as UserDataProps);

type LaundryRequestProps = {
  laundryRequestServiceId: string;
  laundryRequestServiceName?: string;
  laundryRequestTypes: Array<{
    laundryRequestTypeId: string;
    quantity: number;
  }>;
  laundryRequestTypeName?: string;
  pickupDate: string;
  pickupTime: string;
  timeframe: string;
  detergentType: string;
  waterTemperature: string;
  softener: boolean;
  bleach: boolean;
  dye: boolean;
  dyeColor: string | null;
  tax?: number;
  total_amount?: number;
  laundryRequestId?: string;
};

type AddressProps = {
  address: string;
  city: string;
  state: string;
  zipCode: string;
};
export const LaundryRequests = atom<LaundryRequestProps>(
  {} as LaundryRequestProps
);
export const AddressAtom = atom<AddressProps>({} as AddressProps);
// atoms.ts
export const openVerificationStateAtom = atom(true);
export const laundryRequestServiceIdAtom = atom("");
export const OnelaundryRequestAtom = atom("");
export const laundryRequestServiceNameAtom = atom("");
export const persistentUserAtom = atomWithStorage<User | null>(
  "currentUser",
  null
);
