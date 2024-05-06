import * as $_ from "lodash";

import {
  helper as $h,
  ConstructJSON as JsonData,
  keyValue as kv,
} from "@/utils";
import { Fragment, useEffect, useRef, useState } from "react";
import {
  Litepicker,
  LoadingIcon,
  Lucide,
  Modal,
  ModalBody,
  ModalHeader,
} from "@/base-components";
import {
  getAllOrders,
  getOrderDetails as onGetOrderDetails,
  getOrderManagement as onGetOrderManagement,
} from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";

import Select from "react-select";
import classnames from "classnames";
import moment from "moment";
import { useReactToPrint } from "react-to-print";

function Main() {
  const dispatch = useDispatch();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  // function InitialDateRange() {
  //   var date = new Date();
  //   // last 20 days date
  //   var startDate = moment(date).subtract(20, "days").format("YYYY-MM-DD");
  //   // todays date
  //   var endDate = moment(new Date()).format("YYYY-MM-DD");
  //   return `${startDate} - ${endDate}`;
  // }

  const { orderManagement } = useSelector((state) => ({
    orderManagement: state.OrderManagementReducer?.orderManagements,
  }));

  const { loading } = useSelector((state) => ({
    loading: state.OrderManagementReducer?.loading,
  }));

  const { orderDetails } = useSelector((state) => ({
    orderDetails: state.OrderManagementReducer?.orderDetailsState,
  }));

  const [basicSlideOverPreview, setBasicSlideOverPreview] = useState(false);

  const [getOrderDetails, setOrderDetails] = useState([]);
  const [getCurrentOrderId, setCurrentOrderId] = useState({
    value: "",
    event: false,
  });
  const [getDateRange, setDateRange] = useState("");
  const [getSalesId, setSalesId] = useState("");
  const [getInvoiceNumber, setInvoiceNumber] = useState("");
  const [getCurrentPage, setCurrentPage] = useState(1);

  const [getPerPage, setPerPage] = useState({ value: 10, label: "10" });

  useEffect(() => {
    let param = `?perPage=${getPerPage.value}&page=${getCurrentPage}`;
    param += getSalesId !== "" ? `&salesId=${getSalesId}` : "";
    param += getInvoiceNumber !== "" ? `&invoiceId=${getInvoiceNumber}` : "";
    param += getDateRange !== "" ? `&dateRange=${getDateRange}` : "";

    dispatch(onGetOrderManagement(param));
  }, [dispatch, getCurrentPage]);

  const handleFilterFunction = () => {
    let param = `?perPage=${getPerPage.value}&page=1`;
    param += getSalesId !== "" ? `&salesId=${getSalesId}` : "";
    param += getInvoiceNumber !== "" ? `&invoiceId=${getInvoiceNumber}` : "";
    param += getDateRange !== "" ? `&dateRange=${getDateRange}` : "";
    if (getCurrentPage !== 1) {
      setCurrentPage(1);
    } else {
      dispatch(onGetOrderManagement(param));
    }
  };

  const handleResetFilter = () => {
    let param = `?perPage=${getPerPage.value}&page=1`;

    setSalesId("");
    setInvoiceNumber("");
    setDateRange("");

    if (getCurrentPage !== 1) {
      setCurrentPage(1);
    } else {
      dispatch(onGetOrderManagement(param));
    }
  };

  const onSelectPerPage = (e) => {
    setPerPage({ value: `${e.value}`, label: `${e.value}` });

    let param = `?perPage=${e.value}&page=1`;

    param += getSalesId !== "" ? `&salesId=${getSalesId}` : "";
    param += getInvoiceNumber !== "" ? `&invoiceId=${getInvoiceNumber}` : "";
    param += getDateRange !== "" ? `&dateRange=${getDateRange}` : "";

    if (getCurrentPage !== 1) {
      setCurrentPage(1);
    } else {
      dispatch(onGetOrderManagement(param));
    }
  };

  useEffect(() => {
    if (getCurrentOrderId.event) {
      let param = `${getCurrentOrderId.value}`;
      dispatch(onGetOrderDetails(param));
      setCurrentOrderId({ value: "", event: false });
    }
    setOrderDetails(orderDetails);
  }, [getCurrentOrderId.event, getOrderDetails]);

  return (
    <>
      <h2 className="intro-y text-lg font-medium mt-10">Order Management</h2>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="intro-y col-span-12 flex flex-wrap xl:flex-nowrap items-center mt-2">
          <div className="flex w-full sm:w-auto">
            <div className="w-48 relative text-slate-500 ">
              <input
                type="text"
                className="form-control w-48 box pr-10 "
                placeholder="Search By Sales Order... "
                value={getSalesId}
                onChange={(e) => {
                  setSalesId(e.target.value);
                }}
              />
              <Lucide
                icon="Search"
                className="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0"
              />
            </div>
            <div className="w-48 relative text-slate-500 ml-5">
              <input
                type="text"
                className="form-control w-48 box pr-10 "
                placeholder="Search By Invoice #"
                value={getInvoiceNumber}
                onChange={(e) => {
                  setInvoiceNumber(e.target.value);
                }}
              />
              <Lucide
                icon="Search"
                className="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0"
              />
            </div>
            <div className=" relative text-slate-500 box ml-5">
              <Litepicker
                placeholder="Delivery Date"
                onChange={setDateRange}
                value={getDateRange}
                options={{
                  autoApply: false,
                  showWeekNumbers: true,
                  dropdowns: {
                    minYear: 1990,
                    maxYear: null,
                    months: true,
                    years: true,
                  },
                }}
                className="form-control w-40 block mx-auto"
              />
            </div>
            {/* <label className="text-slate-500 ml-5 mt-2">Status</label>
            <Select
              className="form-control sm:w-50 mt-2 sm:mt-0 ml-5"
              placeholder="Sales Order Status"
              styles={{
                placeholder: (base) => ({
                  ...base,
                  fontSize: "1em",
                  color: "#A5B2C4",
                  fontWeight: 400,
                }),
              }}
              value={getStatus}
              onChange={(e) => {
                setStatus(e);
              }}
              options={kv.optionsOrderStatus}
            />*/}
            <button
              className="btn btn-primary shadow-md mr-2 ml-5"
              onClick={() => handleFilterFunction()}
            >
              <Lucide icon="Filter" className="w-4 h-4 mr-2" /> Filter
            </button>
            <button
              id="tabulator-html-filter-reset"
              type="button"
              className="btn btn-secondary w-full sm:w-16 mt-2 sm:mt-0 ml-3"
              onClick={() => handleResetFilter()}
            >
              Reset
            </button>
          </div>
          <div className="hidden xl:block mx-auto text-slate-500">
            Showing{" "}
            {getCurrentPage > 1
              ? getPerPage.value * (getCurrentPage - 1) + 1
              : 1}{" "}
            to{" "}
            {orderManagement?.TotalRecords < getPerPage.value * getCurrentPage
              ? orderManagement?.TotalRecords
              : getPerPage.value * getCurrentPage}{" "}
            of {orderManagement?.TotalRecords} entries
          </div>
        </div>

        <div className="intro-y col-span-12 overflow-auto 2xl:overflow-visible">
          <table className="table table-report -mt-2">
            <thead>
              <tr>
                <th className="whitespace-nowrap">SALES ORDER</th>
                <th className="text-center whitespace-nowrap">INVOICE #</th>
                <th className="text-center whitespace-nowrap">JOB NAME</th>
                <th className="text-center whitespace-nowrap">
                  SALES ORDER STATUS
                </th>
                <th className="text-center whitespace-nowrap">
                  ORDER CREATED DATE
                </th>
                <th className="text-center whitespace-nowrap">TOTAL AMOUNT</th>
                <th className="text-center whitespace-nowrap">DELIVERY DATE</th>
              </tr>
            </thead>
            <tbody>
              {orderManagement?.SalesOrdersList &&
                orderManagement?.SalesOrdersList.length > 0 &&
                $_.take(
                  orderManagement?.SalesOrdersList,
                  orderManagement?.SalesOrdersList.length
                ).map((value, index) => (
                  <tr key={index} className="intro-x">
                    <td className="w-40 !py-4">
                      <div
                        className="underline decoration-dotted whitespace-nowrap"
                        onClick={() => {
                          setBasicSlideOverPreview(true);
                          setCurrentOrderId({
                            value: `${value.SalesId}`,
                            event: true,
                          });
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        {value.SalesId}
                      </div>
                    </td>

                    <td className="text-center">{value.InvoiceNumber}</td>

                    <td className="text-center">
                      {value.JobName ? value.JobName : "N/A"}
                    </td>

                    <td className="text-center">
                      <div
                        className={classnames({
                          "flex items-center justify-center whitespace-nowrap": true,
                          "text-green-700": value.SalesStatus == "Invoiced",
                          "text-success": value.SalesStatus == "Delivered",
                          "text-danger": value.SalesStatus == "Cancelled",
                          "text-primary": value.SalesStatus == "Open order",
                        })}
                      >
                        {$h.capitalizeFirstLetter(value.SalesStatus)}
                      </div>
                    </td>
                    <td className="text-center">
                      <div className="whitespace-nowrap text-xs">
                        {moment(
                          value.OrderCreated,
                          "MM/DD/YYYY HH:mm:ss"
                        ).format("YYYY-MM-DD")}
                      </div>
                    </td>
                    {/* <td className="w-40 text-center">
                      <div className="">{value.SalesQty}</div>
                      </td>*/}
                    <td className="w-40 text-center">
                      <div className="">
                        {$h.formatCurrency(value.TotalAmount)}
                      </div>
                    </td>
                    <td className="text-center">
                      <div className="whitespace-nowrap text-xs">
                        {moment(
                          value.DeliveryDate,
                          "MM/DD/YYYY HH:mm:ss"
                        ).format("YYYY-MM-DD")}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {!$h.isNullObject(orderManagement) &&
        orderManagement.hasOwnProperty("SalesOrdersList") &&
        orderManagement.SalesOrdersList.length > 0 ? (
          <div className="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center">
            <nav className="w-full sm:w-auto sm:mr-auto">
              <ul className="pagination">
                {getCurrentPage > 1 ? (
                  <>
                    <li className="page-item">
                      <a
                        className="page-link"
                        href="#123"
                        onClick={() => setCurrentPage(1)}
                      >
                        <Lucide icon="ChevronsLeft" className="w-4 h-4" />
                      </a>
                    </li>
                    <li className="page-item">
                      <a
                        className="page-link"
                        href="#"
                        onClick={() => setCurrentPage(getCurrentPage - 1)}
                      >
                        <Lucide icon="ChevronLeft" className="w-4 h-4" />
                      </a>
                    </li>

                    <li className="page-item">
                      {/* <a className="page-link" href="#" onClick ={setCurrentPage(orderManagement.nextPage)} > */}

                      <a
                        className="page-link"
                        href="#"
                        onClick={() => setCurrentPage(getCurrentPage - 1)}
                      >
                        {getCurrentPage - 1}
                      </a>
                    </li>
                  </>
                ) : null}
                <li className="page-item active">
                  <a className="page-link" href="#">
                    {getCurrentPage}
                  </a>
                </li>
                {getPerPage.value * getCurrentPage <=
                orderManagement?.TotalRecords ? (
                  <>
                    <li className="page-item">
                      {/* <a className="page-link" href="#" onClick ={setCurrentPage(orderManagement.nextPage)} > */}

                      <a
                        className="page-link"
                        href="#"
                        onClick={() => setCurrentPage(getCurrentPage + 1)}
                      >
                        {getCurrentPage + 1}
                      </a>
                    </li>

                    <li className="page-item">
                      <a
                        className="page-link"
                        href="#"
                        onClick={() => setCurrentPage(getCurrentPage + 1)}
                      >
                        <Lucide icon="ChevronRight" className="w-4 h-4" />
                      </a>
                    </li>

                    <li className="page-item">
                      <a
                        className="page-link"
                        href="#123"
                        onClick={() =>
                          setCurrentPage(
                            Math.ceil(
                              orderManagement.TotalRecords / getPerPage.value
                            )
                          )
                        }
                      >
                        <Lucide icon="ChevronsRight" className="w-4 h-4" />
                      </a>
                    </li>
                  </>
                ) : null}
              </ul>
            </nav>
            <Select
              defaultValue={getPerPage}
              onChange={(e) => {
                onSelectPerPage(e);
              }}
              options={kv.optionsPerPage}
            />
          </div>
        ) : null}
      </div>

      {orderManagement?.SalesOrdersList.length > 0 ? null : (
        <div className="">
          <div className="flex flex-row items-center justify-center pt-10 pb-10">
            {loading ? (
              <>
                <LoadingIcon icon="oval" className="w-6 h-6" />
                <h2 className="text-lg font-medium ml-2"> Loading ...</h2>
              </>
            ) : (
              <>
                <Lucide icon="Info" className="w-6 h-6 mr-2" />
                <h2 className="text-lg font-medium ">
                  {" "}
                  Sales Orders Unavailable
                </h2>
              </>
            )}
          </div>
        </div>
      )}

      <Modal
        size="modal-xl"
        slideOver={true}
        show={basicSlideOverPreview}
        onHidden={() => {
          setBasicSlideOverPreview(false);
        }}
      >
        <ModalHeader className="p-5">
          <h1 className="font-medium text-lg mr-auto">Order Details</h1>
          <div className="flex flex-col sm:flex-row items-center justify-end">
            <button
              className="btn btn-primary shadow-md mr-2"
              onClick={() => handlePrint()}
            >
              <Lucide icon="Printer" className="w-4 h-4 mr-2" />
              Print Order
            </button>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="intro-y box overflow-hidden mt-5">
            <div ref={componentRef}>
              <div className="intro-y grid grid-cols-12 gap-5 mt-5">
                <div className="col-span-12 lg:col-span-6 2xl:col-span-6">
                  <div className=" box p-5 rounded-md mt-5">
                    <div className="flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5 mb-5">
                      <div className="font-medium text-base truncate">
                        Transaction Information
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Lucide
                        icon="Clipboard"
                        className="w-4 h-4 text-slate-500 mr-2"
                      />
                      Order Id: {orderDetails?.SalesId}
                    </div>
                    <div className="flex items-center mt-3">
                      <Lucide
                        icon="Clipboard"
                        className="w-4 h-4 text-slate-500 mr-2"
                      />
                      Account Number :{" "}
                      {orderDetails?.CustomerAccount
                        ? orderDetails?.CustomerAccount
                        : "N/A"}
                    </div>
                    <div className="flex items-center mt-3">
                      <Lucide
                        icon="Clipboard"
                        className="w-4 h-4 text-slate-500 mr-2"
                      />
                      Job Name :{" "}
                      {orderDetails?.JobName ? orderDetails?.JobName : "N/A"}
                    </div>
                    <div className="flex items-center mt-3">
                      <Lucide
                        icon="Clipboard"
                        className="w-4 h-4 text-slate-500 mr-2"
                      />
                      Contact Name :{" "}
                      {orderDetails?.ContactName
                        ? orderDetails?.ContactName
                        : "N/A"}
                    </div>
                    <div className="flex items-center mt-3">
                      <Lucide
                        icon="Clipboard"
                        className="w-4 h-4 text-slate-500 mr-2"
                      />
                      Customer PO#{" "}
                      {orderDetails?.["customerPO#"]
                        ? orderDetails["customerPO#"]
                        : "N/A"}
                    </div>
                    <div className="flex items-center mt-3">
                      <Lucide
                        icon="Clipboard"
                        className="w-4 h-4 text-slate-500 mr-2"
                      />
                      Payment Terms :{" "}
                      {orderDetails?.PaymentTerms
                        ? orderDetails?.PaymentTerms
                        : "N/A"}
                    </div>
                    <div className="flex items-center mt-3">
                      <Lucide
                        icon="Clipboard"
                        className="w-4 h-4 text-slate-500 mr-2"
                      />
                      Sales Taker :{" "}
                      {orderDetails?.SalesTaker
                        ? orderDetails?.SalesTaker
                        : "N/A"}
                    </div>

                    <div className="flex items-center mt-3">
                      <Lucide
                        icon="Clock"
                        className="w-4 h-4 text-slate-500 mr-2"
                      />
                      Sales Order Status:
                      {orderDetails?.SalesStatus !== "Invoiced" ? (
                        <span className="bg-info/30 text-primary rounded px-2 ml-1">
                          {orderDetails?.SalesStatus}
                        </span>
                      ) : (
                        <span className="bg-success/20 text-success rounded px-2 ml-1">
                          {orderDetails?.SalesStatus}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center mt-3">
                      <Lucide
                        icon="Calendar"
                        className="w-4 h-4 text-slate-500 mr-2"
                      />
                      Delivery Date:{"  "}
                      {moment(
                        orderDetails?.DeliveryDate,
                        "MM/DD/YYYY HH:mm:ss"
                      ).format("YYYY-MM-DD")}
                    </div>
                    <div className="flex items-center mt-3">
                      <Lucide
                        icon="Calendar"
                        className="w-4 h-4 text-slate-500 mr-2"
                      />{" "}
                      Order Created Date:{" "}
                      {moment(
                        orderDetails?.OrderCreated,
                        "MM/DD/YYYY HH:mm:ss"
                      ).format("YYYY-MM-DD")}
                    </div>
                  </div>
                </div>
                <div className="col-span-12 lg:col-span-6 2xl:col-span-6">
                  <div className="col-span-12 lg:col-span-6 2xl:col-span-6">
                    <div className="box p-5 rounded-md mt-5">
                      <div className="flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5 mb-5">
                        <div className="font-medium text-base truncate">
                          Billing Address
                        </div>
                      </div>
                      <div className="flex items-center mt-3">
                        {orderDetails?.BillingAddress
                          ? orderDetails?.BillingAddress
                          : "N/A"}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-12 lg:col-span-6 2xl:col-span-6">
                    <div className="box p-5 rounded-md mt-5">
                      <div className="flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5 mb-5">
                        <div className="font-medium text-base truncate">
                          Delivery Address
                        </div>
                      </div>
                      <div className="flex items-center mt-3">
                        {orderDetails?.DeliveryAddress
                          ? orderDetails?.DeliveryAddress
                          : "N/A"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="intro-y grid grid-cols-11 gap-6 mt-5">
                <div className="col-span-12 lg:col-span-12 2xl:col-span-12">
                  <div className="box p-5 rounded-md">
                    <div className="flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5 mb-5">
                      <div className="font-medium text-base truncate">
                        Details Information
                      </div>
                    </div>
                    <div className="overflow-auto lg:overflow-visible -mt-3">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th className="whitespace-nowrap">Item Id</th>
                            <th className="whitespace-nowrap">Description</th>
                            <th className="whitespace-nowrap text-center">
                              Sales Price
                            </th>
                            <th className="whitespace-nowrap text-center">
                              Sales Qty
                            </th>
                            <th className="whitespace-nowrap text-center">
                              Sales Unit
                            </th>
                            <th className="whitespace-nowrap text-center">
                              Line Amount
                            </th>
                            <th className="whitespace-nowrap text-center">
                              Delivery Name
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {orderDetails
                            ? orderDetails?.hasOwnProperty("SalesOrderLines") &&
                              orderDetails?.SalesOrderLines.length > 0
                              ? orderDetails?.SalesOrderLines.map(
                                  (value, key) => {
                                    return (
                                      <tr key={key}>
                                        <td className="!py-4">
                                          <div className="flex items-center">
                                            <div className="font-medium">
                                              {value.ItemId || "N/A"}
                                            </div>
                                          </div>
                                        </td>
                                        <td className="!py-4">
                                          <div className="flex items-center">
                                            <div className="font-medium">
                                              {value.ItemDescription || "N/A"}
                                            </div>
                                          </div>
                                        </td>
                                        <td className="text-center">
                                          {$h.formatCurrency(value.SalesPrice)}
                                        </td>
                                        <td className="text-center">
                                          {value.SalesQty}
                                        </td>
                                        <td className="text-center">
                                          {value?.SalesUnit || "N/A"}
                                        </td>
                                        <td className="text-center">
                                          {$h.formatCurrency(
                                            value?.LineAmount
                                          ) || "N/A"}
                                        </td>
                                        <td className="text-center">
                                          {value?.DeliveryName || "N/A"}
                                        </td>
                                      </tr>
                                    );
                                  }
                                )
                              : null
                            : null}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {/*<div className="col-span-12 lg:col-span-6 2xl:col-span-6">
                <div className="box p-5 rounded-md mt-5">
                  <div className="flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5 mb-5">
                    <div className="font-medium text-base truncate">
                      Payment Information
                    </div>
                  </div>

                  <div className="flex items-center mt-3">
                    <Lucide
                      icon="CreditCard"
                      className="w-4 h-4 text-slate-500 mr-2"
                    />
                    Total Price ( {orderDetails?.SalesQty} Qty )
                    <div className="ml-auto">
                      {$h.formatCurrency(
                        orderDetails?.TotalAmount ? orderDetails?.TotalAmount : 0
                      )}
                    </div>
                  </div>
                </div>
                      </div>*/}
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}

export default Main;
