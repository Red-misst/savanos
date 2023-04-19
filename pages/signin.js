import Header from "@/components/Header";
import Footer from "@/components/footer";
import React from "react";
import styles from "@/styles/signin.module.scss";
import Link from "next/link";
import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { BiLeftArrowAlt } from "react-icons/bi";
import LoginInput from "@/components/inputs/loginInput";
const initialValues = {
  login_email: "",
  login_password: "",
};

export default function signin() {
  const [user, setUser] = useState(initialValues);
  const { login_email, login_password } = user;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, name: value });
  };
  const loginValidation = Yup.object({
    login_email: Yup.string()
      .required("Email address is required")
      .email("Please enter a valid email address"),
    login_password: Yup.string().required("Please enter a password"),
  });
  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <div
            className={`col-md-6 d-flex justify-content-center ${styles.login}`}
          >
            <div className={`p-3  ${styles.login_container}`}>
              <div
                className={`d-flex align-items-center justify-content-space-between ${styles.login_header}`}
              >
                <div className={styles.back_svg}>
                  <BiLeftArrowAlt className="text-dark" />
                </div>
                <span>
                  Welcome back! &nbsp;
                  <Link className="text-decoration-none" href="/">
                    login as seller
                  </Link>{" "}
                </span>
              </div>
              <div className={styles.login_form}>
                <h1>Sign in</h1>
                <p>Our customers, our priority</p>
                <Formik
                    enableReinitialize
                   initialValues=
                  {{
                    login_email,
                    login_password,
                  }}
                  validationSchema={loginValidation}
                >
              
                  {(form) => (
                    <Form>
                      <LoginInput
                        type="text"
                        name="login_email"
                        icon="email"
                        placeholder="Email Address"
                        onChange={handleChange}
                      />
                      <LoginInput
                        type="password"
                        name="login_password"
                        icon="password"
                        placeholder="Password"
                        onChange={handleChange}
                      />
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
