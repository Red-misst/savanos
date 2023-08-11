import styles from "./styles.module.scss";
import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MpesaInput from "@/components/inputs/mpesaInput";
import MpesaBtn from "@/components/buttons/mpesaBtn";
import axios from "axios";

const initialValues = {
  phone_Number: "",
};

export default function Mpesa({ orderData }) {
  const [user, setUser] = useState(initialValues);
  const { phone_number } = user;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const phoneValidation = Yup.object({
    phone_number: Yup.string().required("Please enter phone number"),
  });

  const makePayment = async () => {
    try {
      const apiUrl = "/api/mpesa-payment"; // Replace with the actual API endpoint

      const payload = {
        orderData,
        phone_number,
      };

      const response = await axios.post(apiUrl, payload);
       // Handle the response as needed
    } catch (error) {
      console.error("Error:", error);
    }
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
            <MpesaInput
              type="text"
              name="phone_number"
              placeholder="Phone Number"
              onChange={handleChange}
            />
            <MpesaBtn type="submit" text="Make Payment" />
          </Form>
        )}
      </Formik>
    </>
  );
}
