import "toastr/build/toastr.min.css";

import * as Yup from "yup";

import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Litepicker,
  Lucide,
  Modal,
  ModalBody,
  ModalHeader,
  Tippy
} from "@/base-components";
import { addCreditCard, getAvailableCards } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { helper as $h } from "@/utils";
import Select from "react-select";
import toastr from "toastr";
import { useFormik } from "formik";

function Main({ open, setOpen }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if ($h.isNullObject(availableCards)) {
      dispatch(getAvailableCards());
    }
  }, [dispatch]);

  const {
    availableCards,

    creditCardLoading,
    creditCardSuccess
  } = useSelector((state) => state.InvoicesReducer);

  const [availableCardsOptions, setAvailableCardsOptions] = useState([]);

  useEffect(() => {
    if (!$h.isNullObject(availableCards) && availableCards?.length > 0) {
      console.log("availableCards", availableCards);
      const options = availableCards.map((item) => {
        return {
          value: item,
          label: item
        };
      });

      setAvailableCardsOptions(options);
    } else {
      setAvailableCardsOptions([]);
    }
  }, [availableCards]);

  const validationSchema = Yup.object().shape({
    creditCardName: Yup.string().required("Credit Card Name is required"),
    nameOnCard: Yup.string().required("Name of Card is required"),
    creditCardType: Yup.string().required("Credit Card Type is required"),
    creditCardNumber: Yup.string().required("Credit Card Number is required"),
    // expirationDate: Yup.string().required("Expiration Date is required"),
    street: Yup.string().required("Street is required"),
    state: Yup.string().required("State is required"),
    city: Yup.string().required("City is required"),
    country: Yup.string().required("Country is required"),
    zipCode: Yup.string().required("ZipCode is required")
  });

  const initialValues = {
    creditCardName: "",
    nameOnCard: "",
    creditCardType: "",
    creditCardNumber: "",
    expirationDate: "",
    street: "",
    state: "",
    city: "",
    country: "",
    zipCode: ""
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      dispatch(addCreditCard(values));

      // Handle form submission here
      // console.log(values);
      // Clear the form after submission if needed
      // formik.resetForm();
    }
  });

  useEffect(() => {
    if (creditCardSuccess) {
      toastr.success("Credit Card Added Successfully");
      formik.resetForm();
      dispatch(getCreditCardInfo());
      setOpen(false);
    }
  }, [creditCardSuccess]);

  const handleDateChange = (date) => {
    // if date is string, convert it to date object
    if (typeof date === "string") {
      formik.setFieldValue("expirationDate", date);
    } else {
    }
  };

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
          <h2 className="font -medium text-base mr-auto">
            Add Credit Card Detail
          </h2>
        </ModalHeader>
        <ModalBody>
          <form onSubmit={formik.handleSubmit}>
            <div>
              <label htmlFor="regular-form-1" className="form-label">
                Credit Card Name*
              </label>
              <input
                id="regular-form-1"
                type="text"
                className="form-control"
                placeholder="Enter Credit Card Name"
                name="creditCardName"
                value={formik.values.creditCardName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.creditCardName && formik.errors.creditCardName ? (
              <div className="text-red-500 text-sm">
                {formik.errors.creditCardName}
              </div>
            ) : null}
            <div className="mt-3">
              <label htmlFor="regular-form-1" className="form-label">
                Name Of Card*
              </label>
              <input
                id="regular-form-1"
                type="text"
                className="form-control"
                placeholder="Enter Name Of Card"
                name="nameOnCard"
                value={formik.values.nameOnCard}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.nameOnCard && formik.errors.nameOnCard ? (
              <div className="text-red-500 text-sm">
                {formik.errors.nameOnCard}
              </div>
            ) : null}

            <div className="mt-3">
              <label htmlFor="regular-form-1" className="form-label">
                Credit Card Type*
              </label>
              <Select
                className="form-control sm:w-100 mt-2 sm:mt-0"
                placeholder="Credit Card Type"
                name="creditCardType"
                options={availableCardsOptions}
                value={
                  availableCardsOptions.find(
                    (obj) => obj.value === formik.values.creditCardType
                  ) || ""
                }
                onChange={(e) => {
                  formik.setFieldValue("creditCardType", e.value);
                }}
              />
            </div>
            {formik.touched.creditCardType && formik.errors.creditCardType ? (
              <div className="text-red-500 text-sm">
                {formik.errors.creditCardType}
              </div>
            ) : null}

            <div className="mt-3">
              <label htmlFor="regular-form-1" className="form-label">
                Credit card Number*
              </label>
              <input
                id="regular-form-1"
                type="text"
                className="form-control"
                placeholder="Enter Credit Card Number"
                name="creditCardNumber"
                value={formik.values.creditCardNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.creditCardNumber &&
            formik.errors.creditCardNumber ? (
              <div className="text-red-500 text-sm">
                {formik.errors.creditCardNumber}
              </div>
            ) : null}
            <div className="mt-3">
              <label htmlFor="regular-form-1" className="form-label">
                Expiration Date*
              </label>
              <Litepicker
                name="expirationDate"
                value={formik.values.expirationDate}
                onChange={(date) => {
                  handleDateChange(date);
                }}
                options={{
                  autoApply: false,
                  singleMode: true,
                  format: "YYYY-MM-DD",
                  showWeekNumbers: true,
                  dropdowns: {
                    minYear: 1990,
                    maxYear: null,
                    months: true,
                    years: true
                  }
                }}
                className="form-control w-full block mx-auto"
              />
            </div>
            {formik.touched.expirationDate && formik.errors.expirationDate ? (
              <div className="text-red-500 text-sm">
                {formik.errors.expirationDate}
              </div>
            ) : null}
            <div className="mt-3">
              <label htmlFor="regular-form-1" className="form-label">
                Street*
              </label>
              <input
                id="regular-form-1"
                type="text"
                className="form-control"
                placeholder="Enter Street"
                name="street"
                value={formik.values.street}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.street && formik.errors.street ? (
              <div className="text-red-500 text-sm">{formik.errors.street}</div>
            ) : null}
            <div className="mt-3">
              <label htmlFor="regular-form-1" className="form-label">
                State*
              </label>
              <input
                id="regular-form-1"
                type="text"
                className="form-control"
                placeholder="Enter State"
                name="state"
                value={formik.values.state}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.state && formik.errors.state ? (
              <div className="text-red-500 text-sm">{formik.errors.state}</div>
            ) : null}
            <div className="mt-3">
              <label htmlFor="regular-form-1" className="form-label">
                City*
              </label>
              <input
                id="regular-form-1"
                type="text"
                className="form-control"
                placeholder="Enter City"
                name="city"
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.city && formik.errors.city ? (
              <div className="text-red-500 text-sm">{formik.errors.city}</div>
            ) : null}
            <div className="mt-3">
              <label htmlFor="regular-form-1" className="form-label">
                Country*
              </label>
              <input
                id="regular-form-1"
                type="text"
                className="form-control"
                placeholder="Input Number"
                name="country"
                value={formik.values.country}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.country && formik.errors.country ? (
              <div className="text-red-500 text-sm">
                {formik.errors.country}
              </div>
            ) : null}
            <div className="mt-3">
              <label htmlFor="regular-form-1" className="form-label">
                ZipCode*
              </label>
              <input
                id="regular-form-1"
                type="text"
                className="form-control"
                placeholder="Input Number"
                name="zipCode"
                value={formik.values.zipCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.zipCode && formik.errors.zipCode ? (
              <div className="text-red-500 text-sm">
                {formik.errors.zipCode}
              </div>
            ) : null}
            <button className="btn btn-primary mt-5" type="submit">
              Create
            </button>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
}

export default Main;
