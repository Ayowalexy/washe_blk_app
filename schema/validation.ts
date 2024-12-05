import * as Yup from "yup";

export const signUpValidationSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
});
export const enterPasswordValidationSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .test("specialChars", "Field must contain special characters", (value) => {
      const regex = /[~!@#$%^&*)(_+\-:[}=]/;
      return regex.test(value || "");
    })
    .test("specialChars", "Field must contain at least one number", (value) => {
      const regex = /\d/;
      return regex.test(value || "");
    })
    .test(
      "specialChars",
      "Field must contain at least an uppercase",
      (value) => {
        const regex = /[A-Z]/;
        return regex.test(value || "");
      }
    )
    .min(8),
  password_confirmation: Yup.string()
    .required("Confirm Password is required")
    .test("passwords-match", "Passwords must match", function (value) {
      return this.parent.password === value;
    }),
});
export const addressValidationSchema = Yup.object().shape({
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  zipCode: Yup.string().required("zip code is required"),
});

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().required("password is required"),
});
export const laundryRequestValidationSchema = (dye: "No" | "Yes") => {
  const obj: any = {
    Yes: {
      dyeColor: Yup.string().required(),
    },
    No: {
      dyeColor: Yup.string().optional(),
    },
  };
  return Yup.object().shape({
    laundryRequestTypeId: Yup.string().required("Laundry type is required"),
    pickupDate: Yup.string().required("Pickup date is required"),
    pickupTime: Yup.string().required("Pickup time is required"),
    timeframe: Yup.string().required("Timeframe type is required"), // [same_day | normal | 2_days]
    detergentType: Yup.string().required("Detergent type is required"), // [scented | unscented]
    waterTemperature: Yup.string().required("water temperature is required"), // [cold | hot]
    softener: Yup.string().required("Is softener required"),
    bleach: Yup.string().required("Is bleach required"),
    dye: Yup.string().required("Is dye required"),
    ...obj[dye],
  });
};
export const updateProfileValidationSchema = Yup.object().shape({
  email: Yup.string().email().optional(),
  firstName: Yup.string().optional(),
  lastName: Yup.string().optional(),
  phoneNumber: Yup.string().optional(),
});
export const contactUsValidationSchema = Yup.object().shape({
  email: Yup.string().email().optional(),
  message: Yup.string().required("Message is required"),
});

export const createPaymentMethodValidationSchema = Yup.object().shape({
  number: Yup.number().required("Enter card number"),
  exp: Yup.string().required("Required"),
  cvc: Yup.string().required(),
});

export const forgotPasswordValidationSchema = Yup.object().shape({
  email: Yup.string().email().required("Email address is required"),
});
export const changePasswordValidationSchema = Yup.object().shape({
  oldPassword: Yup.string().required("Old password is required"),
  newPassword: Yup.string()
    .required("New password is required")
    .test("specialChars", "Field must contain special characters", (value) => {
      const regex = /[~!@#$%^&*)(_+\-:[}=]/;
      return regex.test(value || "");
    })
    .test("specialChars", "Field must contain at least one number", (value) => {
      const regex = /\d/;
      return regex.test(value || "");
    })
    .test(
      "specialChars",
      "Field must contain at least an uppercase",
      (value) => {
        const regex = /[A-Z]/;
        return regex.test(value || "");
      }
    )
    .min(8),
  password_confirmation: Yup.string()
    .required("Confirm Password is required")
    .test("passwords-match", "Passwords must match", function (value) {
      return this.parent.newPassword === value;
    }),
});
