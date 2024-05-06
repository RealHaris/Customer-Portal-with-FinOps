import {
  ADD_BANK_ACCOUNT,
  ADD_BANK_ACCOUNT_FAIL,
  ADD_BANK_ACCOUNT_SUCCESS,
  ADD_CREDIT_CARD,
  ADD_CREDIT_CARD_FAIL,
  ADD_CREDIT_CARD_SUCCESS,
  CREATE_PAYMENT_JOURNAL,
  CREATE_PAYMENT_JOURNAL_FAIL,
  CREATE_PAYMENT_JOURNAL_SUCCESS,
  GET_AVAILABLE_CARDS,
  GET_AVAILABLE_CARDS_FAIL,
  GET_AVAILABLE_CARDS_SUCCESS,
  GET_BANK_ACCOUNT_INFO,
  GET_BANK_ACCOUNT_INFO_FAIL,
  GET_BANK_ACCOUNT_INFO_SUCCESS,
  GET_CREDIT_CARD_INFO,
  GET_CREDIT_CARD_INFO_FAIL,
  GET_CREDIT_CARD_INFO_SUCCESS,
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

export const getCreditCardInfo = (rec) => ({
  type: GET_CREDIT_CARD_INFO,
  payload: rec
});

export const getCreditCardInfoSuccess = (rec) => ({
  type: GET_CREDIT_CARD_INFO_SUCCESS,
  payload: rec
});

export const getCreditCardInfoFail = (error) => ({
  type: GET_CREDIT_CARD_INFO_FAIL,
  payload: error
});

export const getBankAccountInfo = (rec) => ({
  type: GET_BANK_ACCOUNT_INFO,
  payload: rec
});

export const getBankAccountInfoSuccess = (rec) => ({
  type: GET_BANK_ACCOUNT_INFO_SUCCESS,
  payload: rec
});

export const getBankAccountInfoFail = (error) => ({
  type: GET_BANK_ACCOUNT_INFO_FAIL,
  payload: error
});

export const createPaymentJournal = (rec) => ({
  type: CREATE_PAYMENT_JOURNAL,
  payload: rec
});

export const createPaymentJournalSuccess = (rec) => ({
  type: CREATE_PAYMENT_JOURNAL_SUCCESS,
  payload: rec
});

export const createPaymentJournalFail = (error) => ({
  type: CREATE_PAYMENT_JOURNAL_FAIL,
  payload: error
});

export const addBankAccount = (rec) => ({
  type: ADD_BANK_ACCOUNT,
  payload: rec
});

export const addBankAccountSuccess = (rec) => ({
  type: ADD_BANK_ACCOUNT_SUCCESS,
  payload: rec
});

export const addBankAccountFail = (error) => ({
  type: ADD_BANK_ACCOUNT_FAIL,
  payload: error
});

export const addCreditCard = (rec) => ({
  type: ADD_CREDIT_CARD,
  payload: rec
});

export const addCreditCardSuccess = (rec) => ({
  type: ADD_CREDIT_CARD_SUCCESS,
  payload: rec
});

export const addCreditCardFail = (error) => ({
  type: ADD_CREDIT_CARD_FAIL,
  payload: error
});

export const getAvailableCards = (rec) => ({
  type: GET_AVAILABLE_CARDS,
  payload: rec
});

export const getAvailableCardsSuccess = (rec) => ({
  type: GET_AVAILABLE_CARDS_SUCCESS,
  payload: rec
});

export const getAvailableCardsFail = (error) => ({
  type: GET_AVAILABLE_CARDS_FAIL,
  payload: error
});
