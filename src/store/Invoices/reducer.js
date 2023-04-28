import {
  GET_INVOICES,
  GET_INVOICES_FAIL,
  GET_INVOICES_SUCCESS,
  GET_SPECIFIC_INVOICE,
  GET_SPECIFIC_INVOICE_FAIL,
  GET_SPECIFIC_INVOICE_SUCCESS
} from "./actionTypes";

const INIT_STATE = {
  invoices: null,
  error: null,
  loading: false,
  fetched: false,
  invoice: null
};

const InvoicesReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_INVOICES:
      return {
        ...state,
        loading: true
      };

    case GET_INVOICES_SUCCESS:
      return {
        ...state,
        loading: false,
        invoices: action.payload
      };

    case GET_INVOICES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case GET_SPECIFIC_INVOICE:
      return {
        ...state,
        invoice: null,
        loading: true
      };

    case GET_SPECIFIC_INVOICE_SUCCESS:
      return {
        ...state,
        loading: false,
        invoice: action.payload
      };

    case GET_SPECIFIC_INVOICE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
};

export default InvoicesReducer;
