import * as Yup from "yup";

import { Litepicker, Lucide } from "@/base-components";
import {
  clearCart,
  clearResponseStatus,
  addNewOrderManagement as onAddNewOrderManagement,
  getProductList as onGetProductList
} from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { helper as $h } from "@/utils";
import { AsyncPaginate } from "react-select-async-paginate";
import { LoadingIcon } from "@/base-components";
import Select from "react-select";
import { getProductList as onProductListCall } from "../../helpers/backend_helper";
import toastr from "toastr";
import { useFormik } from "formik";

function Main() {
  const dispatch = useDispatch();

  // const { productList } = useSelector((state) => ({
  //   productList: state.ProductListReducer?.productList
  // }));

  const [getProductList, setProductList] = useState([{}]);

  const { added, error, loadingforAdd, addedResponse } = useSelector(
    (state) => state.OrderManagementReducer
  );

  const [submission, setsubmission] = useState(false);

  const exceptThisSymbols = ["e", "E", "+", "-", "."];

  const [currentPage, setCurrentPage] = useState(1);

  const orderTypeOptions = [
    { value: "Sales Order", label: "Sales Order" },
    { value: "Returned Order", label: "Returned Order" }
  ];

  useEffect(() => {
    if (added === true) {
      console.log("addedResponse", addedResponse);
      toastr.success(
        `Sales Order ${
          addedResponse.SalesId ? addedResponse.SalesId : ""
        } has been added successfully`
      );
      setsubmission(false);
      validation.setValues(validation.initialValues);
      dispatch(clearCart());
      handleClickReset();
      setsubmission(false);
      dispatch(clearResponseStatus());
    } else if (error) {
      toastr.error("Order has not been added");
      dispatch(clearResponseStatus());
    }
  }, [added, error]);

  // useEffect(() => {
  //   var params = `?perPage=10&page=${currentPage}`;
  //   dispatch(onGetProductList(params));
  //   setCurrentPage(currentPage + 1);
  // }, [dispatch]);

  // useEffect(() => {
  //   if (!$h.isNullObject(productList) && productList.ItemsList.length > 0) {
  //     PopulateProducts(productList.ItemsList);
  //   }
  // }, [productList]);

  // const PopulateProducts = (itemsList) => {
  //   const newOptions = itemsList.map((rec) => ({
  //     value: `${rec.ItemId}`,
  //     label: `${rec.ItemName}`,
  //     ItemUnit: `${rec.ItemUnit}`,
  //     ItemTaxGroup: `${rec.ItemTaxGroup}`
  //   }));
  //   // setProductList((prevOptions) => [...prevOptions, ...newOptions]);
  //   setProductList(newOptions);
  // };

  // const loadMoreOptions = async (search, loadedOptions) => {
  //   var params = `?perPage=10&page=${currentPage}`;

  //   const response = await onProductListCall(params);

  //   if (response) {
  //     console.log("response", response);
  //     const { ItemsList } = response;
  //     const newOptions = ItemsList.map((rec) => ({
  //       value: `${rec.ItemId}`,
  //       label: `${rec.ItemName}`,
  //       ItemUnit: `${rec.ItemUnit}`,
  //       ItemTaxGroup: `${rec.ItemTaxGroup}`
  //     }));
  //     setProductList((prevOptions) => [...prevOptions, ...newOptions]);
  //     setCurrentPage(currentPage + 1);
  //   }

  //   return {
  //     options: [...prevOptions, ...newOptions],
  //     hasMore: getProductList.length <= response.TotalRecords
  //   };
  // };

  const [searchQuery, setSearchQuery] = useState("");

  const loadOptions = async (inputValue, loadedOptions, { page }) => {
    // const response = await fetch(`https://your-api.com/items?search=\${inputValue}&page=\${page}`);
    // const responseJSON = await response.json();
    var params = `?perPage=10&page=${page}&searchItem=${inputValue}`;
    const response = await onProductListCall(params);

    setProductList(response.ItemsList);

    return {
      options: response.ItemsList.map((rec) => ({
        value: `${rec.ItemId}`,
        label: `${rec.ItemName}`,
        ItemUnit: `${rec.ItemUnit}`,
        ItemTaxGroup: `${rec.ItemTaxGroup}`
        // ItemName: `${rec.ItemName}`
      })),

      hasMore: response.TotalRecords > page * 10,
      additional: {
        page: page + 1
      }
    };
  };

  const validation = useFormik({
    initialValues: {
      shipping_date: "",
      order_type: "",
      sales_order_lines: [
        {
          ItemId: "",
          SalesQty: "",
          SalesUnit: "",
          ItemTaxGroup: ""
          // ItemName: ""
        }
      ]
    },
    validationSchema: Yup.object().shape({
      shipping_date: Yup.string()
        .required("Shipping Date is required")
        .test("is-after-today", "Shipping Date cannot be after today's date", (value) => {
          if (value) {
            const today = new Date();
            const shippingDate = new Date(value);
            return shippingDate <= today;
          }
          return true;
        }),

      order_type: Yup.string().required("Order Type is required"),
      sales_order_lines: Yup.array().of(
        Yup.object().shape({
          ItemId: Yup.object().shape({
            value: Yup.string().required("Product is required"),
            label: Yup.string().required("Product is required")
          }),

          SalesQty: Yup.string().required("Quantity is required"),
          SalesUnit: Yup.string().required("Unit is required"),
          ItemTaxGroup: Yup.string().required("Tax Group is required")
        })
      )
    }),

    onSubmit: (values) => {
      const body = {
        order_type: values.order_type,
        shipping_date: values.shipping_date,
        sales_order_lines: values.sales_order_lines.map((rec) => ({
          ItemId: rec.ItemId.value,
          SalesQty: rec.SalesQty,
          SalesUnit: rec.SalesUnit,
          ItemTaxGroup: rec.ItemTaxGroup
        }))
      };

      dispatch(onAddNewOrderManagement(body));
    }
  });

  const handleDateChange = (date) => {
    // if date is string, convert it to date object
    if (typeof date === "string") {
      validation.setFieldValue("shipping_date", date);
    } else {
    }
  };

  const addProduct = () => {
    let sales_order_line = {
      ItemId: "",
      SalesUnit: "",
      SalesQty: "",
      ItemTaxGroup: ""
    };
    let products = validation.values.sales_order_lines;
    products.push(sales_order_line);

    validation.setFieldValue("sales_order_lines", products);

    setsubmission(false);
  };

  const handleClickReset = () => {
    validation.setFieldValue("sales_order_lines", [
      {
        ItemId: "",
        SalesUnit: "",
        SalesQty: "",
        ItemTaxGroup: ""
        // ItemName: ""
      }
    ]);
  };

  const onSelectChangeHandle = (rec, index) => {
    console.log("rec", rec);

    // const filterProduct = getProductList.find((val) => val.value == rec.value);

    validation.setFieldValue(`sales_order_lines.${index}.SalesUnit`, rec.ItemUnit);
    validation.setFieldValue(`sales_order_lines.${index}.ItemId`, {
      value: rec.value,
      label: rec.label
    });
    validation.setFieldValue(`sales_order_lines.${index}.ItemTaxGroup`, rec.ItemTaxGroup);

    // validation.setFieldValue(`sales_order_lines.${index}.ItemId`, rec.value);

    // console.log("rec", rec);
    // console.log("filterProduct", filterProduct);

    // validation.setFieldValue(`sales_order_lines.${index}.ItemTaxGroup`, filterProduct.ItemTaxGroup);
  };

  const deleteProduct = (index, rec) => {
    let products = validation.values.sales_order_lines;

    products.splice(index, 1);

    validation.setFieldValue("sales_order_lines", products);
  };

  const getName = (rec) => {
    console.log("getName", rec);
    if (rec.ItemId) {
      let s = getProductList.find((val) => val.value == rec.ItemId);

      return s?.label ? s.label : "";
    } else {
      return "";
    }
  };

  return (
    <>
      <form
        className="form-horizontal"
        onSubmit={(e) => {
          e.preventDefault();
          setsubmission(true);

          console.log("validation", validation);
          validation.handleSubmit();
          return false;
        }}
      >
        <div className="intro-y flex items-center mt-8">
          <h2 className="text-lg font-medium mr-auto">Create Sales Order</h2>
        </div>
        <div className="grid grid-cols-11 gap-x-6 mt-5 pb-20">
          <div className="intro-y col-span-11 2xl:col-span-12">
            <div className="intro-y box p-5">
              <div className="border border-slate-200/60 dark:border-darkmode-400 rounded-md p-5">
                <div className="font-medium text-base flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5">
                  <Lucide icon="ChevronDown" className="w-4 h-4 mr-2" /> Order Header
                </div>
                <div className="mt-5">
                  <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                    <div className="form-label xl:w-64 xl:!mr-10 mt-2">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">Shipping Date</div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full mt-3 xl:mt-0 flex-1">
                      <div className="flex flex-col sm:flex-row">
                        <div className="form-check mr-4 pr-2">
                          <Litepicker
                            name="shipping_date"
                            value={validation.values.shipping_date}
                            onChange={(date) => {
                              handleDateChange(date);
                            }}
                            options={{
                              autoApply: false,
                              showWeekNumbers: true,
                              dropdowns: {
                                minYear: 1990,
                                maxYear: new Date().getFullYear() + 10,
                                months: true,
                                years: true
                              }
                            }}
                            className="form-control w-56 block mx-auto"
                          />
                        </div>
                      </div>
                      {submission && validation.errors.shipping_date && (
                        <div className="text-red-400 mt-2">{validation.errors.shipping_date}</div>
                      )}
                    </div>
                  </div>
                  <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                    <div className="form-label xl:w-64 xl:!mr-10">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">Order Type </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full mt-3 xl:mt-0 flex-1">
                      <div className="flex flex-col sm:flex-row">
                        <div className="form-check">
                          <Select
                            menuPlacement="top"
                            className="form-control sm:w-60 mt-2 sm:mt-0 "
                            placeholder="Order Type"
                            styles={{
                              placeholder: (base) => ({
                                ...base,
                                fontSize: "1em",
                                color: "#A5B2C4",
                                fontWeight: 400
                              })
                            }}
                            name="order_type"
                            value={
                              orderTypeOptions.find(
                                (obj) => obj.value === validation.values.order_type
                              ) || ""
                            }
                            onChange={(e) => {
                              validation.setFieldValue("order_type", e.value);
                            }}
                            options={orderTypeOptions}
                          />
                        </div>
                      </div>
                      {submission && validation.errors.order_type && (
                        <div className="text-red-400 mt-2">{validation.errors.order_type}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="intro-y box p-5 mt-5">
                <div className="border border-slate-200/60 dark:border-darkmode-400 rounded-md p-5">
                  <div className="font-medium text-base flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5">
                    <Lucide icon="ChevronDown" className="w-4 h-4 mr-2" /> Order Line
                  </div>
                  <div className="mt-5">
                    <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                      <div className="form-label xl:w-64 xl:!mr-10">
                        <div className="text-left">
                          <div className="flex items-center">
                            <div className="font-medium">Add Product</div>
                          </div>
                          <div className="leading-relaxed text-slate-500 text-xs mt-3">
                            You can add product by product section where you can find stock and
                            other related information.
                          </div>
                        </div>
                      </div>
                      <div className="w-full mt-3 xl:mt-0 flex-1">
                        <div className="">
                          <table className="table">
                            <thead>
                              <tr>
                                <th className="bg-slate-50 dark:bg-darkmode-800">Name</th>
                                <th className="!px-2 bg-slate-50 dark:bg-darkmode-800 text-slate-500 whitespace-nowrap">
                                  Sales Qty
                                </th>
                                <th className="!px-2 bg-slate-50 dark:bg-darkmode-800 text-slate-500 whitespace-nowrap">
                                  Sales Unit
                                </th>
                                <th className="!px-2 bg-slate-50 dark:bg-darkmode-800 text-slate-500 whitespace-nowrap">
                                  Tax
                                </th>
                                {validation.values.sales_order_lines.length != 1 ? (
                                  <th className="!px-2 bg-slate-50 dark:bg-darkmode-800">Delete</th>
                                ) : null}
                              </tr>
                            </thead>
                            <tbody>
                              {validation.values?.sales_order_lines.map((rec, index) => {
                                return (
                                  <tr key={index}>
                                    <td className="whitespace-nowrap">
                                      {/*<AsyncPaginate
                                        name={`sales_order_lines.${index}.ItemId`}
                                        loadOptions={loadMoreOptions}
                                        value={{
                                          value: `${rec.ItemId}`,
                                          label: `${getName(rec)}`
                                        }}
                                        className="login__input form-control py-2 px-4 block min-w-[20rem] "
                                        onChange={(e) => {
                                          onSelectChangeHandle(e, index);
                                        }}
                                        options={getProductList}
                                      />*/}

                                      <AsyncPaginate
                                        className="form-control py-2 px-4 block min-w-[20rem] "
                                        name={`sales_order_lines.${index}.ItemId`}
                                        value={rec.ItemId}
                                        loadOptions={loadOptions}
                                        // getOptionValue={(option) => option.value}
                                        // getOptionLabel={(option) => option.label}
                                        onChange={(e) => {
                                          onSelectChangeHandle(e, index);
                                        }}
                                        onInputChange={setSearchQuery}
                                        placeholder="Search items"
                                        additional={{
                                          page: 1
                                        }}
                                      />

                                      {submission &&
                                      validation.errors.hasOwnProperty("sales_order_lines") &&
                                      validation.errors.sales_order_lines[index] ? (
                                        <span className="text-red-400">
                                          {validation.errors.sales_order_lines[
                                            index
                                          ].hasOwnProperty("ItemId")
                                            ? validation.errors.sales_order_lines[index].ItemId
                                                .value
                                            : ""}
                                        </span>
                                      ) : null}
                                    </td>
                                    <td className="!px-2">
                                      <input
                                        min="0"
                                        name={`sales_order_lines.${index}.SalesQty`}
                                        type="number"
                                        value={rec.SalesQty}
                                        onKeyDown={(e) =>
                                          exceptThisSymbols.includes(e.key) && e.preventDefault()
                                        }
                                        className=" form-control  min-w-[6rem] my-2"
                                        onChange={validation.handleChange}
                                      />
                                      {submission &&
                                      validation.errors.hasOwnProperty("sales_order_lines") &&
                                      validation.errors.sales_order_lines[index] ? (
                                        <span className="text-red-400">
                                          {validation.errors.sales_order_lines[
                                            index
                                          ].hasOwnProperty("SalesQty")
                                            ? validation.errors.sales_order_lines[index].SalesQty
                                            : ""}
                                        </span>
                                      ) : null}
                                    </td>
                                    <td className="!px-2">
                                      <div className="input-group">
                                        <input
                                          min="0"
                                          type="text"
                                          name={`sales_order_lines.${index}.SalesUnit`}
                                          value={rec.SalesUnit}
                                          disabled
                                          className="form-control min-w-[6rem] my-2"
                                          // onKeyDown={(e) =>
                                          //   exceptThisSymbolsforPrice.includes(e.key) &&
                                          //   e.preventDefault()
                                          // }
                                          placeholder="Sales Unit"
                                          onChange={validation.handleChange}
                                        />
                                      </div>
                                      {submission &&
                                      validation.errors.hasOwnProperty("sales_order_lines") &&
                                      validation.errors.sales_order_lines[index] ? (
                                        <span className="text-red-400">
                                          {validation.errors.sales_order_lines[
                                            index
                                          ].hasOwnProperty("SalesUnit")
                                            ? validation.errors.sales_order_lines[index].SalesUnit
                                            : ""}
                                        </span>
                                      ) : null}
                                    </td>
                                    <td className="!px-2">
                                      <div className="input-group">
                                        <input
                                          name={`sales_order_lines.${index}.ItemTaxGroup`}
                                          value={rec.ItemTaxGroup}
                                          type="text"
                                          disabled
                                          className="form-control min-w-[6rem] my-2"
                                          placeholder="Tax Group"
                                          onChange={validation.handleChange}
                                        />
                                      </div>
                                      {submission &&
                                      validation.errors.hasOwnProperty("sales_order_lines") &&
                                      validation.errors.sales_order_lines[index] ? (
                                        <span className="text-red-400">
                                          {validation.errors.sales_order_lines[
                                            index
                                          ].hasOwnProperty("ItemTaxGroup")
                                            ? validation.errors.sales_order_lines[index]
                                                .ItemTaxGroup
                                            : ""}
                                        </span>
                                      ) : null}
                                    </td>
                                    <td className="!pl-4 text-slate-500">
                                      {validation.values.sales_order_lines.length != 1 ? (
                                        <button
                                          type="button"
                                          onClick={() => {
                                            deleteProduct(index, rec);
                                          }}
                                        >
                                          <Lucide icon="Trash2" className="w-4 h-4" />
                                        </button>
                                      ) : null}
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                        <button
                          type="button"
                          className="btn btn-outline-primary border-dashed w-full mt-4"
                          onClick={() => addProduct()}
                        >
                          <Lucide icon="Plus" className="w-4 h-4 mr-2" /> Add New Product
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/*   <div className="intro-y box p-5 mt-5">
                <div className="border border-slate-200/60 dark:border-darkmode-400 rounded-md p-5">
                  <div className="font-medium text-base flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5">
                    <Lucide icon="ChevronDown" className="w-4 h-4 mr-2" /> Order Details
                  </div>
                  <div className="mt-5">
                    <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                      <div className="w-full mt-3 xl:mt-0 flex-1">
                        <div className="sm:grid grid-cols-4 gap-2">
                          <div className="input-group">
                            <input
                              type="text"
                              name="totalQuantity"
                              className="form-control"
                              disabled
                              value={validation.values.products.reduce((accumulator, object) => {
                                return accumulator + object.quantity;
                              }, 0)}
                              placeholder="Total Qty"
                            />
                            <div className="input-group-text">TOTAL ITEMS</div>
                          </div>
                          <div className="input-group mt-2 sm:mt-0">
                            <input
                              name="totalAmount"
                              disabled
                              type="text"
                              className="form-control"
                              placeholder="Height"
                              value={$h.formatCurrency(
                                validation.values.products.reduce((accumulator, object) => {
                                  return accumulator + object.unit_price * object.quantity;
                                }, 0)
                              )}
                            />
                            <div className="input-group-text">TOTAL AMOUNT</div>
                          </div>
                          <div className="input-group mt-2 sm:mt-0">
                            <input
                              name="vat"
                              disabled
                              type="text"
                              className="form-control"
                              placeholder="Length"
                              value={$h.formatCurrency(
                                (validation.values.products.reduce((accumulator, object) => {
                                  return accumulator + object.unit_price * object.quantity;
                                }, 0) /
                                  100) *
                                  5
                              )}
                            />
                            <div className="input-group-text">VAT 5%</div>
                          </div>
                          <div className="input-group mt-2 sm:mt-0">
                            <input
                              name="grossTotal"
                              type="text"
                              className="form-control"
                              placeholder="Length"
                              disabled
                              value={$h.formatCurrency(
                                validation.values.products.reduce((accumulator, object) => {
                                  return accumulator + object.unit_price * object.quantity;
                                }, 0) +
                                  (validation.values.products.reduce((accumulator, object) => {
                                    return accumulator + object.unit_price * object.quantity;
                                  }, 0) /
                                    100) *
                                    5
                              )}
                            />
                            <div className="input-group-text">GROSS TOTAL</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                                </div>*/}
              <div className="flex justify-end flex-col md:flex-row gap-2 mt-5">
                <button
                  type="button"
                  className="btn py-3 border-slate-300 dark:border-darkmode-400 text-slate-500 w-full md:w-52"
                  disabled={loadingforAdd}
                  onClick={() => {
                    handleClickReset();
                  }}
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="btn py-3 btn-primary w-full md:w-52"
                  disabled={loadingforAdd}
                >
                  {loadingforAdd ? (
                    <div className="col-span-6 sm:col-span-3 xl:col-span-2 flex flex-col justify-end items-center mr-2">
                      <LoadingIcon icon="oval" className="w-6 h-6" />
                    </div>
                  ) : null}
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default Main;
