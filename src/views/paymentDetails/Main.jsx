import { Lucide, Modal, ModalBody, ModalHeader,  LoadingIcon } from "@/base-components";
import {
  createPaymentJournal,
  getBankAccountInfo,
  getCreditCardInfo,
  getInvoices,
  getSpecificInvoice
} from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { helper as $h } from "@/utils";
import CreateCreditCard from "./CreateCreditCard";
import CreatebankDetail from "./CreatebankDetail";

function Main() {
  const [bankSidebar, setBankSidebar] = useState(false);

  const [creditSidebar, setCreditSidebar] = useState(false);

  const dispatch = useDispatch();

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

  useEffect(() => {
    if ($h.isNullObject(bankAccountInfo)) {
      dispatch(getBankAccountInfo());
    }

    if ($h.isNullObject(creditCardInfo)) {
      dispatch(getCreditCardInfo());
    }
  }, [dispatch]);

  return (
    <>

{bankAccountInfo.length > 0 || creditCardInfo.length > 0 ? null : (
        <div className="">
          <div className="flex flex-row items-center justify-center pt-10 pb-10">
            {loading ? (
               <>
               <Lucide icon="Info" className="w-6 h-6 mr-2" />
               <h2 className="text-lg font-medium ">
                 {" "}
                 Payment Details are not available
               </h2>
             </>
            ) : (
              <>
              <LoadingIcon icon="oval" className="w-6 h-6" />
              <h2 className="text-lg font-medium ml-2"> Loading ...</h2>
            </>
            
            )}
          </div>
        </div>
      )}


      <div className="intro-y flex flex-col sm:flex-row items-center mt-8">
        <h2 className="text-lg font-medium mr-auto">Bank </h2>
        <div className="w-full sm:w-auto flex mt-4 sm:mt-0">
          <button
            className="btn btn-primary shadow-md mr-2"
            onClick={() => {
              setBankSidebar(true);
            }}
          >
            <Lucide icon="Plus" className="w-4 h-4 mr-2" />
            Add Details
          </button>
        </div>
      </div>

      {/* BEGIN: Transaction Details */}
      <div className="intro-y grid grid-cols-12 gap-5 mt-5">
        {bankAccountInfo.map((item, key) => (
          <div className="col-span-5 lg:col-span-4 2xl:col-span-3" key={key}>
            <div className="box p-5 rounded-md">
              <div className="flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5 mb-5">
                <div className="font-medium text-base truncate">
                  {item.BankName}
                </div>
                {/* <a href="" className="flex items-center ml-auto text-primary" style={{marginRight:"-50px"}}>
                <Lucide icon="Edit" className="w-4 h-4 mr-2 " /> Edit
              </a>
                  <a href="" className="flex items-center ml-auto text-primary">
                <Lucide icon="Trash" className="w-4 h-4 mr-2" /> Delete
              </a> */}
              </div>
              <div className="flex items-center">
                <Lucide
                  icon="Clipboard"
                  className="w-4 h-4 text-slate-500 mr-2"
                />
                Account Number:
                <a href="" className="underline decoration-dotted ml-1">
                  {item.BankAccountNumber}
                </a>
              </div>
              <div className="flex items-center mt-3">
                <Lucide
                  icon="Calendar"
                  className="w-4 h-4 text-slate-500 mr-2"
                />
                Bank Type:
                <a href="" className="underline decoration-dotted ml-1">
                  {item.BankType}
                </a>
              </div>
              <div className="flex items-center mt-3">
                <Lucide 
                  icon="Banknote"
                className="w-4 h-4 text-slate-500 mr-2" />
                Currency Code:
                <span className="bg-success/20 text-success rounded px-2 ml-1">
                  {item.CurrencyCode}
                </span>
              </div>
              <div className="flex items-center mt-3">
                <Lucide
                  icon="Code"
                  className="w-4 h-4 text-slate-500 mr-2"
                />
                Swift Code:
                <a href="" className="underline decoration-dotted ml-1">
                  {item.SWIFTCode}
                </a>
              </div>
              <div className="flex items-center mt-3">
                <Lucide
                  icon="Binary"
                  className="w-4 h-4 text-slate-500 mr-2"
                />
                IBAN:
                <a href="" className="underline decoration-dotted ml-1">
                  {item.IBAN}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="intro-y flex flex-col sm:flex-row items-center mt-8">
        <h2 className="text-lg font-medium mr-auto">Credit Card</h2>
        <div className="w-full sm:w-auto flex mt-4 sm:mt-0">
          <button
            className="btn btn-primary shadow-md mr-2"
            onClick={() => {
              setCreditSidebar(true);
            }}
          >
            <Lucide icon="Plus" className="w-4 h-4 mr-2" />
            Add Details
          </button>
        </div>
      </div>

      {/* BEGIN: Transaction Details */}
      <div className="intro-y grid grid-cols-11 gap-5 mt-5">
        {creditCardInfo.map((item, key) => (
          <div className="col-span-12 lg:col-span-4 2xl:col-span-3" key={key}>
            <div className="box p-5 rounded-md">
              <div className="flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5 mb-5">
                <div className="font-medium text-base truncate">
                  {item.NameOnCard}
                </div>
                {/* <a href="" className="flex items-center ml-auto text-primary" style={{marginRight:"-50px"}}>
             <Lucide icon="Edit" className="w-4 h-4 mr-2 " /> Edit
           </a>
               <a href="" className="flex items-center ml-auto text-primary">
             <Lucide icon="Trash" className="w-4 h-4 mr-2" /> Delete
           </a> */}
              </div>
              <div className="flex items-center">
                <Lucide
                  icon="Clipboard"
                  className="w-4 h-4 text-slate-500 mr-2"
                />
                Account Number:
                <a href="" className=" ml-1">
                  {item.CreditCardNumSecure}
                </a>
              </div>
              <div className="flex items-center mt-3">
                <Lucide
                  icon="Calendar"
                  className="w-4 h-4 text-slate-500 mr-2"
                />
                Credit Card Type:
                <a href="" className="underline decoration-dotted ml-1">
                  {item.CreditCardType}
                </a>
              </div>
              <div className="flex items-center mt-3">
                <Lucide icon="Clock" className="w-4 h-4 text-slate-500 mr-2" />
                Corporate Card:
                <span className="bg-success/20 text-success rounded px-2 ml-1">
                  {item.CorporateCard}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>


      <CreatebankDetail open={bankSidebar} setOpen={setBankSidebar} />

      <CreateCreditCard open={creditSidebar} setOpen={setCreditSidebar} />
    </>
  );
}

export default Main;
