import Header from "@/components/Header";
import Footer from "@/components/footer";
import React from "react";
import styles from "@/styles/signin.module.scss";
import Link from "next/link";
import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { BiLeftArrowAlt } from "react-icons/bi";
import {
  getCsrfToken,
  getProviders,
  getSession,
  signIn,
  country,
} from "next-auth/react";
import CircledIconBtn from "@/components/buttons/circledIconBtn";
import LoginInput from "@/components/inputs/loginInput";
import DotLoaderSpinner from "@/components/loaders/dotLoader";
import axios from "axios";
import Router from "next/router";

const initialValues = {
  login_email: "",
  login_password: "",
  login_email: "",
  login_password: "",
  name: "",
  email: "",
  password: "",
  conf_password: "",
  success: "",
  error: "",
  login_error: "",
};

export default function signin({ providers, callbackUrl, csrfToken }) {
  const [user, setUser] = useState(initialValues);
  const [signin, setSignin] = useState(true);
  const [signup, setSingup] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    login_email,
    login_password,
    name,
    email,
    password,
    conf_password,
    success,
    error,
    login_error,
  } = user;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const loginValidation = Yup.object({
    login_email: Yup.string()
      .required("Email address is required")
      .email("Please enter a valid email address"),
    login_password: Yup.string().required("Please enter a password"),
  });
  const registerValidation = Yup.object({
    name: Yup.string()
      .required("What's your name ?")
      .min(2, "First name must be between 2 and 16 characters.")
      .max(16, "First name must be between 2 and 16 characters.")
      .matches(/^[aA-zZ]/, "Numbers and special characters are not allowed."),
    email: Yup.string()
      .required(
        "You'll need this when you log in and if you ever need to reset your password."
      )
      .email("Enter a valid email address."),
    password: Yup.string()
      .required(
        "Enter a combination of at least six numbers,letters and special characters(such as ! and &)."
      )
      .min(6, "Password must be atleast 6 characters.")
      .max(36, "Password can't be more than 36 characters"),
    conf_password: Yup.string()
      .required("Confirm your password.")
      .oneOf([Yup.ref("password")], "Passwords don't match."),
  });

  const toggleForm = () => {
    if (signup) {
      setSingup(false);
      setSignin(true);
      scrollTo(0, 0);
    } else if (signin) {
      setSignin(false);
      setSingup(true);
      scrollTo(0, 0);
    }
  };
  const signInHandler = async () => {
    setLoading(true);
    let options = {
      redirect: false,
      email: login_email,
      password: login_password,
    };
    const res = await signIn("credentials", options);
    setUser({ ...user, success: "", error: "" });

    if (res?.error) {
      setLoading(false);
      setUser({ ...user, login_error: res?.error });
      setTimeout(() => {
        setUser({ ...user, success: "" }); // Remove success message after a few seconds
      }, 2000);
    } else {
      setUser({ ...user, error: "", success: "Logged in succesfully" });
      Router.push("/");
      setLoading(false);
    }
  };
  const signUpHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/auth/signup", {
        name,
        email,
        password,
      });

      setUser({ ...user, error: "", success: data.message });

      setTimeout(async () => {
        let options = {
          redirect: false,
          email: email,
          password: password,
        };
        const res = await signIn("credentials", options);
        setLoading(false);
        setUser({ ...user, success: "" });
        Router.push("/");
      }, 10);
    } catch (error) {
      setLoading(false);
      setUser({ ...user, success: "", error: error.response.data.message });
      setTimeout(() => {
        setUser({ ...user, success: "" }); // Remove success message after a few seconds
      }, 2000);
    }
  };
  return (
    <>
      {loading && <DotLoaderSpinner loading={loading} />}
      <Header loading={loading} setLoading={setLoading} />
      <div className="container-fluid">
        <div className="row">
          {signin && (
            <div
              className={`col my-auto  d-flex justify-content-center ${styles.login} ${styles.signin}`}
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
                    initialValues={{
                      login_email,
                      login_password,
                    }}
                    validationSchema={loginValidation}
                    onSubmit={() => {
                      signInHandler();
                    }}
                  >
                    {(form) => (
                      <Form method="post" action="/api/auth/signin/email">
                        <input
                          type="hidden"
                          name="csrfToken"
                          defaultValue={csrfToken}
                        />
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
                        {/* start editing from here */}
                        <CircledIconBtn type="submit" text="Sign in" />
                        {login_error && (
                          <span className={styles.error}>{login_error}</span>
                        )}
                        <div className={styles.forgot}>
                          <Link
                            className="text-decoration-none"
                            href="/auth/forgot"
                          >
                            Forgot password ?
                          </Link>
                        </div>
                      </Form>
                    )}
                  </Formik>
                  <div className={styles.login_socials}>
                    <span className={styles.or}>Or continue with</span>
                    {providers.map((provider) => {
                      if (provider.name === "Credentials") return null;
                      else
                        return (
                          <div
                            key={provider.name}
                            className={styles.login_socials_wrap}
                          >
                            <button
                              className={styles.social_btn}
                              onClick={() => signIn(provider.id)}
                            >
                              <img
                                src={`../../icons/${provider.name}.png`}
                                alt={`login with ${provider.name}`}
                              />
                              Sign in with {provider.name}
                            </button>
                          </div>
                        );
                    })}
                  </div>

                  <div className="d-flex justify-content-center my-4">
                    <span className={styles.login_cont}>
                      Don't have an account?? &nbsp;
                      <span
                        className={styles.login_redirect}
                        onClick={toggleForm}
                      >
                        Sign Up
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
          {signup && (
            <div
              className={`col my-auto d-flex justify-content-center ${styles.login}}`}
            >
              <div className={`p-3  ${styles.login_container}`}>
                <div
                  className={`d-flex align-items-center justify-content-space-between ${styles.login_header}`}
                >
                  <div className={styles.back_svg}>
                    <BiLeftArrowAlt className="text-dark" />
                  </div>
                  <span>
                    Are you a seller! &nbsp;
                    <Link className="text-decoration-none" href="/">
                      Sign up as seller
                    </Link>{" "}
                  </span>
                </div>
                <div className={styles.login_form}>
                  <h1>Sign Up</h1>
                  <p>Our customers, our priority</p>
                  <Formik
                    enableReinitialize
                    initialValues={{
                      name,
                      email,
                      password,
                      conf_password,
                    }}
                    validationSchema={registerValidation}
                    onSubmit={() => {
                      signUpHandler();
                    }}
                  >
                    {(form) => (
                      <Form>
                        <LoginInput
                          type="text"
                          name="name"
                          icon="user"
                          placeholder="Full name"
                          onChange={handleChange}
                        />
                        <LoginInput
                          type="text"
                          name="email"
                          icon="email"
                          placeholder="Email Address"
                          onChange={handleChange}
                        />
                        <LoginInput
                          type="password"
                          name="password"
                          icon="password"
                          placeholder="Password"
                          onChange={handleChange}
                        />
                        <LoginInput
                          type="password"
                          name="conf_password"
                          icon="password"
                          placeholder="retype Password"
                          onChange={handleChange}
                        />
                        {/* start editing from here */}
                        <CircledIconBtn type="submit" text="Sign Up" />
                      </Form>
                    )}
                  </Formik>
                  <div className="d-flex justify-content-center my-4">
                    <span className={styles.login_cont}>
                      Already have an account?? &nbsp;
                      <span
                        className={styles.login_redirect}
                        onClick={toggleForm}
                      >
                        Sign In
                      </span>
                    </span>
                  </div>
                  <div>
                    {success && (
                      <span className={styles.success}>{success}</span>
                    )}
                  </div>
                  <div>
                    {error && <span className={styles.error}>{error}</span>}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

// get auth providers
export async function getServerSideProps(context) {
  const { req, query } = context;

  const session = await getSession({ req });
  const { callbackUrl } = query;

  if (session) {
    return {
      redirect: {
        destination: callbackUrl,
      },
    };
  }
  const csrfToken = await getCsrfToken(context);
  const providers = Object.values(await getProviders());
  return {
    props: {
      providers,
      csrfToken,
      callbackUrl,
    },
  };
}
