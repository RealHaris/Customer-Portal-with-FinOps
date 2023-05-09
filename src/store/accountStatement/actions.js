import {
  GET_ACCOUNT_STATEMENT,
  GET_ACCOUNT_STATEMENT_FAIL,
  GET_ACCOUNT_STATEMENT_SUCCESS
} from "./actiontypes";

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
