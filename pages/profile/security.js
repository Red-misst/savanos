import { getSession } from "next-auth/react";
import Head from "next/head";
import Header from "@/components/Header";
import DotLoaderSpinner from "@/components/loaders/dotLoader";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { useState } from "react";
import CircledIconBtn from "@/components/buttons/circledIconBtn";
import LoginInput from "@/components/inputs/loginInput";
import styles from "@/styles/profile.module.scss";
import axios from "axios";
export default function security() {
  const [loading, setLoading] = useState(false);
  const [current_password, setCurrent_password] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState("password");
  const [conf_password, setConf_password] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const validate = Yup.object({
    current_password: Yup.string()
      .required(
        "Enter a combination of at least six numbers,letters and punctuation marks(such as ! and &)."
      )
      .min(6, "Password must be atleast 6 characters.")
      .max(36, "Password can't be more than 36 characters"),
    password: Yup.string()
      .required(
        "Enter a combination of at least six numbers,letters and punctuation marks(such as ! and &)."
      )
      .min(6, "Password must be atleast 6 characters.")
      .max(36, "Password can't be more than 36 characters"),
    conf_password: Yup.string()
      .required("Confirm your password.")
      .oneOf([Yup.ref("password")], "Passwords must match."),
  });
  const changePasswordHanlder = async () => {
    try {
      const { data } = await axios.put("/api/user/changePassword", {
        current_password,
        password,
      });
      setError("");
      setSuccess(data.message);
    } catch (error) {
      setSuccess("");
      setError(error.response.data.message);
    }
  };
  return (
    <>
      {loading && <DotLoaderSpinner loading={loading} />}

      <Head>
        <title>Profile - Security</title>
      </Head>
      <Header setLoading={setLoading} />
      <div className={styles.header}>
        <h1>PASSWORD MANAGER</h1>
      </div>
      <div className={styles.security}>
        <Formik
          enableReinitialize
          initialValues={{
            current_password,
            password,
            conf_password,
          }}
          validationSchema={validate}
          onSubmit={() => {
            changePasswordHanlder();
          }}
        >
          {(form) => (
            <Form>
              <LoginInput
                type={passwordVisible}
                name="current_password"
                icon="password"
                placeholder="Current Password"
                onChange={(e) => setCurrent_password(e.target.value)}
                passwordVisible={passwordVisible}
                setPasswordVisible={setPasswordVisible}
              />
              <LoginInput
                type={passwordVisible}
                name="password"
                icon="password"
                placeholder="New Password"
                onChange={(e) => setPassword(e.target.value)}
                passwordVisible={passwordVisible}
                setPasswordVisible={setPasswordVisible}
              />
              <LoginInput
                type={passwordVisible}
                name="conf_password"
                icon="password"
                placeholder="Confirm Password"
                onChange={(e) => setConf_password(e.target.value)}
                passwordVisible={passwordVisible}
                setPasswordVisible={setPasswordVisible}
              />
              <CircledIconBtn type="submit" text="Change" />
              <br />
              {error && <span className={styles.error}>{error}</span>}
              {success && <span className={styles.success}>{success}</span>}
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const { query, req } = ctx;
  const session = await getSession({ req });

  return {
    props: { user: session },
  };
}
