import {
  GET_ACCOUNT_STATEMENT,
  GET_ACCOUNT_STATEMENT_FAIL,
  GET_ACCOUNT_STATEMENT_SUCCESS,
  SAVE_DATE_RANGE
} from "./actionTypes";

const INIT_STATE = {
  accountStatement: null,
  error: null,
  loading: false,
  fetched: false,
  dateRange: ""
};

const AccountStatementReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ACCOUNT_STATEMENT:
      return {
        ...state,
        loading: true
      };
    case GET_ACCOUNT_STATEMENT_SUCCESS:
      return {
        ...state,
        loading: false,

        accountStatement: action.payload
      };
    case GET_ACCOUNT_STATEMENT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case SAVE_DATE_RANGE:
      return {
        ...state,
        dateRange: action.payload
      };

    default:
      return state;
  }
};

export default AccountStatementReducer;
