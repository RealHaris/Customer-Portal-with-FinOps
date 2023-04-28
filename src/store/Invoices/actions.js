import {
  GET_INVOICES,
  GET_INVOICES_FAIL,
  GET_INVOICES_SUCCESS,
  GET_SPECIFIC_INVOICE,
  GET_SPECIFIC_INVOICE_FAIL,
  GET_SPECIFIC_INVOICE_SUCCESS
} from "./actionTypes";

export const getInvoices = (rec) => ({
  type: GET_INVOICES,
  payload: rec
});

export const getInvoicesSuccess = (invoices) => ({
  type: GET_INVOICES_SUCCESS,
  payload: invoices
});

export const getInvoicesFail = (error) => ({
  type: GET_INVOICES_FAIL,
  payload: error
});

export const getSpecificInvoice = (rec) => ({
  type: GET_SPECIFIC_INVOICE,
  payload: rec
});

export const getSpecificInvoiceSuccess = (invoices) => ({
  type: GET_SPECIFIC_INVOICE_SUCCESS,
  payload: invoices
});

export const getSpecificInvoiceFail = (error) => ({
  type: GET_SPECIFIC_INVOICE_FAIL,
  payload: error
});
