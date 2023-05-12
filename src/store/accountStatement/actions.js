import {
  GET_ACCOUNT_STATEMENT,
  GET_ACCOUNT_STATEMENT_FAIL,
  GET_ACCOUNT_STATEMENT_SUCCESS,
  SAVE_DATE_RANGE
} from "./actionTypes";

export const getAccountStatement = (rec) => ({
  type: GET_ACCOUNT_STATEMENT,
  payload: rec
});

export const getAccountStatementSuccess = (invoices) => ({
  type: GET_ACCOUNT_STATEMENT_SUCCESS,
  payload: invoices
});

export const getAccountStatementFail = (error) => ({
  type: GET_ACCOUNT_STATEMENT_FAIL,
  payload: error
});

export const saveDateRange = (dateRange) => ({
  type: SAVE_DATE_RANGE,
  payload: dateRange
});
