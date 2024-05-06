import {
  API_ERROR,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_ERROR,
  CHANGE_PASSWORD_SUCCESS,
  CLEAR_AUTH_RESPONSE,
  LOGIN_SUCCESS,
  LOGIN_USER,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  RESET_PASSWORD,
  RESET_PASSWORD_ERROR,
  RESET_PASSWORD_SUCCESS,
  VERIFY_EMAIL,
  VERIFY_EMAIL_ERROR,
  VERIFY_EMAIL_SUCCESS,
} from "./actionTypes";

const initialState = {
  error: "",
  loading: false,
  forgotPsdLoading: false,
  forgotPsdError: "",
  forgotPsdResponse: null,
  resetPsdLoading: false,
  resetPsdError: "",
  resetPsdResponse: null,
  password: null,
  changePsdResponse: null,
  changePsdError: "",
  changePsdLoading: false,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      state = {
        ...state,
        loading: true,
      };
      break;
    case LOGIN_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case LOGOUT_USER:
      state = { ...state };
      break;
    case LOGOUT_USER_SUCCESS:
      state = { ...state };
      break;
    case API_ERROR:
      return { ...state, error: action.payload, loading: false };
      break;

    case VERIFY_EMAIL:
      state = { ...state, forgotPsdLoading: true };
      break;
    case VERIFY_EMAIL_SUCCESS:
      state = {
        ...state,
        forgotPsdLoading: false,
        forgotPsdResponse: action.payload,
      };

      break;
    case VERIFY_EMAIL_ERROR:
      state = {
        ...state,
        forgotPsdLoading: false,
        forgotPsdError: action.payload,
      };
      break;

    case RESET_PASSWORD:
      state = { ...state, resetPsdLoading: true };
      break;
    case RESET_PASSWORD_SUCCESS:
      state = {
        ...state,
        resetPsdLoading: false,
        resetPsdResponse: action.payload,
      };

      break;
    case RESET_PASSWORD_ERROR:
      state = {
        ...state,
        resetPsdLoading: false,
        resetPsdError: action.payload,
      };
      break;

    case CLEAR_AUTH_RESPONSE:
      state = {
        ...state,
        forgotPsdResponse: null,
        resetPsdResponse: null,
        forgotPsdError: "",
        resetPsdError: "",
        forgotPsdLoading: false,
        resetPsdLoading: false,
        changePsdResponse: null,
        changePsdError: "",
      };

      break;

    case CHANGE_PASSWORD:
      state = { ...state, changePsdLoading: true, changePsdResponse: null };
      break;
    case CHANGE_PASSWORD_SUCCESS:
      state = {
        ...state,
        changePsdLoading: false,
        changePsdResponse: true,
        password: action.payload,
      };

      break;
    case CHANGE_PASSWORD_ERROR:
      state = {
        ...state,
        changePsdLoading: false,
        changePsdResponse: false,
        changePsdError: true,
      };
      break;

    default:
      state = { ...state };
      break;
  }
  return state;
};

export default loginReducer;
