import * as $_ from "lodash";

import { helper as $h, ConstructJSON as JsonData, keyValue as kv } from "@/utils";
import { Litepicker, Lucide, Modal, ModalBody, ModalHeader, Tippy } from "@/base-components";
import { getInvoices, getSpecificInvoice } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

import Select from "react-select";
import classnames from "classnames";
import moment from "moment";

function Main() {
  const componentRef = useRef();

  const dispatch = useDispatch();

  const { invoices, error, loading, fetched, invoice } = useSelector(
    (state) => state.InvoicesReducer
  );

  const [largeSlideOverSizePreview, setLargeSlideOverSizePreview] = useState(false);

  const [basicSlideOverPreview, setBasicSlideOverPreview] = useState(false);

  const [getCurrentPage, setCurrentPage] = useState(1);

  const [getPerPage, setPerPage] = useState({ value: 10, label: "10" });

  const [getPrevPage, setPrevPage] = useState(10);

  const [getCurrentOrderId, setCurrentOrderId] = useState({
    value: "",
    event: false
  });

  const [getOrderDetails, setOrderDetails] = useState({});

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
      dispatch(getInvoices(params));
      setDonotRender(true);
    }
  }, [dispatch, getPerPage, getCurrentPage]);

  useEffect(() => {
    if (getCurrentOrderId.event) {
      let param = `${getCurrentOrderId.value}`;
      dispatch(getSpecificInvoice(param));

      setCurrentOrderId({ value: "", event: false });
    }
    setOrderDetails(invoice);
  }, [getCurrentOrderId.event, getOrderDetails]);

  return (
    <>
      <h2 className="intro-y text-lg font-medium mt-10">Invoice History</h2>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="intro-y col-span-12 flex flex-wrap xl:flex-nowrap items-center mt-2">
          <div className="hidden xl:block mx-auto text-slate-500">
            Showing {getCurrentPage > 1 ? getPerPage.value * (getCurrentPage - 1) + 1 : 1} to{" "}
            {invoices?.TotalRecords < getPerPage.value * getCurrentPage
              ? invoices?.TotalRecords
              : getPerPage.value * getCurrentPage}{" "}
            of {invoices?.TotalRecords} entries
          </div>
        </div>
        <div className="intro-y col-span-12 overflow-auto 2xl:overflow-visible">
          <table className="table table-report -mt-2">
            <thead>
              <tr>
                <th className="whitespace-nowrap">INVOICE ID</th>
                <th className="text-center whitespace-nowrap">SALES ID</th>
                <th className="text-center whitespace-nowrap">CUSTOMER ACCOUNT</th>
                <th className="text-center whitespace-nowrap">CUSTOMER NAME</th>
                <th className="text-center whitespace-nowrap">SALES ORDER STATUS</th>
                <th className="text-center whitespace-nowrap">INVOICE DATE</th>
                <th className="text-center whitespace-nowrap">INVOICE QTY</th>
                <th className="text-center whitespace-nowrap">TOTAL AMOUNT</th>
                <th className="text-center whitespace-nowrap">DELIVERY DATE</th>
                <th className="text-center whitespace-nowrap">VOUCHER</th>
              </tr>
            </thead>
            <tbody>
              {invoices?.InvoiceList &&
                invoices?.InvoiceList.length > 0 &&
                $_.take(invoices?.InvoiceList, invoices?.InvoiceList.length).map((value, index) => (
                  <tr key={index} className="intro-x">
                    <td className="w-40 !py-4">
                      <div
                        className="underline decoration-dotted whitespace-nowrap"
                        onClick={() => {
                          setBasicSlideOverPreview(true);
                          setCurrentOrderId({
                            value: `${value.InvoiceId}`,
                            event: true
                          });
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        {value.InvoiceId}
                      </div>
                    </td>
                    <td className="text-center">{value.SalesId}</td>
                    <td className="text-center">{value.CustomerAccount}</td>
                    <td>{value.CustomerName ? value.CustomerName : "N/A"}</td>
                    <td className="text-center">
                      <div
                        className={classnames({
                          "flex items-center justify-center whitespace-nowrap": true,
                          "text-green-700": value.SalesOrderStatus == "Invoiced",
                          "text-success": value.SalesOrderStatus == "Delivered",
                          "text-danger": value.SalesOrderStatus == "Cancelled",
                          "text-primary": value.SalesOrderStatus == "Open order"
                        })}
                      >
                        {$h.capitalizeFirstLetter(value.SalesOrderStatus)}
                      </div>
                    </td>
                    <td className="text-center">
                      <div className="whitespace-nowrap text-xs">
                        {moment(value.InvoiceDate, "MM/DD/YYYY HH:mm:ss").format("YYYY-MM-DD")}
                      </div>
                    </td>
                    <td className="w-16 text-center">
                      <div className="">{value.InvoiceQty}</div>
                    </td>
                    <td className="w-40 text-center">
                      <div className="">{$h.formatCurrency(value?.TotalAmount)}</div>
                    </td>
                    <td className="w-40 text-center">
                      <div className="whitespace-nowrap  text-xs">
                        {moment(value.DeliveryDate, "MM/DD/YYYY HH:mm:ss").format("YYYY-MM-DD")}
                      </div>
                    </td>
                    <td className="w-40 text-center">
                      <div className="">{value.Voucher}</div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {!$h.isNullObject(invoices) && invoices?.hasOwnProperty("InvoiceList") ? (
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
                      {/* <a className="page-link" href="#" onClick ={setCurrentPage(invoices.nextPage)} > */}

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
                {getPerPage.value * getCurrentPage <= invoices?.TotalRecords ? (
                  <>
                    <li className="page-item">
                      {/* <a className="page-link" href="#" onClick ={setCurrentPage(invoices.nextPage)} > */}

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
                          setCurrentPage(Math.ceil(invoices.TotalRecords / getPerPage.value))
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
          <h1 className="font-medium text-base mr-auto">Invoice Details</h1>
        </ModalHeader>
        <ModalBody>
          {/* BEGIN: Transaction Details */}
          <div className="intro-y grid grid-cols-11 gap-5 mt-5">
            <div className="col-span-12 lg:col-span-12 2xl:col-span-12">
              <div className="box p-5 rounded-md">
                <div className="overflow-auto lg:overflow-visible -mt-3">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th className="whitespace-nowrap">Item Id</th>
                        <th className="whitespace-nowrap text-center">Item Name</th>
                        <th className="whitespace-nowrap text-center">Disc Amount</th>
                        <th className="whitespace-nowrap text-center">Invoice Qty</th>
                        <th className="whitespace-nowrap text-center">Unit of Measure</th>
                        <th className="whitespace-nowrap text-center">Line Amount</th>
                        <th className="whitespace-nowrap text-center">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoice
                        ? invoice.hasOwnProperty("InvoiceLines") && invoice.InvoiceLines.length > 0
                          ? invoice.InvoiceLines.map((value, key) => {
                              return (
                                <tr key={key}>
                                  <td className="!py-4">
                                    <div className="flex items-center">
                                      <div className="font-medium whitespace-nowrap">
                                        {value.ItemId || "N/A"}
                                      </div>
                                    </div>
                                  </td>
                                  <td className="text-center">{value.ItemName || "N/A"}</td>
                                  <td className="text-center">
                                    {$h.formatCurrency(value?.DiscAmount)}
                                  </td>
                                  <td className="text-center">{value?.InvoiceQty}</td>
                                  <td className="text-center">{value?.UnitOfMeasure || "N/A"}</td>
                                  <td className="text-center">
                                    {$h.formatCurrency(value?.LineAmount) || "N/A"}
                                  </td>
                                  <td className="text-center">
                                    {$h.formatCurrency(value?.Price) || "N/A"}
                                  </td>
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
            <div className="col-span-12 lg:col-span-6 2xl:col-span-6">
              <div className=" box p-5 rounded-md mt-5">
                <div className="flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5 mb-5">
                  <div className="font-medium text-base truncate">Transaction Details</div>
                </div>
                <div className="flex items-center">
                  <Lucide icon="Clipboard" className="w-4 h-4 text-slate-500 mr-2" />
                  Sales Id: {invoice?.SalesId}
                </div>
                <div className="flex items-center mt-3">
                  <Lucide icon="Clipboard" className="w-4 h-4 text-slate-500 mr-2" />
                  Invoice Id: {invoice?.InvoiceId}
                </div>

                <div className="flex items-center mt-3">
                  <Lucide icon="Calendar" className="w-4 h-4 text-slate-500 mr-2" />
                  Invoice Date:{" "}
                  {moment(invoice?.InvoiceDate, "MM/DD/YYYY HH:mm:ss").format("YYYY-MM-DD")}
                </div>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-6 2xl:col-span-6">
              <div className="box p-5 rounded-md mt-5">
                <div className="flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5 mb-5">
                  <div className="font-medium text-base truncate">Company Details</div>
                </div>
                <div className="flex items-center">
                  <Lucide icon="Clipboard" className="w-4 h-4 text-slate-500 mr-2" />
                  Name :{invoice?.CompanyName}
                </div>
                <div className="flex items-center mt-3">
                  <Lucide icon="Calendar" className="w-4 h-4 text-slate-500 mr-2" />
                  Email : {invoice?.CompanyEmail}
                </div>
                <div className="flex items-center mt-3">
                  <Lucide icon="MapPin" className="w-4 h-4 text-slate-500 mr-2" />
                  Address : {invoice?.CompanyAddress}
                </div>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-6 2xl:col-span-6">
              <div className="box p-5 rounded-md mt-5">
                <div className="flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5 mb-5">
                  <div className="font-medium text-base truncate">Payment Details</div>
                </div>

                <div className="flex items-center mt-3">
                  <Lucide icon="CreditCard" className="w-4 h-4 text-slate-500 mr-2" />
                  Total Amount ( {invoice?.InvoiceQty} Qty )
                  <div className="ml-auto">
                    {$h.formatCurrency(invoice?.TotalAmount ? invoice.TotalAmount : 0)}
                  </div>
                </div>
                <div className="flex items-center mt-3">
                  <Lucide icon="CreditCard" className="w-4 h-4 text-slate-500 mr-2" />
                  Tax Amount
                  <div className="ml-auto">
                    {$h.formatCurrency(invoice?.TaxAmount ? invoice.TaxAmount : 0)}
                  </div>
                </div>
                <div className="flex items-center border-t border-slate-200/60 dark:border-darkmode-400 pt-5 mt-5 font-medium">
                  <Lucide icon="CreditCard" className="w-4 h-4 text-slate-500 mr-2" />
                  Grand Total:
                  <div className="ml-auto">
                    {$h.formatCurrency(
                      invoice?.TotalAmount && invoice?.TaxAmount
                        ? invoice?.TotalAmount + invoice?.TaxAmount
                        : 0
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-6 2xl:col-span-6">
              <div className="box p-5 rounded-md mt-5">
                <div className="flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5 mb-5">
                  <div className="font-medium text-base truncate">Customer Details</div>
                </div>
                <div className="flex items-center">
                  <Lucide icon="Clipboard" className="w-4 h-4 text-slate-500 mr-2" />
                  Name :{invoice?.CustomerName}
                </div>
                <div className="flex items-center mt-3">
                  <Lucide icon="Calendar" className="w-4 h-4 text-slate-500 mr-2" />
                  Account Number : {invoice?.CustomerAccount}
                </div>
              </div>
            </div>
          </div>
          {/* END: Transaction Details */}
          {/* END: Wizard Layout */}
        </ModalBody>
      </Modal>
      {/* END: Delete Confirmation Modal */}

      {/* BEGIN: Large Slide Over Content */}
      <Modal
        size="modal-xl"
        slideOver={true}
        show={largeSlideOverSizePreview}
        onHidden={() => {
          setLargeSlideOverSizePreview(false);
        }}
      >
        <ModalBody></ModalBody>
      </Modal>
    </>
  );
}

export default Main;
