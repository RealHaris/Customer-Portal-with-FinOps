import * as Yup from "yup";

import { Fragment, useEffect, useState } from "react";
import { changePassword, clearAuthResponse } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";

import { helper as $h } from "@/utils";
import { LoadingIcon } from "@/base-components";
import { Lucide } from "@/base-components";
import classnames from "classnames";
import { useFormik } from "formik";

function Main() {
  const dispatch = useDispatch();
  const [submit, setSubmit] = useState(false);
  const [activeTab, setActiveTab] = useState("changePassword");
  const [updateEnabled, setUpdateEnabled] = useState(false);

  const { changePsdLoading, changePsdResponse, changePsdError } = useSelector(
    (state) => state.LoginReducer
  );

  useEffect(() => {
    console.log("changePsdResponse", changePsdResponse);
    if (changePsdResponse === true) {
      console.log("changePsdResponse-inSIDE", changePsdResponse);

      setSubmit(false);
      setUpdateEnabled(false);
      // clear form
      setValues({
        newPassword: "",
        confirmPassword: "",
        oldPassword: ""
      });
    }
    dispatch(clearAuthResponse());
  }, [changePsdResponse]);

  //   useEffect(() => {
  //     if (updated || shippingInfoDeleted) {
  //       dispatch(getSpecificUser(`/${user._id}`));
  //       dispatch(clearShippingInfo());
  //       setUpdateEnabled(false);
  //       setSubmit(false);
  //     } else if (error) {
  //       setSubmit(false);
  //       setUpdateEnabled(false);
  //     }
  //   }, [updated, loading, error]);

  const initalValues = {
    newPassword: "",
    confirmPassword: "",
    oldPassword: ""
  };

  const validationSchema = Yup.object().shape({
    // at least 8 characters long
    newPassword: Yup.string()
      .required("Required")
      .min(8, "Password must be at least 8 characters long"),
    confirmPassword: Yup.string()
      .required("Required")
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
    oldPassword: Yup.string().required("Required")
  });

  const { values, errors, handleSubmit, handleChange, handleBlur, setFieldValue, setValues } =
    useFormik({
      initialValues: initalValues,
      validationSchema: validationSchema,
      onSubmit: (values) => {
        // console.log(values);

        // setSubmit(false);

        const body1 = {
          oldPassword: values.oldPassword,
          newPassword: values.newPassword
        };

        dispatch(changePassword(body1));

        // const body = {
        //   name: values.name,
        //   phoneNumber: values.phoneNumber,
        //   mainAddress: values.mainAddress
        // };

        // dispatch(
        //   updateUser({
        //     code: user._id,
        //     data: body
        //   })
        // );
        // dispatch(updateUser(values));
      }
    });

  //   useEffect(() => {
  //     const urlParams = new URLSearchParams(window.location.search);
  //     const id = urlParams.get("id");
  //     if (id) {
  //       if ($h.isNullObject(user) || user._id !== id) {
  //         dispatch(getSpecificUser(`/${id}`));
  //       }
  //     }
  //   }, [dispatch]);

  //   useEffect(() => {
  //     if (!$h.isNullObject(user)) {
  //       setValues({
  //         name: user?.name || "",
  //         email: user?.email || "",
  //         userId: user?.userId || "",
  //         company_name: user?.company_name || "",
  //         phoneNumber: user?.phoneNumber || "",
  //         mainAddress: user?.mainAddress || ""
  //       });
  //     }
  //   }, [user]);

  return (
    <Fragment>
      <div className="intro-y flex items-center mt-8">
        <h2 className="text-lg font-medium mr-auto">PROFILE</h2>
      </div>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-4 2xl:col-span-3 flex lg:block flex-col-reverse">
          <div className="intro-y box mt-5">
            <div className="relative flex items-center p-5">
              <div className="ml-4 mr-auto">
                <div className="font-medium text-base">
                  {$h.getLocalStorageData("CustomerName")}
                </div>
                <div className="text-slate-500">{$h.getTokenData().email}</div>
              </div>
            </div>
            <div className="p-5 border-t border-slate-200/60 dark:border-darkmode-400">
              <div
                className={classnames({
                  "cursor-pointer flex items-center mt-5": true,
                  "text-primary font-medium": activeTab == "changePassword"
                })}
                onClick={() => setActiveTab("changePassword")}
              >
                <Lucide icon="Lock" className="w-4 h-4 mr-2" /> Change Password
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-8 2xl:col-span-9">
          {activeTab === "changePassword" ? (
            <div className="intro-y box mt-5">
              <form
                className="form form-vertical"
                onSubmit={(e) => {
                  e.preventDefault();

                  setSubmit(true);
                  handleSubmit();
                }}
              >
                <div className="flex items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
                  <h2 className="font-medium text-base mr-auto">Change Password</h2>
                </div>
                <div className="p-5">
                  <div className="flex xl:flex-row flex-col">
                    <div className="flex-1 mt-2 xl:mt-0">
                      {!updateEnabled ? (
                        <div className="grid grid-cols-12 gap-x-5">
                          <div className="col-span-12 xl:col-span-6">
                            <div className="mt-3 xl:mt-0">
                              <label htmlFor="update-profile-form-10" className="form-label">
                                Current Password
                              </label>
                              <input
                                id="update-profile-form-10"
                                type="text"
                                className="form-control"
                                placeholder="***********"
                                disabled
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="grid grid-cols-12 gap-x-5 ">
                            <div className="col-span-12 xl:col-span-6">
                              <div className="mt-3 xl:mt-0">
                                <label htmlFor="update-profile-form-10" className="form-label">
                                  Enter Old Password
                                </label>
                                <input
                                  id="update-profile-form-10"
                                  type="password"
                                  className="form-control"
                                  placeholder="Enter Old Password"
                                  value={values.oldPassword}
                                  name="oldPassword"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                                {submit && errors.oldPassword && (
                                  <div className="text-danger mt-2">{errors.oldPassword}</div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="grid grid-cols-12 gap-x-5 mt-2">
                            <div className="col-span-12 xl:col-span-6">
                              <div className="mt-3 xl:mt-0">
                                <label htmlFor="update-profile-form-10" className="form-label">
                                  New Password
                                </label>
                                <input
                                  id="update-profile-form-10"
                                  type="password"
                                  className="form-control"
                                  placeholder="Enter New Password"
                                  value={values.newPassword}
                                  name="newPassword"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                                {submit && errors.newPassword && (
                                  <div className="text-danger mt-2">{errors.newPassword}</div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="grid grid-cols-12 gap-x-5 mt-2">
                            <div className="col-span-12 xl:col-span-6">
                              <div className="mt-3 xl:mt-0">
                                <label htmlFor="update-profile-form-10" className="form-label">
                                  Confirm New Password
                                </label>
                                <input
                                  id="update-profile-form-10"
                                  type="password"
                                  className="form-control"
                                  placeholder="Re-enter New Password"
                                  value={values.confirmPassword}
                                  name="confirmPassword"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                                {submit && errors.confirmPassword && (
                                  <div className="text-danger mt-2">{errors.confirmPassword}</div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex justify-end mt-8">
                        {updateEnabled ? (
                          <div className="flex">
                            <button
                              type="submit"
                              className="btn btn-primary flex items-center"
                              disabled={changePsdLoading}
                            >
                              {changePsdLoading ? (
                                <div className="col-span-6 sm:col-span-3 xl:col-span-2 flex flex-col justify-end items-center mr-2">
                                  <LoadingIcon icon="oval" className="w-6 h-6" />
                                </div>
                              ) : null}
                              Update & Save
                            </button>
                            <button
                              type="button"
                              className="btn btn-secondary w-full sm:w-16 mt-2 sm:mt-0 ml-3"
                              disabled={changePsdLoading}
                              onClick={() => {
                                setUpdateEnabled(false);
                                setValues({
                                  newPassword: "",
                                  confirmPassword: "",
                                  oldPassword: ""
                                });
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            className="flex items-center btn btn-primary"
                            onClick={() => {
                              setSubmit(false);
                              setUpdateEnabled(true);
                            }}
                          >
                            Change Password
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          ) : null}
        </div>
      </div>
    </Fragment>
  );
}

export default Main;
