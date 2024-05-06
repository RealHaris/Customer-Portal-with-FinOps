import * as Yup from "yup";

import { Form, FormFeedback, Input } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { clearAuthResponse, resetPassword } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";

import { helper as $h } from "@/utils";
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
  const inputRefs = useRef([]);

  const { resetPsdLoading, resetPsdError, resetPsdResponse } = useSelector(
    (state) => state.LoginReducer
  );

  useEffect(() => {
    if (resetPsdResponse && resetPsdResponse?.Success == true) {
      // clear the local storage
      localStorage.removeItem("email");
      history("/login");
      dispatch(clearAuthResponse());
    }
  }, [resetPsdResponse]);

  useEffect(() => {
    if (resetPsdError != "") {
      dispatch(clearAuthResponse());
    }
  }, [resetPsdError]);

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: localStorage.getItem("email") || "",
      first: "",
      second: "",
      third: "",
      fourth: "",
      fifth: "",
      sixth: "",
      password: "",
      confirmPassword: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Please Enter Your Email"),
      first: Yup.string().required("Please Enter Your First"),
      second: Yup.string().required("Please Enter Your Second"),
      third: Yup.string().required("Please Enter Your Third"),
      fourth: Yup.string().required("Please Enter Your Fourth"),
      fifth: Yup.string().required("Please Enter Your Fifth"),
      sixth: Yup.string().required("Please Enter Your Sixth"),
      password: Yup.string()
        .required("Please Enter Your Password")
        .min(8, "Password must be at least 8 characters long"),
      confirmPassword: Yup.string()
        .required("Please Enter Your Confirm Password")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
    }),

    onSubmit: (values) => {
      const body = {
        email: values.email,
        password: values.password,
        otp: Number(
          values.first +
            values.second +
            values.third +
            values.fourth +
            values.fifth +
            values.sixth
        ),
      };

      dispatch(resetPassword(body));
    },
  });

  const handleOtpChange = (event, index) => {
    const { value } = event.target;

    // regex that contains all the symbols and symbols except backspace and numbers
    const regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`a-zA-Z]/;

    // if the key pressed is a symbol
    if (regex.test(value)) {
      event.preventDefault();
      return false;
    }

    switch (index) {
      case 0:
        validation.setFieldValue("first", value);

        break;
      case 1:
        validation.setFieldValue("second", value);

        break;
      case 2:
        validation.setFieldValue("third", value);

        break;
      case 3:
        validation.setFieldValue("fourth", value);
        break;
      case 4:
        validation.setFieldValue("fifth", value);
        break;
      case 5:
        validation.setFieldValue("sixth", value);
        break;

      default:
        break;
    }

    if (!$h.isNullObject(value)) {
      if (value.length === 1 && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleOtpKeyUp = (event, index) => {
    const { key } = event;

    // cannot type more than 1 character
    if (event.target.value.length > 1) {
      event.preventDefault();
    }

    if (key === "Backspace" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

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
              <div className="hidden xl:flex flex-col min-h-screen">
                <Link to="#" className="-intro-x flex items-center pt-5">
                  <img alt="Customer Portal" className="" src={logoUrl} style={{width:"14rem"}}/>
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
                    Forgot your password? No problem. <br /> Reset it quickly
                    and securely on our
                    <br />
                    Customer Portal
                  </div>
                </div>
              </div>

              <div className="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0">
                <div className="my-auto mx-auto xl:ml-20 bg-white dark:bg-darkmode-600 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto">
                  <h2 className="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left">
                    Reset Password
                  </h2>
                  <div className="intro-x mt-2 text-slate-400 xl:hidden text-center">
                    Forgot your password? No problem. <br /> Reset it quickly
                    and securely on our Customer Portal
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

                    <div className="intro-x mt-2 text-gray-500 dark:text-gray-500 text-center xl:text-left">
                      Enter 6 digit OTP sent to your email
                    </div>
                    <div className="flex items-center justify-center mt-3">
                      <input
                        type="text"
                        name="first"
                        maxLength="1"
                        className="w-12 h-12 py-1 text-lg font-medium text-center text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={validation.first}
                        // onBlur={handleBlur}
                        onChange={(event) => handleOtpChange(event, 0)}
                        onKeyUp={(event) => handleOtpKeyUp(event, 0)}
                        pattern="[0-9]*"
                        ref={(el) => (inputRefs.current[0] = el)}
                      />
                      <input
                        type="text"
                        name="second"
                        maxLength="1"
                        className="w-12 h-12  py-1 text-lg font-medium text-center text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mx-3"
                        value={validation.second}
                        // onBlur={handleBlur}
                        onChange={(event) => handleOtpChange(event, 1)}
                        onKeyUp={(event) => handleOtpKeyUp(event, 1)}
                        pattern="[0-9]*"
                        ref={(el) => (inputRefs.current[1] = el)}
                      />
                      <input
                        type="text"
                        name="third"
                        maxLength="1"
                        className="w-12 h-12  py-1 text-lg font-medium text-center text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mx-3"
                        value={validation.third}
                        // onBlur={handleBlur}
                        onChange={(event) => handleOtpChange(event, 2)}
                        onKeyUp={(event) => handleOtpKeyUp(event, 2)}
                        pattern="[0-9]*"
                        ref={(el) => (inputRefs.current[2] = el)}
                      />
                      <input
                        type="text"
                        name="fourth"
                        maxLength="1"
                        className="w-12 h-12  py-1 text-lg font-medium text-center text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mx-3"
                        value={validation.fourth}
                        // onBlur={handleBlur}
                        onChange={(event) => handleOtpChange(event, 3)}
                        onKeyUp={(event) => handleOtpKeyUp(event, 3)}
                        pattern="[0-9]*"
                        ref={(el) => (inputRefs.current[3] = el)}
                      />
                      <input
                        type="text"
                        name="fifth"
                        maxLength="1"
                        className="w-12 h-12  py-1 text-lg font-medium text-center text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mx-3"
                        value={validation.fifth}
                        // onBlur={handleBlur}
                        onChange={(event) => handleOtpChange(event, 4)}
                        onKeyUp={(event) => handleOtpKeyUp(event, 4)}
                        pattern="[0-9]*"
                        ref={(el) => (inputRefs.current[4] = el)}
                      />
                      <input
                        type="text"
                        name="sixth"
                        maxLength="1"
                        className="w-12 h-12 py-1 text-lg font-medium text-center text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mx-3"
                        value={validation.sixth}
                        // onBlur={handleBlur}
                        onChange={(event) => handleOtpChange(event, 5)}
                        onKeyUp={(event) => handleOtpKeyUp(event, 5)}
                        pattern="[0-9]*"
                        ref={(el) => (inputRefs.current[5] = el)}
                      />
                    </div>

                    {(validation.touched.first && validation.errors.first) ||
                    (validation.touched.second && validation.errors.second) ||
                    (validation.touched.third && validation.errors.third) ||
                    (validation.touched.fourth && validation.errors.fourth) ||
                    (validation.touched.fifth && validation.errors.fifth) ||
                    (validation.touched.sixth && validation.errors.sixth) ? (
                      <div className="error-message text-center mt-2 mb-2 text-danger">
                        Please Enter the code
                      </div>
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
                      <FormFeedback className="text-danger mt-1" type="invalid">
                        {validation.errors.password}
                      </FormFeedback>
                    ) : null}
                    <Input
                      name="confirmPassword"
                      className="intro-x login__input form-control py-3 px-4 block mt-4"
                      value={validation.values.confirmPassword || ""}
                      type="password"
                      placeholder="Re-Enter Password"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      invalid={
                        validation.touched.confirmPassword &&
                        validation.errors.confirmPassword
                          ? true
                          : false
                      }
                    />
                    {validation.touched.confirmPassword &&
                    validation.errors.confirmPassword ? (
                      <FormFeedback className="text-danger mt-1" type="invalid">
                        {validation.errors.confirmPassword}
                      </FormFeedback>
                    ) : null}
                  </div>

                  <div className="intro-x mt-5 xl:mt-8 text-center xl:text-left">
                    <button
                      className="btn btn-primary py-3 px-4 w-full xl:w-25 xl:mr-3 align-top"
                      type="submit"
                      disabled={resetPsdLoading}
                    >
                      {resetPsdLoading ? (
                        <div className="col-span-6 sm:col-span-3 xl:col-span-2 flex flex-col justify-end items-center mr-2">
                          <LoadingIcon icon="oval" className="w-6 h-6" />
                        </div>
                      ) : null}
                      Reset
                    </button>
                  </div>
                  <div
                    className="intro-x flex text-slate-600 dark:text-slate-500 text-xs sm:text-sm mt-4
                  justify-center 
                  "
                  >
                    <Link id="forgotPassword" to="/forgot-password">
                      Go back to&nbsp;Verify Email
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
