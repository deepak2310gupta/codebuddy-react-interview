import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { formValidationSchemas } from "../../validationSchema/userFormSchema";
import "./userForm.css";

export default function UserForm() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    emailId: "",
    password: "",
    firstName: "",
    lastName: "",
    address: "",
    countryCode: "",
    phoneNumber: "",
    acceptTermsAndCondition: false,
  });

  const currentValidationSchema = formValidationSchemas[step];

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = (values, actions) => {
    const { acceptTermsAndCondition, ...dataToSubmit } = values;

    if (step < 2) {
      setFormData({ ...formData, ...dataToSubmit });
      setStep(step + 1);
    } else {
      fetch("https://codebuddy.review/submit", {
        method: "POST",
        body: JSON.stringify(dataToSubmit),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          navigate("/posts");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }

    actions.setSubmitting(false);
  };

  return (
    <>
      <div className="formContainer">
        <Formik
          initialValues={formData}
          validationSchema={currentValidationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isSubmitting, isValid }) => (
            <Form>
              {step === 0 && <Step1 />}
              {step === 1 && <Step2 />}
              {step === 2 && <Step3 />}

              <div className="buttonGroup">
                <button type="button" onClick={handleBack} disabled={step === 0} className="button">
                  Back
                </button>
                <button type="submit" disabled={isSubmitting} className="button">
                  Save
                </button>
                <button
                  type="submit"
                  disabled={step === 2 || !isValid || isSubmitting}
                  className="button"
                >
                  Save and Next
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      {/* This button is placed intentionally to navigate user to Seat Booking page. This was not mentioned
      in the task  */}

      <div className="formContainer mt-50 flex items-center justify-center">
        <button
          className="mt-10 flex items-center justify-center rounded bg-blue-400 px-2 py-1 text-sm text-white"
          onClick={() => navigate("/seat-booking")}
        >
          Go to Seat Booking
        </button>
      </div>
    </>
  );
}

const Step1 = () => (
  <>
    <div className="formField">
      <Field type="email" name="emailId" placeholder="Email" />
      <ErrorMessage name="emailId" component="div" className="errorMessage" />
    </div>
    <div className="formField">
      <Field type="password" name="password" placeholder="Password" />
      <ErrorMessage name="password" component="div" className="errorMessage" />
    </div>
  </>
);

const Step2 = () => (
  <>
    <div className="formField">
      <Field type="text" name="firstName" placeholder="First Name" />
      <ErrorMessage name="firstName" component="div" className="errorMessage" />
    </div>
    <div className="formField">
      <Field type="text" name="lastName" placeholder="Last Name" />
      <ErrorMessage name="lastName" component="div" className="errorMessage" />
    </div>
    <div className="formField">
      <Field type="text" name="address" placeholder="Address" />
      <ErrorMessage name="address" component="div" className="errorMessage" />
    </div>
  </>
);

const Step3 = () => (
  <>
    <div className="formField">
      <Field as="select" name="countryCode">
        <option value="+91">India (+91)</option>
        <option value="+1">America (+1)</option>
      </Field>
      <ErrorMessage name="countryCode" component="div" className="errorMessage" />
    </div>
    <div className="formField">
      <Field type="text" name="phoneNumber" placeholder="Phone Number" />
      <ErrorMessage name="phoneNumber" component="div" className="errorMessage" />
    </div>
    <div className="formField">
      <label>
        <Field type="checkbox" name="acceptTermsAndCondition" />
        Accept Terms and Conditions
      </label>
      <ErrorMessage name="acceptTermsAndCondition" component="div" className="errorMessage" />
    </div>
  </>
);
