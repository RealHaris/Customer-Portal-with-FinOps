import * as $_ from "lodash";

import { helper as $h, ConstructJSON as JsonData, keyValue as kv } from "@/utils";
import { Lucide, Modal, ModalBody, ModalHeader } from "@/base-components";
import {
  getAllOrders,
  getOrderDetails as onGetOrderDetails,
  getOrderManagement as onGetOrderManagement
} from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

import Select from "react-select";
import classnames from "classnames";
import moment from "moment";

function Main() {
  const dispatch = useDispatch();

  const { orderManagement } = useSelector((state) => ({
    orderManagement: state.OrderManagementReducer?.orderManagements
  }));

  const { orderDetails } = useSelector((state) => ({
    orderDetails: state.OrderManagementReducer?.orderDetailsState
  }));

  const [basicSlideOverPreview, setBasicSlideOverPreview] = useState(false);

  const [getOrderDetails, setOrderDetails] = useState([]);
  const [getCurrentOrderId, setCurrentOrderId] = useState({
    value: "",
    event: false
  });

  const [getCurrentPage, setCurrentPage] = useState(1);

  const [getPerPage, setPerPage] = useState({ value: 10, label: "10" });

  const [getPrevPage, setPrevPage] = useState(10);

  const [DonotRender, setDonotRender] = useState(true);

  useEffect(() => {
    var params = `?perPage=${getPerPage.value}&page=${getCurrentPage}`;
    if (getPrevPage != getPerPage.value) {
      var params = `?perPage=${getPerPage.value}&page=1`;
      setCurrentPage(1);
      setPrevPage(getPerPage.value);
      setDonotRender(false);
    }
    if (DonotRender) {
      dispatch(onGetOrderManagement(params));
      setDonotRender(true);
    }
  }, [dispatch, getPerPage, getCurrentPage]);

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
          <div className="hidden xl:block mx-auto text-slate-500">
            Showing {getCurrentPage > 1 ? getPerPage.value * (getCurrentPage - 1) + 1 : 1} to{" "}
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
                <th className="whitespace-nowrap">SALES ID</th>
                <th className="text-center whitespace-nowrap">CUSTOMER ACCOUNT</th>
                <th className="text-center whitespace-nowrap">CUSTOMER NAME</th>
                <th className="text-center whitespace-nowrap">SALES STATUS</th>
                <th className="text-center whitespace-nowrap">ORDER CREATED DATE</th>
                <th className="text-center whitespace-nowrap">SALES QTY</th>
                <th className="text-center whitespace-nowrap">TOTAL AMOUNT</th>
                <th className="text-center whitespace-nowrap">DELIVERY DATE</th>
                <th className="text-center whitespace-nowrap">PAYMENT STATUS</th>
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
                            event: true
                          });
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        {value.SalesId}
                      </div>
                    </td>

                    <td className="text-center">{value.CustomerAccount}</td>

                    <td>{value.CustomerName ? value.CustomerName : "N/A"}</td>

                    <td className="text-center">
                      <div
                        className={classnames({
                          "flex items-center justify-center whitespace-nowrap": true,
                          "text-green-700": value.SalesStatus == "Invoiced",
                          "text-success": value.SalesStatus == "Delivered",
                          "text-danger": value.SalesStatus == "Cancelled",
                          "text-primary": value.SalesStatus == "Open order"
                        })}
                      >
                        {$h.capitalizeFirstLetter(value.SalesStatus)}
                      </div>
                    </td>
                    <td className="text-center">
                      <div className="whitespace-nowrap text-xs">
                        {moment(value.OrderCreated, "MM/DD/YYYY HH:mm:ss").format("YYYY-MM-DD")}
                      </div>
                    </td>
                    <td className="w-40 text-center">
                      <div className="">{value.SalesQty}</div>
                    </td>
                    <td className="w-40 text-center">
                      <div className="">{$h.formatCurrency(value.TotalAmount)}</div>
                    </td>
                    <td className="text-center">
                      <div className="whitespace-nowrap text-xs">
                        {moment(value.DeliveryDate, "MM/DD/YYYY HH:mm:ss").format("YYYY-MM-DD")}
                      </div>
                    </td>

                    <td className="text-center">
                      <div
                        className={classnames({
                          "flex items-center justify-center whitespace-nowrap": true,
                          "text-success": value.PaymentStatus == "Paid",
                          "text-info": value.PaymentStatus == "refund",
                          "text-danger": value.PaymentStatus == "Unpaid"
                        })}
                      >
                        <Lucide icon="CheckSquare" className="w-4 h-4 mr-2" />
                        {$h.capitalizeFirstLetter(value.PaymentStatus)}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {!$h.isNullObject(orderManagement) && orderManagement.hasOwnProperty("SalesOrdersList") ? (
          <div className="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center">
            <nav className="w-full sm:w-auto sm:mr-auto">
              <ul className="pagination">
                {getCurrentPage > 1 ? (
                  <>
                    <li className="page-item">
                      <a className="page-link" href="#123" onClick={() => setCurrentPage(1)}>
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
                {getPerPage.value * getCurrentPage <= orderManagement?.TotalRecords ? (
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
                          setCurrentPage(Math.ceil(orderManagement.TotalRecords / getPerPage.value))
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
                setPrevPage(getPerPage.value);
                setPerPage({ value: `${e.value}`, label: `${e.value}` });
              }}
              options={kv.optionsPerPage}
            />
          </div>
        ) : null}
      </div>

      <Modal
        size="modal-xl"
        slideOver={true}
        show={basicSlideOverPreview}
        onHidden={() => {
          setBasicSlideOverPreview(false);
        }}
      >
        <ModalHeader className="p-5">
          <h1 className="font-medium text-base mr-auto">Order Details</h1>
        </ModalHeader>
        <ModalBody>
          <div className="intro-y grid grid-cols-11 gap-6 mt-5">
            <div className="col-span-12 lg:col-span-12 2xl:col-span-12">
              <div className="box p-5 rounded-md">
                <div className="overflow-auto lg:overflow-visible -mt-3">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th className="whitespace-nowrap">Item Id</th>
                        <th className="whitespace-nowrap text-center">Sales Price</th>
                        <th className="whitespace-nowrap text-center">Sales Qty</th>
                        <th className="whitespace-nowrap text-center">Sales Unit</th>
                        <th className="whitespace-nowrap text-center">Line Amount</th>
                        <th className="whitespace-nowrap text-center">Delivery Name</th>
                        <th className="whitespace-nowrap text-center">Item Tax Group</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderDetails
                        ? orderDetails.hasOwnProperty("SalesOrderLines") &&
                          orderDetails.SalesOrderLines.length > 0
                          ? orderDetails.SalesOrderLines.map((value, key) => {
                              return (
                                <tr key={key}>
                                  <td className="!py-4">
                                    <div className="flex items-center">
                                      <div className="font-medium whitespace-nowrap">
                                        {value.ItemId || "N/A"}
                                      </div>
                                    </div>
                                  </td>
                                  <td className="text-center">
                                    {$h.formatCurrency(value.SalesPrice)}
                                  </td>
                                  <td className="text-center">{value.SalesQty}</td>
                                  <td className="text-center">{value?.SalesUnit || "N/A"}</td>
                                  <td className="text-center">
                                    {$h.formatCurrency(value?.LineAmount) || "N/A"}
                                  </td>
                                  <td className="text-center">{value?.DeliveryName || "N/A"}</td>
                                  <td className="text-center">{value?.ItemTaxGroup || "N/A"}</td>
                                </tr>
                              );
                            })
                          : null
                        : null}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="intro-y grid grid-cols-12 gap-5 mt-5">
            {/* <div className="col-span-12 lg:col-span-12 2xl:col-span-12"> */}

            <div className="col-span-12 lg:col-span-6 2xl:col-span-6">
              <div className=" box p-5 rounded-md mt-5">
                <div className="flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5 mb-5">
                  <div className="font-medium text-base truncate">Transaction Details</div>
                </div>
                <div className="flex items-center">
                  <Lucide icon="Clipboard" className="w-4 h-4 text-slate-500 mr-2" />
                  Order Id: {orderDetails.SalesId}
                </div>

                <div className="flex items-center mt-3">
                  <Lucide icon="Calendar" className="w-4 h-4 text-slate-500 mr-2" />
                  Delivery Date:{" "}
                  {moment(orderDetails.DeliveryDate, "MM/DD/YYYY HH:mm:ss").format("YYYY-MM-DD")}
                </div>
                <div className="flex items-center mt-3">
                  <Lucide icon="Clock" className="w-4 h-4 text-slate-500 mr-2" />
                  Sales Status:
                  {orderDetails.SalesStatus !== "Invoiced" ? (
                    <span className="bg-info/30 text-primary rounded px-2 ml-1">
                      {orderDetails.SalesStatus}
                    </span>
                  ) : (
                    <span className="bg-success/20 text-success rounded px-2 ml-1">
                      {orderDetails.SalesStatus}
                    </span>
                  )}
                </div>
                <div className="flex items-center mt-3">
                  <Lucide icon="Calendar" className="w-4 h-4 text-slate-500 mr-2" /> Order Created
                  Date:{" "}
                  {moment(orderDetails.OrderCreated, "MM/DD/YYYY HH:mm:ss").format("YYYY-MM-DD")}
                </div>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-6 2xl:col-span-6">
              <div className="box p-5 rounded-md mt-5">
                <div className="flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5 mb-5">
                  <div className="font-medium text-base truncate">Payment Details</div>
                </div>
                <div className="flex items-center">
                  <Lucide icon="Clipboard" className="w-4 h-4 text-slate-500 mr-2" />
                  Payment Status:
                  <div className="ml-auto">
                    {orderDetails.PaymentStatus !== "Paid" ? (
                      <span className="bg-danger/20 text-danger rounded px-2 ml-1">
                        {orderDetails.PaymentStatus}
                      </span>
                    ) : (
                      <span className="bg-success/20 text-success rounded px-2 ml-1">
                        {orderDetails.PaymentStatus}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center mt-3">
                  <Lucide icon="CreditCard" className="w-4 h-4 text-slate-500 mr-2" />
                  Total Price ( {orderDetails.SalesQty} Qty )
                  <div className="ml-auto">
                    {$h.formatCurrency(orderDetails.TotalAmount ? orderDetails.TotalAmount : 0)}
                  </div>
                </div>
                <div className="flex items-center border-t border-slate-200/60 dark:border-darkmode-400 pt-5 mt-5 font-medium">
                  <Lucide icon="CreditCard" className="w-4 h-4 text-slate-500 mr-2" />
                  Grand Total:
                  <div className="ml-auto">
                    {$h.formatCurrency(orderDetails.TotalAmount ? orderDetails.TotalAmount : 0)}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-6 2xl:col-span-6">
              <div className="box p-5 rounded-md mt-5">
                <div className="flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5 mb-5">
                  <div className="font-medium text-base truncate">Shipping Information</div>
                </div>
                <div className="flex items-center">
                  <Lucide icon="Clipboard" className="w-4 h-4 text-slate-500 mr-2" />
                  Name : {orderDetails.CustomerName}
                </div>
                <div className="flex items-center mt-3">
                  <Lucide icon="Calendar" className="w-4 h-4 text-slate-500 mr-2" />
                  Account Number : {orderDetails.CustomerAccount}
                </div>
                <div className="flex items-center mt-3">
                  <Lucide icon="MapPin" className="w-4 h-4 text-slate-500 mr-2" />
                  Delivery Date:{"  "}
                  {moment(orderDetails.DeliveryDate, "MM/DD/YYYY HH:mm:ss").format("YYYY-MM-DD")}
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}

export default Main;
