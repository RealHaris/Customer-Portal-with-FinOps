import {
  GET_ACCOUNT_STATEMENT,
  GET_ACCOUNT_STATEMENT_FAIL,
  GET_ACCOUNT_STATEMENT_SUCCESS
} from "./actiontypes";
import { call, put, takeLatest } from "redux-saga/effects";
import { getAccountStatementFail, getAccountStatementSuccess } from "./actions";

import { getAccountStatement } from "../../helpers/backend_helper";

function* fetchAccountStatement(action) {
  try {
    const response = yield call(getAccountStatement, action.payload);
    yield put(getAccountStatementSuccess(response));
  } catch (error) {
    yield put(getAccountStatementFail(error));
  }
}
function* watchAccountStatement() {
  yield takeLatest(GET_ACCOUNT_STATEMENT, fetchAccountStatement);
}

export default watchAccountStatement;
