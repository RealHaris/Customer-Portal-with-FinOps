import { GET_INVOICES, GET_SPECIFIC_INVOICE } from "./actionTypes";
import { call, put, takeEvery } from "redux-saga/effects";
import { getInvoicesCall, getSpecificInvoiceCall } from "../../helpers/backend_helper";
import {
  getInvoicesFail,
  getInvoicesSuccess,
  getSpecificInvoiceFail,
  getSpecificInvoiceSuccess
} from "./actions";

function* fetchInvoices({ payload: rec }) {
  try {
    console.log("rec", rec);
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

function* InvoicesSaga() {
  yield takeEvery(GET_INVOICES, fetchInvoices);
  yield takeEvery(GET_SPECIFIC_INVOICE, fetchSpecificInvoice);
}

export default InvoicesSaga;
