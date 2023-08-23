import * as Yup from "yup";

export const signUpSchema = Yup.object({
  name: Yup.string().required("Please Enter Your Name"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Please Enter Your Email"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Password must contain at least 1 lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least 1 uppercase letter")
    .matches(/[0-9]/, "Password must contain at least 1 number")
    .matches(
      /[!@#$%^&*()\-_=+{}[\]|;:'",.<>?/\\]/,
      "Password must contain at least 1 special character"
    )
    .required("Please Enter Your Password"),
});
