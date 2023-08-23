import * as Yup from "yup";

export const bootCampSchema = Yup.object({
  name: Yup.string().required("Please Enter title"),
  description: Yup.string().required("Please Enter description"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Please Enter Your Email"),
  website: Yup.string()
    .url("Invalid website URL")
    .required("Please Enter Your website Name"),
  phone: Yup.string()
    .matches(/^\+?[0-9]*$/, "Invalid phone number format")
    .required("Please Enter Your phone Number"),
  address: Yup.string()
    .min(20, "Address must be at least 20 characters")
    .required("Please Enter Your address"),
});
