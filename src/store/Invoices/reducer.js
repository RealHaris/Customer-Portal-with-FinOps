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

const INIT_STATE = {
  invoices: null,
  error: null,
  loading: false,
  fetched: false,
  invoice: null,
  bankAccountInfo: [],
  creditCardInfo: [],
  paymentLoading: false,
  paymentSuccess: false,
  availableCards: [],
  bankAccountLoading: false,
  bankAccountSuccess: false,
  creditCardLoading: false,
  creditCardSuccess: false
};

const InvoicesReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_INVOICES:
      return {
        ...state,
        loading: true,
        paymentSuccess: false
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

    case GET_CREDIT_CARD_INFO:
      return {
        ...state,
        creditCardSuccess: false
      };

    case GET_CREDIT_CARD_INFO_SUCCESS:
      return {
        ...state,
        creditCardInfo: action.payload
      };

    case GET_CREDIT_CARD_INFO_FAIL:
      return {
        ...state,
        error: action.payload
      };

    case GET_BANK_ACCOUNT_INFO:
      return {
        ...state,
        bankAccountSuccess: false
      };

    case GET_BANK_ACCOUNT_INFO_SUCCESS:
      return {
        ...state,
        bankAccountInfo: action.payload
      };

    case GET_BANK_ACCOUNT_INFO_FAIL:
      return {
        ...state,
        error: action.payload
      };

    case CREATE_PAYMENT_JOURNAL:
      return {
        ...state,
        paymentLoading: true,
        paymentSuccess: false
      };

    case CREATE_PAYMENT_JOURNAL_SUCCESS:
      return {
        ...state,
        paymentLoading: false,
        paymentSuccess: true
      };

    case CREATE_PAYMENT_JOURNAL_FAIL:
      return {
        ...state,
        error: action.payload,
        paymentLoading: false,
        paymentSuccess: false
      };

    case GET_AVAILABLE_CARDS:
      return {
        ...state
      };

    case GET_AVAILABLE_CARDS_SUCCESS:
      console.log("action.payload", action.payload);
      return {
        ...state,
        availableCards: action.payload
      };

    case GET_AVAILABLE_CARDS_FAIL:
      return {
        ...state,
        error: action.payload
      };

    case ADD_BANK_ACCOUNT:
      return {
        ...state,
        bankAccountLoading: true,
        bankAccountSuccess: false
      };

    case ADD_BANK_ACCOUNT_SUCCESS:
      return {
        ...state,
        bankAccountLoading: false,
        bankAccountSuccess: true
      };

    case ADD_BANK_ACCOUNT_FAIL:
      return {
        ...state,
        error: action.payload,
        bankAccountLoading: false,
        bankAccountSuccess: false
      };

    case ADD_CREDIT_CARD:
      return {
        ...state,
        creditCardLoading: true,
        creditCardSuccess: false
      };

    case ADD_CREDIT_CARD_SUCCESS:
      return {
        ...state,
        creditCardLoading: false,
        creditCardSuccess: true
      };

    case ADD_CREDIT_CARD_FAIL:
      return {
        ...state,
        error: action.payload,
        creditCardLoading: false,
        creditCardSuccess: false
      };

    default:
      return state;
  }
};

export default InvoicesReducer;
