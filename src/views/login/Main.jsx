import * as Yup from "yup";

import { Alert, Form, FormFeedback, Input } from "reactstrap";
import {
  Link,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import DarkModeSwitcher from "@/components/dark-mode-switcher/Main";
import { LoadingIcon } from "@/base-components";
import { loginUser as PostLogin } from "../../store/actions";
import dom from "@left4code/tw-starter/dist/js/dom";
import illustrationUrl from "@/assets/images/illustration.svg";
import logoUrl from "@/assets/images/kaispe.png";
import { useFormik } from "formik";

const Login = (props) => {
  const history = useNavigate();

  const { loading } = useSelector((state) => state.LoginReducer);

  useEffect(() => {
    dom("body").removeClass("main").removeClass("error-page").addClass("login");
  }, []);

  const dispatch = useDispatch();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      password: Yup.string().required("Please Enter Your Password"),
    }),

    onSubmit: (values) => {
      dispatch(PostLogin(values, history));
    },
  });

  return (
    <>
      <Form
        className="form-horizontal"
        onSubmit={(e) => {
          e.preventDefault();
          validation.handleSubmit();
          return false;
        }}
      >
        <div>
          <DarkModeSwitcher />

          <div className="container sm:px-10">
            <div className="block xl:grid grid-cols-2 gap-4">
              {/* BEGIN: Login Info */}
              <div className="hidden xl:flex flex-col min-h-screen">
                <Link to="#" className="-intro-x flex items-center pt-5">
                  <img alt="Customer Portal" className="" src={logoUrl} style={{width:"14rem"}} />
                  {/* <span className="text-white text-lg ml-3">
                    Customer Portal
                  </span> */}
                </Link>
                <div className="my-auto">
                  <img
                    alt="Customer Portal"
                    className="-intro-x w-1/2 -mt-16"
                    src={illustrationUrl}
                  />
                  <div className="-intro-x text-white font-medium text-2xl leading-tight mt-10">
                    Seamless access. Secure login.
                    <br />
                    Your personalized solutions await in our <br /> Customer
                    Portal.
                  </div>
                </div>
              </div>
              {/* END: Login Info */}
              {/* BEGIN: Login Form */}

              <div className="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0">
                <div className="my-auto mx-auto xl:ml-20 bg-white dark:bg-darkmode-600 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto">
                  <h2 className="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left">
                    Sign In
                  </h2>
                  <div className="intro-x mt-2 text-slate-400 xl:hidden text-center">
                    Seamless access. Secure login. Your personalized solutions
                    await in our Customer Portal.
                  </div>

                  <div className="intro-x mt-8">
                    <Input
                      name="email"
                      className="intro-x login__input form-control py-3 px-4 block"
                      placeholder="Enter email"
                      type="email"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.email || ""}
                      invalid={
                        validation.touched.email && validation.errors.email
                          ? true
                          : false
                      }
                    />
                    {validation.touched.email && validation.errors.email ? (
                      <FormFeedback className="text-danger" type="invalid">
                        {validation.errors.email}
                      </FormFeedback>
                    ) : null}
                    <Input
                      name="password"
                      className="intro-x login__input form-control py-3 px-4 block mt-4"
                      value={validation.values.password || ""}
                      type="password"
                      placeholder="Enter Password"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      invalid={
                        validation.touched.password &&
                        validation.errors.password
                          ? true
                          : false
                      }
                    />
                    {validation.touched.password &&
                    validation.errors.password ? (
                      <FormFeedback className="text-danger" type="invalid">
                        {validation.errors.password}
                      </FormFeedback>
                    ) : null}
                  </div>
                  <div
                    className="intro-x flex text-slate-600 dark:text-slate-500 text-xs sm:text-sm mt-4
                  justify-end 
                  "
                  >
                    <Link id="forgotPassword" to="/forgot-password">
                      Forgot Password?
                    </Link>
                  </div>
                  {/* <div className="intro-x mt-5 xl:mt-8 text-center xl:text-left">*/}
                  <div className="intro-x mt-5 xl:mt-8 text-center xl:text-left">
                    <button
                      className="btn btn-primary py-3 px-4 w-full xl:w-25 xl:mr-3 align-top"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? (
                        <div className="col-span-6 sm:col-span-3 xl:col-span-2 flex flex-col justify-end items-center mr-2">
                          <LoadingIcon icon="oval" className="w-6 h-6" />
                        </div>
                      ) : null}
                      Sign In
                    </button>
                  </div>

                  {/*  <button className="btn btn-outline-secondary py-3 px-4 w-full xl:w-32 mt-3 xl:mt-0 align-top">
                        Register
                </button>*/}

                  {/*<div className="intro-x mt-10 xl:mt-24 text-slate-600 dark:text-slate-500 text-center xl:text-left">
                    By signin up, you agree to our{"  "}
                    <Link
                      id="TermsAndConditions"
                      className="text-primary dark:text-slate-200"
                      to="#"
                    >
                      Terms and Conditions{" "}
                    </Link>
                    &
                    <Link className="text-primary dark:text-slate-200" to="#">
                      {"  "}
                      Privacy Policy
                    </Link>
              </div>*/}
                </div>
              </div>

              {/* END: Login Form */}
            </div>
          </div>
        </div>
      </Form>
    </>
  );
};

export default Login;
