import styles from "./styles.module.scss";
import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import LoginInput from "@/components/inputs/loginInput";

const initialValues = {
  phone_Number: "",
};
export default function Mpesa({ total, order_id }) {
  const [user, setUser] = useState(initialValues);
  const { phone_number } = user;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const phoneValidation = Yup.object({
    phone_number: Yup.string()
      .required("Email address is required")
      .phone("Please enter a valid phone number"),
  });

  const makePayment = async () => {o
 
  o;
    };
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          phone_number,
        }}
        validationSchema={phoneValidation}
        onSubmit={() => {
          makePayment();
        }}
      >
        {(form) => (
          <Form>
            <input type="hidden" name="csrfToken" defaultValue={csrfToken} />
            <LoginInput
              type="text"
              name="phone_number"
              icon="email"
              placeholder="Phone Number"
              onChange={handleChange}
            />

            <CircledIconBtn type="submit" text="Make payment" />
          </Form>
        )}
      </Formik>
    </>
  );
}
