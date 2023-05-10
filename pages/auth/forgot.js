import styles from "@/styles/forgot.module.scss";
import Header from "@/components/Header";
import Footer from "@/components/footer";
import { BiLeftArrowAlt } from "react-icons/bi";
import CircledIconBtn from "@/components/buttons/circledIconBtn";
import LoginInput from "@/components/inputs copy/loginInput";
import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import DotLoaderSpinner from "@/components/loaders/dotLoader";
import axios from "axios";
import { getSession } from "next-auth/react";
export default function forgot() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState("");
  const emailValidation = Yup.object({
    email: Yup.string()
      .required(
        "Please enter a valid email address."
      )
      .email("Enter a valid email address."),
  });
  const forgotHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/auth/forgot", {
        email,
      });
      setError("");
      setSuccess(data.message);
      setLoading(false);
      setEmail("");
    } catch (error) {
      setLoading(false);
      setSuccess("");
      setError(error.response.data.message);
    }
  };
  return (
    <>
      {loading && <DotLoaderSpinner loading={loading} />}
      <Header />

  
          <div className= {styles.forgot}>
            <div>
              <div className={styles.forgot__header}>
                <div className={styles.back__svg}>
                  <BiLeftArrowAlt />
                </div>
                <span>
                  Forgot your password ?{" "}
                  <Link className="text-decoration-none" href="/signin">
                    Login instead
                  </Link>
                </span>
              </div>
              <div className="row">
                <div className="col mx-2">
                  <p className="text-secondary w-75 my-auto">
                    A reset link will be sent to your email if it is registered
                    with us
                  </p>
                </div>
              </div>
              <Formik
                enableReinitialize
                initialValues={{
                  email,
                }}
                validationSchema={emailValidation}
                onSubmit={() => {
                  forgotHandler();
                }}
              >
                {(form) => (
                  <Form>
                    <LoginInput
                      type="text"
                      name="email"
                      icon="email"
                      placeholder="Email Address"
                      onChange={(e) => setEmail(e.target.value)}
                    />

                    <CircledIconBtn type="submit" text="Send link" />
                    <div style={{ marginTop: "10px" }}>
                      {error && <span className={styles.error}>{error}</span>}
                      {success && (
                        <span className={styles.success}>{success}</span>
                      )}
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
      <Footer />
    </>
  );
}
