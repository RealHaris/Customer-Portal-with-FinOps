import "toastr/build/toastr.min.css";

import * as Yup from "yup";

import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Lucide,
  Modal,
  ModalBody,
  ModalHeader,
  Tippy
} from "@/base-components";
import { addBankAccount, getBankAccountInfo } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { LoadingIcon } from "@/base-components";
import Select from "react-select";
import toastr from "toastr";
import { useFormik } from "formik";

function Main({ open, setOpen }) {
  const dispatch = useDispatch();
  const initialValues = {
    bankName: "",
    bankAccountNum: "",
    bankType: "",
    routingNum: ""
  };

  const validationSchema = Yup.object({
    bankName: Yup.string().required("Bank Name is required"),
    bankAccountNum: Yup.string().required("Account Number is required"),
    bankType: Yup.string().required("Bank Type is required"),
    routingNum: Yup.string().required("Routing Number is required")
  });

  const { bankAccountLoading, bankAccountSuccess } = useSelector(
    (state) => state.InvoicesReducer
  );

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      // getBankAccountInfo();
      // Handle form submission here
      dispatch(addBankAccount(values));
      // addBankAccount(values);
      // console.log("Form submitted with values: ", values);
      // resetForm();
    }
  });

  useEffect(() => {
    if (bankAccountSuccess) {
      toastr.success("Bank Account Added Successfully");

      formik.resetForm();

      dispatch(getBankAccountInfo());
      setOpen(false);
    }
  }, [bankAccountSuccess]);

  const bankTypeOptions = [
    { value: "Personal", label: "Personal" },
    { value: "Business", label: "Business" }
  ];

  return (
    <>
      <Modal
        slideOver={true}
        show={open}
        onHidden={() => {
          setOpen(false);
        }}
      >
        <ModalHeader className="p-5">
          <h2 className="font -medium text-base mr-auto">Add Bank Detail </h2>
        </ModalHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            formik.handleSubmit();
          }}
        >
          <ModalBody>
            <div>
              <label htmlFor="regular-form-1" className="form-label">
                Bank Name*
              </label>
              <input
                id="regular-form-1"
                type="text"
                className="form-control"
                placeholder="Enter Bank Name"
                name="bankName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
            </div>
            {formik.touched.bankName && formik.errors.bankName ? (
              <div className="text-red-600 mt-2">{formik.errors.bankName}</div>
            ) : null}
            <div className="mt-3">
              <label htmlFor="regular-form-1" className="form-label">
                Bank Account Number*
              </label>
              <input
                id="regular-form-1"
                type="text"
                className="form-control"
                placeholder="Enter Account Number"
                name="bankAccountNum"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
            </div>
            {formik.touched.bankAccountNum && formik.errors.bankAccountNum ? (
              <div className="text-red-600 mt-2">
                {formik.errors.bankAccountNum}
              </div>
            ) : null}
            <div className="mt-3">
              <label htmlFor="regular-form-1" className="form-label">
                Bank Type*
              </label>
              <Select
                // menuPlacement="top"
                className="form-control sm:w-100 mt-2 sm:mt-0 "
                placeholder="Bank Type"
                name="bankType"
                options={bankTypeOptions}
                value={bankTypeOptions.find(
                  (obj) => obj.value === formik.values.bankType
                )}
                onChange={(e) => {
                  formik.setFieldValue("bankType", e.value);
                }}
              />
            </div>
            {formik.touched.bankType && formik.errors.bankType ? (
              <div className="text-red-600 mt-2">{formik.errors.bankType}</div>
            ) : null}
            <div className="mt-3">
              <label htmlFor="regular-form-1" className="form-label">
                Routing Number *
              </label>
              <input
                id="regular-form-1"
                type="text"
                className="form-control"
                placeholder="Enter Routing Number"
                name="routingNum"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
            </div>
            {formik.touched.routingNum && formik.errors.routingNum ? (
              <div className="text-red-600 mt-2">
                {formik.errors.routingNum}
              </div>
            ) : null}
            <button
              className="btn btn-primary mt-5"
              type="submit"
              disabled={bankAccountLoading}
            >
              {bankAccountLoading ? (
                <div className="col-span-6 sm:col-span-3 xl:col-span-2 flex flex-col justify-end items-center mr-2">
                  <LoadingIcon icon="oval" className="w-6 h-6" />
                </div>
              ) : null}
              Create
            </button>
          </ModalBody>
        </form>
      </Modal>
    </>
  );
}

export default Main;
