import * as Yup from "yup";

export const formValidationSchemas = [
  Yup.object({
    emailId: Yup.string().email("Invalid email address").required("Email id is required"),
    password: Yup.string()
      .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}/, "Password requirements not met")
      .required(
        "Password Must contain minimum 2 capital letters, 2 small letter, 2 numbers and 2 special characters.",
      ),
  }),
  Yup.object({
    firstName: Yup.string()
      .matches(/^[A-Za-z]+$/, "Only alphabets are allowed")
      .min(2)
      .max(50)
      .required("First name is required"),
    lastName: Yup.string().matches(/^[A-Za-z]*$/, "Only alphabets are allowed"),
    address: Yup.string()
      .min(10, "Address must be at least 10 characters")
      .required("Address is required"),
  }),
  Yup.object({
    countryCode: Yup.string().oneOf(["+91", "+1"], "Invalid country code").required("Required"),
    phoneNumber: Yup.string()
      .matches(/^\d{10}$/, "Must be a 10 digit number")
      .required("Phone number is required"),
    acceptTermsAndCondition: Yup.bool()
      .oneOf([true], "You must accept the terms and conditions")
      .required("Required"),
  }),
];
