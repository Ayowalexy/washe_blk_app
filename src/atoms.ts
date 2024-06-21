// src/atoms.js
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { User } from "../api/types";


type UserDataProps = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password?: string;
  passwordConfirmation?: string;
};
export const UserData = atom<UserDataProps>({} as UserDataProps);

export const AddressAtom = atom("");
// atoms.ts

export const persistentUserAtom = atomWithStorage<User | null>('currentUser', null);


