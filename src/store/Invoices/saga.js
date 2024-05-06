import {
  ADD_BANK_ACCOUNT,
  ADD_CREDIT_CARD,
  CREATE_PAYMENT_JOURNAL,
  GET_AVAILABLE_CARDS,
  GET_BANK_ACCOUNT_INFO,
  GET_CREDIT_CARD_INFO,
  GET_INVOICES,
  GET_SPECIFIC_INVOICE
} from "./actionTypes";
import {
  addBankAccountCall,
  addCreditCardCall,
  getAvailableCardsCall,
  getBankAccountInfoCall,
  getCreditCardInfoCall,
  getInvoicesCall,
  getSpecificInvoiceCall,
  postPaymentJournalCall
} from "../../helpers/backend_helper";
import {
  addBankAccountFail,
  addBankAccountSuccess,
  addCreditCardFail,
  addCreditCardSuccess,
  createPaymentJournalFail,
  createPaymentJournalSuccess,
  getAvailableCardsFail,
  getAvailableCardsSuccess,
  getBankAccountInfoFail,
  getBankAccountInfoSuccess,
  getCreditCardInfoFail,
  getCreditCardInfoSuccess,
  getInvoicesFail,
  getInvoicesSuccess,
  getSpecificInvoiceFail,
  getSpecificInvoiceSuccess
} from "./actions";
import { call, put, takeEvery } from "redux-saga/effects";

function* fetchInvoices({ payload: rec }) {
  try {
    const response = yield call(getInvoicesCall, rec);
    yield put(getInvoicesSuccess(response));
  } catch (error) {
    yield put(getInvoicesFail(error));
  }
}

function* fetchSpecificInvoice({ payload: rec }) {
  try {
    const response = yield call(getSpecificInvoiceCall, rec);
    yield put(getSpecificInvoiceSuccess(response));
  } catch (error) {
    yield put(getSpecificInvoiceFail(error));
  }
}

function* fetchCreditCardInfo({ payload: rec }) {
  try {
    const response = yield call(getCreditCardInfoCall, rec);
    yield put(getCreditCardInfoSuccess(response.data));
  } catch (error) {
    yield put(getCreditCardInfoFail(error));
  }
}

function* fetchBankAccountInfo({ payload: rec }) {
  try {
    const response = yield call(getBankAccountInfoCall, rec);
    yield put(getBankAccountInfoSuccess(response.data));
  } catch (error) {
    yield put(getBankAccountInfoFail(error));
  }
}

function* postPaymentJournal({ payload: rec }) {
  try {
    const response = yield call(postPaymentJournalCall, rec);
    yield put(createPaymentJournalSuccess(response));
  } catch (error) {
    yield put(createPaymentJournalFail(error));
  }
}

function* addBankAccount({ payload: rec }) {
  try {
    console.log("rec", rec);
    const response = yield call(addBankAccountCall, rec);
    yield put(addBankAccountSuccess(response));
  } catch (error) {
    yield put(addBankAccountFail(error));
  }
}

function* addCreditCard({ payload: rec }) {
  try {
    const response = yield call(addCreditCardCall, rec);
    yield put(addCreditCardSuccess(response));
  } catch (error) {
    yield put(addCreditCardFail(error));
  }
}

function* fetchAvailableCards({ payload: rec }) {
  try {
    const response = yield call(getAvailableCardsCall, rec);
    yield put(getAvailableCardsSuccess(response.cardList));
  } catch (error) {
    yield put(getAvailableCardsFail(error));
  }
}

function* InvoicesSaga() {
  yield takeEvery(GET_INVOICES, fetchInvoices);
  yield takeEvery(GET_SPECIFIC_INVOICE, fetchSpecificInvoice);
  yield takeEvery(GET_CREDIT_CARD_INFO, fetchCreditCardInfo);
  yield takeEvery(GET_BANK_ACCOUNT_INFO, fetchBankAccountInfo);
  yield takeEvery(CREATE_PAYMENT_JOURNAL, postPaymentJournal);
  yield takeEvery(ADD_BANK_ACCOUNT, addBankAccount);
  yield takeEvery(ADD_CREDIT_CARD, addCreditCard);
  yield takeEvery(GET_AVAILABLE_CARDS, fetchAvailableCards);
}

export default InvoicesSaga;
