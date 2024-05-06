import * as Yup from "yup";

import { Form, FormFeedback, Input } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { clearAuthResponse, verifyEmail } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import DarkModeSwitcher from "@/components/dark-mode-switcher/Main";
import { LoadingIcon } from "@/base-components";
import dom from "@left4code/tw-starter/dist/js/dom";
import illustrationUrl from "@/assets/images/illustration.svg";
import logoUrl from "@/assets/images/kaispe.png";
import { useFormik } from "formik";

const Main = () => {
  const history = useNavigate();

  useEffect(() => {
    dom("body").removeClass("main").removeClass("error-page").addClass("login");
  }, []);

  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const { forgotPsdLoading, forgotPsdError, forgotPsdResponse } = useSelector(
    (state) => state.LoginReducer
  );

  useEffect(() => {
    if (forgotPsdResponse && forgotPsdResponse?.Success == true) {
      localStorage.setItem("email", email);
      history("/reset-password");
      dispatch(clearAuthResponse());
    }
  }, [forgotPsdResponse]);

  useEffect(() => {
    if (forgotPsdError != "") {
      dispatch(clearAuthResponse());
    }
  }, [forgotPsdError]);

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
    }),

    onSubmit: (values) => {
      setEmail(values.email);
      dispatch(verifyEmail(values));
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
                  <img alt="Customer Portal" className="" src={logoUrl} style={{width:"14rem"}}/>
                  {/* <span className="text-white text-lg ml-3">
                    {" "}
                    Customer Portal{" "}
                  </span> */}
                </Link>
                <div className="my-auto">
                  <img
                    alt="Customer Portal"
                    className="-intro-x w-1/2 -mt-16"
                    src={illustrationUrl}
                  />
                  <div className="-intro-x text-white font-medium text-2xl leading-tight mt-10">
                    Verify your email for enhanced security on our <br />
                    Customer Portal
                  </div>
                </div>
              </div>

              <div className="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0">
                <div className="my-auto mx-auto xl:ml-20 bg-white dark:bg-darkmode-600 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto">
                  <h2 className="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left">
                    Verify Your Email
                  </h2>
                  <div className="intro-x mt-2 text-slate-400 xl:hidden text-center">
                    Verify your email for enhanced security on our Customer
                    Portal
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
                      disabled={forgotPsdLoading}
                    />
                    {validation.touched.email && validation.errors.email ? (
                      <FormFeedback className="text-danger" type="invalid">
                        {validation.errors.email}
                      </FormFeedback>
                    ) : null}
                  </div>

                  <div className="intro-x mt-5 xl:mt-8 text-center xl:text-left">
                    <button
                      className="btn btn-primary py-3 px-4 w-full xl:w-25 xl:mr-3 align-top"
                      type="submit"
                      disabled={forgotPsdLoading}
                    >
                      {forgotPsdLoading ? (
                        <div className="col-span-6 sm:col-span-3 xl:col-span-2 flex flex-col justify-end items-center mr-2">
                          <LoadingIcon icon="oval" className="w-6 h-6" />
                        </div>
                      ) : null}
                      Verify
                    </button>
                  </div>

                  <div
                    className="intro-x flex text-slate-600 dark:text-slate-500 text-xs sm:text-sm mt-4
                  justify-center"
                  >
                    <Link id="login" to="/login">
                      Go back to&nbsp;Login
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </>
  );
};

export default Main;
