import "toastr/build/toastr.min.css";

import * as $_ from "lodash";

import {
  helper as $h,
  ConstructJSON as JsonData,
  keyValue as kv
} from "@/utils";
import {
  Litepicker,
  LoadingIcon,
  Lucide,
  Modal,
  ModalBody,
  ModalHeader,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Tippy,
  TomSelect
} from "@/base-components";
import {
  createPaymentJournal,
  getBankAccountInfo,
  getCreditCardInfo,
  getInvoices,
  getSpecificInvoice
} from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

import Select from "react-select";
import classnames from "classnames";
import { isEmpty } from "lodash";
import moment from "moment";
import toastr from "toastr";
import { useReactToPrint } from "react-to-print";

function Main() {
  const componentRef = useRef();

  const dispatch = useDispatch();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  });

  const {
    invoices,
    error,
    loading,
    fetched,
    invoice,
    creditCardInfo,
    bankAccountInfo,
    paymentLoading,
    paymentSuccess
  } = useSelector((state) => state.InvoicesReducer);

  const [largeSlideOverSizePreview, setLargeSlideOverSizePreview] =
    useState(false);

  const [basicSlideOverPreview, setBasicSlideOverPreview] = useState(false);

  const [getCurrentPage, setCurrentPage] = useState(1);

  const [getPerPage, setPerPage] = useState({ value: 10, label: "10" });

  const [selectAll, setSelectAll] = useState(false);

  const [selectedInvoiceAmount, setSelectedInvoiceAmount] = useState(0);

  const [checkedItems, setCheckedItems] = useState({});

  const [getCurrentOrderId, setCurrentOrderId] = useState({
    value: "",
    event: false
  });

  const [buttonModalPreview, setButtonModalPreview] = useState(false);

  const [getOrderDetails, setOrderDetails] = useState({});
  const [getSalesId, setSalesId] = useState("");
  const [getInvoiceNumber, setInvoiceNumber] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("Bank"); // default payment method
  const [selectedOption, setSelectedOption] = useState(""); // selected option from dropdown
  const [bankOptions, setBankOptions] = useState([]); // bank options
  const [creditCardOptions, setCreditCardOptions] = useState([]); // credit card options
  const [isSubmitting, setIsSubmitting] = useState(false); // is submitting form

  useEffect(() => {
    let param = `?perPage=${getPerPage.value}&page=${getCurrentPage}`;
    param += getSalesId !== "" ? `&salesId=${getSalesId}` : "";
    param += getInvoiceNumber !== "" ? `&invoiceId=${getInvoiceNumber}` : "";
    dispatch(getInvoices(param));
  }, [dispatch, getCurrentPage]);

  useEffect(() => {
    dispatch(getBankAccountInfo());
    dispatch(getCreditCardInfo());
  }, [dispatch]);

  const handleFilterFunction = () => {
    let param = `?perPage=${getPerPage.value}&page=1`;
    param += getSalesId !== "" ? `&salesId=${getSalesId}` : "";
    param += getInvoiceNumber !== "" ? `&invoiceId=${getInvoiceNumber}` : "";
    if (getCurrentPage !== 1) {
      setCurrentPage(1);
    } else {
      dispatch(getInvoices(param));
    }
  };

  const handleResetFilter = () => {
    let param = `?perPage=${getPerPage.value}&page=1`;
    setSalesId("");
    setInvoiceNumber("");
    if (getCurrentPage !== 1) {
      setCurrentPage(1);
    } else {
      dispatch(getInvoices(param));
    }
  };

  const onSelectPerPage = (e) => {
    setPerPage({ value: `${e.value}`, label: `${e.value}` });
    let param = `?perPage=${e.value}&page=1`;
    param += getSalesId !== "" ? `&salesId=${getSalesId}` : "";
    param += getInvoiceNumber !== "" ? `&invoiceId=${getInvoiceNumber}` : "";
    if (getCurrentPage !== 1) {
      setCurrentPage(1);
    } else {
      dispatch(getInvoices(param));
    }
  };

  useEffect(() => {
    if (getCurrentOrderId.event) {
      let param = `${getCurrentOrderId.value}`;
      dispatch(getSpecificInvoice(param));
      setCurrentOrderId({ value: "", event: false });
    }
    setOrderDetails(invoice);
  }, [getCurrentOrderId.event, getOrderDetails]);

  useEffect(() => {
    if (!isEmpty(bankAccountInfo)) {
      const bankOptions = bankAccountInfo.map((bank) => ({
        value: bank.BankAccountId,
        label: bank.BankType + " - " + bank.BankName
      }));
      setBankOptions(bankOptions);
    } else {
      setBankOptions([]);
    }
  }, [bankAccountInfo]);

  useEffect(() => {
    if (!isEmpty(creditCardInfo)) {
      const creditCardOptions = creditCardInfo.map((creditCard) => ({
        value: creditCard.CreditCardId,
        label: creditCard.CreditCardNumSecure
      }));
      setCreditCardOptions(creditCardOptions);
    } else {
      setCreditCardOptions([]);
    }
  }, [creditCardInfo]);

  const handleMakePayment = () => {
    setButtonModalPreview(true);
  };

  useEffect(() => {
    if (paymentSuccess) {
      toastr.success("Settlement Successful", "Success");
      setButtonModalPreview(false);
      dispatch(getInvoices(`?perPage=${getPerPage.value}&page=1`));
      setSelectAll(false);
      setCheckedItems({});
      setSelectedInvoiceAmount(0);
      setInvoicesList([]);
      setIsSubmitting(false);
      setPaymentMethod("Bank");
      setSelectedOption("");
    }
  }, [paymentSuccess]);

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const getPaymentMethod = () => {
    return paymentMethod === "Bank" ? "bank" : "Credit card";
  };

  const handleSubmit = () => {
    setIsSubmitting(true);

    if (!getInvoiceList.length || !paymentMethod || !selectedOption) {
      return;
    }

    const paymentJournalData = {
      invoiceIdList: getInvoiceList,
      paymentReference: "Payment from Portal",
      paymentAmount: selectedInvoiceAmount || 0,
      paymentMethod: getPaymentMethod(),
      paymentAccount: selectedOption.value
    };

    dispatch(createPaymentJournal(paymentJournalData));
  };

  const [getInvoiceList, setInvoicesList] = useState([]);

  return (
    <>
      <h2 className="intro-y text-lg font-medium mt-10">Invoice History</h2>
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
            {invoices?.TotalRecords < getPerPage.value * getCurrentPage
              ? invoices?.TotalRecords
              : getPerPage.value * getCurrentPage}{" "}
            of {invoices?.TotalRecords} entries
          </div>
          <div className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0 md:mr-5">
            <span className="text-slate-500 mr-3">Total Amount:</span>
            <span className="text-lg font-medium text-slate-500">
              {selectedInvoiceAmount > 0
                ? $h.formatCurrency(selectedInvoiceAmount)
                : "N/A"}
            </span>
          </div>

          <button
            className="btn btn-primary shadow-md mr-2 ml-5"
            onClick={() => handleMakePayment()}
            disabled={selectedInvoiceAmount <= 0}
          >
            Make Payment
          </button>
        </div>
        <div className="intro-y col-span-12 overflow-auto 2xl:overflow-visible">
          <table className="table table-report -mt-2">
            <thead>
              <tr>
                <th className="whitespace-nowrap">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={selectAll}
                    onChange={() => {
                      const newSelectAll = !selectAll;
                      setSelectAll(newSelectAll);
                      if (newSelectAll) {
                        const newCheckedItems = {};
                        invoices?.InvoiceList?.forEach((invoice) => {
                          newCheckedItems[invoice.InvoiceId] = true;
                        });
                        setCheckedItems(newCheckedItems);
                        setSelectedInvoiceAmount(
                          invoices?.InvoiceList?.reduce(
                            (total, invoice) => total + invoice.TotalAmount,
                            0
                          )
                        );
                        setInvoicesList(
                          invoices?.InvoiceList
                            ? invoices?.InvoiceList?.map(
                                (invoice) => invoice.InvoiceId
                              )
                            : []
                        );
                      } else {
                        setCheckedItems({});
                        setSelectedInvoiceAmount(0);
                        setInvoicesList([]);
                      }
                    }}
                  />
                </th>
                <th className="whitespace-nowrap">Invoice #</th>
                <th className="text-center whitespace-nowrap">Sales Order</th>
                <th className="text-center whitespace-nowrap">
                  Customer Account
                </th>
                <th className="text-center whitespace-nowrap">Customer Name</th>
                <th className="text-center whitespace-nowrap">Order Status</th>
                <th className="text-center whitespace-nowrap">
                  Payment Status
                </th>
                <th className="text-center whitespace-nowrap">Invoice Date</th>
                <th className="text-center whitespace-nowrap">Delivery Date</th>
                <th className="text-center whitespace-nowrap">
                  Invoice Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {invoices?.InvoiceList &&
                invoices?.InvoiceList.length > 0 &&
                $_.take(
                  invoices?.InvoiceList,
                  invoices?.InvoiceList.length
                ).map((value, index) => (
                  <tr key={index} className="intro-x">
                    <td className="w-10">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={checkedItems[value.InvoiceId] || false}
                        onChange={(e) => {
                          const newCheckedItems = {
                            ...checkedItems,
                            [value.InvoiceId]: e.target.checked
                          };
                          setCheckedItems(newCheckedItems);
                          if (e.target.checked) {
                            setSelectedInvoiceAmount(
                              (prevAmount) => prevAmount + value.TotalAmount
                            );
                            setInvoicesList((prevList) => [
                              ...prevList,
                              value.InvoiceId
                            ]);
                          } else {
                            setSelectedInvoiceAmount(
                              (prevAmount) => prevAmount - value.TotalAmount
                            );
                            setInvoicesList((prevList) =>
                              prevList.filter(
                                (invoiceId) => invoiceId !== value.InvoiceId
                              )
                            );
                          }

                          // Check if all checkboxes are checked
                          const checkedCount =
                            Object.values(newCheckedItems).filter(
                              Boolean
                            ).length;
                          setSelectAll(
                            checkedCount === invoices?.InvoiceList.length
                          );
                        }}
                      />
                    </td>
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
                          "text-green-700":
                            value.SalesOrderStatus == "Invoiced",
                          "text-success": value.SalesOrderStatus == "Delivered",
                          "text-danger": value.SalesOrderStatus == "Cancelled",
                          "text-primary": value.SalesOrderStatus == "Open order"
                        })}
                      >
                        {$h.capitalizeFirstLetter(value.SalesOrderStatus)}
                      </div>
                    </td>
                    <td className="text-center">
                      <div
                        className={classnames({
                          "flex items-center justify-center whitespace-nowrap": true,
                          "text-success": value.InvoiceStatus == "Paid",
                          "text-info": value.InvoiceStatus == "refund",
                          "text-danger": value.InvoiceStatus == "Unpaid"
                        })}
                      >
                        <Lucide icon="CheckSquare" className="w-4 h-4 mr-2" />
                        {$h.capitalizeFirstLetter(value.InvoiceStatus)}
                      </div>
                    </td>
                    <td className="text-center">
                      <div className="whitespace-nowrap text-xs">
                        {moment(
                          value.InvoiceDate,
                          "MM/DD/YYYY HH:mm:ss"
                        ).format("YYYY-MM-DD")}
                      </div>
                    </td>
                    <td className="w-40 text-center">
                      <div className="whitespace-nowrap  text-xs">
                        {moment(
                          value.DeliveryDate,
                          "MM/DD/YYYY HH:mm:ss"
                        ).format("YYYY-MM-DD")}
                      </div>
                    </td>

                    <td className="w-40 text-center">
                      <div className="">
                        {$h.formatCurrency(value?.TotalAmount)}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {!$h.isNullObject(invoices) &&
        invoices?.hasOwnProperty("InvoiceList") &&
        invoices?.InvoiceList.length > 0 ? (
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
                          setCurrentPage(
                            Math.ceil(invoices.TotalRecords / getPerPage.value)
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

      {invoices?.InvoiceList.length > 0 ? null : (
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
                  Invoice History Unavailable
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
          <h1 className="font-medium text-lg mr-auto">Invoice Details</h1>
          <div className="flex flex-col sm:flex-row items-center justify-end">
            <button
              className="btn btn-primary shadow-md mr-2"
              onClick={() => handlePrint()}
            >
              <Lucide icon="Printer" className="w-4 h-4 mr-2" />
              Print Invoice
            </button>
          </div>
        </ModalHeader>
        <ModalBody>
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
                    Sales Id: {invoice?.SalesId ? invoice?.SalesId : "N/A"}
                  </div>
                  <div className="flex items-center mt-3">
                    <Lucide
                      icon="Clipboard"
                      className="w-4 h-4 text-slate-500 mr-2"
                    />
                    Invoice Id: {invoice?.InvoiceId}
                  </div>

                  <div className="flex items-center mt-3">
                    <Lucide
                      icon="Clipboard"
                      className="w-4 h-4 text-slate-500 mr-2"
                    />
                    Job Name : {invoice?.JobName ? invoice?.JobName : "N/A"}
                  </div>
                  <div className="flex items-center mt-3">
                    <Lucide
                      icon="Clipboard"
                      className="w-4 h-4 text-slate-500 mr-2"
                    />
                    Contact Name :{" "}
                    {invoice?.ContactName ? invoice?.ContactName : "N/A"}
                  </div>
                  <div className="flex items-center mt-3">
                    <Lucide
                      icon="Clipboard"
                      className="w-4 h-4 text-slate-500 mr-2"
                    />
                    Customer PO#{" "}
                    {invoice?.["customerPO#"] ? invoice["customerPO#"] : "N/A"}
                  </div>

                  <div className="flex items-center mt-3">
                    <Lucide
                      icon="Clipboard"
                      className="w-4 h-4 text-slate-500 mr-2"
                    />
                    Sales Taker :{" "}
                    {invoice?.SalesTaker ? invoice?.SalesTaker : "N/A"}
                  </div>

                  <div className="flex items-center mt-3">
                    <Lucide
                      icon="Calendar"
                      className="w-4 h-4 text-slate-500 mr-2"
                    />
                    Invoice Date:{" "}
                    {moment(invoice?.InvoiceDate, "MM/DD/YYYY HH:mm:ss").format(
                      "YYYY-MM-DD"
                    )}
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
                      {invoice?.BillingAddress
                        ? invoice?.BillingAddress
                        : "N/A"}
                    </div>
                  </div>
                </div>
                <div className="col-span-12 lg:col-span-6 2xl:col-span-6">
                  <div className="box p-5 rounded-md mt-5">
                    <div className="flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5 mb-5">
                      <div className="font-medium text-base truncate">
                        Company Information
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Lucide
                        icon="Clipboard"
                        className="w-4 h-4 text-slate-500 mr-2"
                      />
                      Name :{invoice?.CompanyName}
                    </div>
                    <div className="flex items-center mt-3">
                      <Lucide
                        icon="Calendar"
                        className="w-4 h-4 text-slate-500 mr-2"
                      />
                      Email : {invoice?.CompanyEmail || "N/A"}
                    </div>
                    <div className="flex items-center mt-3">
                      <Lucide
                        icon="MapPin"
                        className="w-4 h-4 text-slate-500 mr-2"
                      />
                      Address : {invoice?.CompanyAddress}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="intro-y grid grid-cols-11 gap-5 mt-5">
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
                          <th className="whitespace-nowrap text-center">
                            Item Name
                          </th>
                          <th className="whitespace-nowrap text-center">
                            Disc Amount
                          </th>
                          <th className="whitespace-nowrap text-center">
                            Invoice Qty
                          </th>
                          <th className="whitespace-nowrap text-center">
                            Unit of Measure
                          </th>
                          <th className="whitespace-nowrap text-center">
                            Line Amount
                          </th>
                          <th className="whitespace-nowrap text-center">
                            Price
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {invoice
                          ? invoice?.hasOwnProperty("InvoiceLines") &&
                            invoice?.InvoiceLines.length > 0
                            ? invoice?.InvoiceLines.map((value, key) => {
                                return (
                                  <tr key={key}>
                                    <td className="!py-4">
                                      <div className="flex items-center">
                                        <div className="font-medium">
                                          {value.ItemId || "N/A"}
                                        </div>
                                      </div>
                                    </td>
                                    <td className="text-center">
                                      {value.ItemName || "N/A"}
                                    </td>
                                    <td className="text-center">
                                      {$h.formatCurrency(value?.DiscAmount)}
                                    </td>
                                    <td className="text-center">
                                      {value?.InvoiceQty}
                                    </td>
                                    <td className="text-center">
                                      {value?.UnitOfMeasure || "N/A"}
                                    </td>
                                    <td className="text-center">
                                      {$h.formatCurrency(value?.LineAmount) ||
                                        "N/A"}
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
                <div className="box p-5 rounded-md mt-5">
                  <div className="flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5 mb-5">
                    <div className="font-medium text-base truncate">
                      Payment Information
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Lucide
                      icon="Clipboard"
                      className="w-4 h-4 text-slate-500 mr-2"
                    />
                    Payment Status:
                    <div className="ml-auto">
                      {invoice?.InvoiceStatus !== "Paid" ? (
                        <span className="bg-danger/20 text-danger rounded px-2 ml-1">
                          {invoice?.InvoiceStatus}
                        </span>
                      ) : (
                        <span className="bg-success/20 text-success rounded px-2 ml-1">
                          {invoice?.InvoiceStatus}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center mt-3">
                    <Lucide
                      icon="Clipboard"
                      className="w-4 h-4 text-slate-500 mr-2"
                    />
                    Payment Terms
                    <div className="ml-auto">
                      {invoice?.PaymentTerms ? invoice?.PaymentTerms : "N/A"}
                    </div>
                  </div>
                  <div className="flex items-center mt-3">
                    <Lucide
                      icon="Clipboard"
                      className="w-4 h-4 text-slate-500 mr-2"
                    />
                    Voucher
                    <div className="ml-auto">
                      {invoice?.Voucher ? invoice?.Voucher : "N/A"}
                    </div>
                  </div>
                  <div className="flex items-center mt-3">
                    <Lucide
                      icon="CreditCard"
                      className="w-4 h-4 text-slate-500 mr-2"
                    />
                    Tax Amount
                    <div className="ml-auto">
                      {$h.formatCurrency(
                        invoice?.TaxAmount ? invoice?.TaxAmount : 0
                      )}
                    </div>
                  </div>

                  <div className="flex items-center mt-3">
                    <Lucide
                      icon="CreditCard"
                      className="w-4 h-4 text-slate-500 mr-2"
                    />
                    Remaining Amount
                    <div className="ml-auto">
                      {$h.formatCurrency(
                        invoice?.RemainingAccount
                          ? invoice?.RemainingAccount
                          : 0
                      )}
                    </div>
                  </div>
                  <div className="flex items-center mt-3">
                    <Lucide
                      icon="CreditCard"
                      className="w-4 h-4 text-slate-500 mr-2"
                    />
                    Total Amount ( Inc. Tax )
                    <div className="ml-auto">
                      {$h.formatCurrency(
                        invoice?.TotalAmount ? invoice?.TotalAmount : 0
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-12 lg:col-span-6 2xl:col-span-6">
                <div className="box p-5 rounded-md mt-5">
                  <div className="flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5 mb-5">
                    <div className="font-medium text-base truncate">
                      Customer Details
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Lucide
                      icon="Clipboard"
                      className="w-4 h-4 text-slate-500 mr-2"
                    />
                    Name :{invoice?.CustomerName}
                  </div>
                  <div className="flex items-center mt-3">
                    <Lucide
                      icon="Calendar"
                      className="w-4 h-4 text-slate-500 mr-2"
                    />
                    Account Number : {invoice?.CustomerAccount}
                  </div>
                </div>
              </div>
            </div>
          </div>
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
      <Modal
        size="modal-xl"
        show={buttonModalPreview}
        onHidden={() => {
          setButtonModalPreview(false);
        }}
      >
        <button
          onClick={() => {
            setButtonModalPreview(false);
          }}
          disabled={paymentLoading}
          className="absolute right-0 top-0 mt-3 mr-3"
        >
          <Lucide icon="X" className="w-8 h-8 text-slate-400" />
        </button>
        <ModalBody className="p-0">
          <div className="flex items-center px-5 py-5 sm:py-3 border-b border-gray-200 justify-center">
            <Lucide icon="CreditCard" className="w-16 h-16 text-success mr-2" />
            <div className="text-3xl  font-bold">Payment</div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-1">
              <div className="mt-3 justify-center items-center">
                <h3 className="intro-y text-lg font-medium mb-2 text-center mt-4">
                  Select Payment Method
                </h3>
                <div className="grid grid-cols-12 gap-5 text-center mx-4 mt-8">
                  <div
                    className={`col-span-6 box cursor-pointer zoom-in p-5 ${
                      paymentMethod === "Bank"
                        ? "bg-primary text-white"
                        : "text-base"
                    }`}
                    onClick={() => {
                      setPaymentMethod("Bank");
                      setSelectedOption("");
                    }}
                  >
                    <Lucide
                      icon="Home"
                      className="block w-6 h-6 mb-2 mx-auto"
                    />
                    <div
                      className={`font-medium text-base ${
                        paymentMethod === "Bank" ? "text-white" : "text-base"
                      }`}
                    >
                      Bank
                    </div>
                  </div>
                  <div
                    className={`col-span-6 box cursor-pointer zoom-in p-5 ${
                      paymentMethod === "Credit Card"
                        ? "bg-primary text-white"
                        : "text-base"
                    }`}
                    onClick={() => {
                      setPaymentMethod("Credit Card");
                      setSelectedOption("");
                    }}
                  >
                    <Lucide
                      icon="CreditCard"
                      className="block w-6 h-6 mb-2 mx-auto"
                    />
                    <div
                      className={`font-medium text-base ${
                        paymentMethod === "Credit Card"
                          ? "text-white"
                          : "text-base"
                      }`}
                    >
                      Credit Card
                    </div>
                  </div>
                </div>
                <h3 className="font-medium text-base mr-auto mb-2 text-center mt-8">
                  {paymentMethod === "Bank"
                    ? "Select Bank"
                    : "Select Credit Card"}{" "}
                </h3>
                <div className="mt-4 p-4">
                  <Select
                    value={selectedOption}
                    onChange={(value) => {
                      handleOptionChange(value);
                    }}
                    placeholder="Select an option"
                    options={
                      paymentMethod === "Bank" ? bankOptions : creditCardOptions
                    }
                  />
                  {isSubmitting && selectedOption === "" && (
                    <div className="text-red-500 mt-2">
                      Please select an option
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="col-span-1">
              <div className="mt-3">
                <h3 className="intro-y text-lg font-medium mb-2 text-center mt-4 justify-center items-center">
                  Invoices
                </h3>
                <div className="grid grid-cols-12 gap-5 text-center mx-4 mt-8">
                  <div className="col-span-12 box p-5 text-base">
                    <div className="font-medium text-base">
                      {getInvoiceList.length > 1
                        ? getInvoiceList.join(", ")
                        : getInvoiceList[0]}
                    </div>
                  </div>
                  <div className="col-span-12 box p-5 text-base">
                    <div className="font-medium text-base flex justify-center">
                      Total Amount :{" "}
                      <span className="text-primary">
                        {$h.formatCurrency(selectedInvoiceAmount)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="px-5 pb-8 text-center">
            <button
              type="button"
              onClick={() => {
                handleSubmit();
              }}
              className="btn btn-primary w-24"
              disabled={paymentLoading}
            >
              {paymentLoading ? (
                <div className="col-span-6 sm:col-span-3 xl:col-span-2 flex flex-col justify-end items-center mr-2">
                  <LoadingIcon icon="oval" className="w-6 h-6" />
                </div>
              ) : null}
              Submit
            </button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}

export default Main;
