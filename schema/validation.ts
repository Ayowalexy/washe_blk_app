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
});

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().required("password is required"),
});
