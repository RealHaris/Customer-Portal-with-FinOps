import {
  API_ERROR,
  AZURE_LOGIN_ERROR,
  AZURE_LOGIN_SUCCESS,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_ERROR,
  CHANGE_PASSWORD_SUCCESS,
  CLEAR_AUTH_RESPONSE,
  LOGIN_SUCCESS,
  LOGIN_USER,
  LOGIN_WITH_AZURE,
  LOGIN_WITH_AZURE_ERROR,
  LOGIN_WITH_AZURE_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  RESET_PASSWORD,
  RESET_PASSWORD_ERROR,
  RESET_PASSWORD_SUCCESS,
  VERIFY_EMAIL,
  VERIFY_EMAIL_ERROR,
  VERIFY_EMAIL_SUCCESS
} from "./actionTypes";

export const loginUser = (user, history) => {
  return {
    type: LOGIN_USER,
    payload: { user, history }
  };
};

export const loginSuccess = (user) => {
  return {
    type: LOGIN_SUCCESS,
    payload: user
  };
};

export const logoutUser = (navigate) => {
  return {
    type: LOGOUT_USER,
    payload: navigate
  };
};

export const logoutUserSuccess = () => {
  return {
    type: LOGOUT_USER_SUCCESS,
    payload: {}
  };
};

export const apiError = (error) => {
  return {
    type: API_ERROR,
    payload: error
  };
};

export const loginWithAzure = (history) => {
  return {
    type: LOGIN_WITH_AZURE,
    payload: history
  };
};

export const loginWithAzureSuccess = (user) => {
  return {
    type: LOGIN_WITH_AZURE_SUCCESS,
    payload: user
  };
};

export const loginWithAzureError = (error) => {
  return {
    type: LOGIN_WITH_AZURE_ERROR,
    payload: error
  };
};

export const azureLoginResponseSuccess = (response) => {
  return {
    type: AZURE_LOGIN_SUCCESS,
    payload: response
  };
};

export const azureLoginResponseError = (error) => {
  return {
    type: AZURE_LOGIN_ERROR,
    payload: error
  };
};

export const verifyEmail = (email) => {
  return {
    type: VERIFY_EMAIL,
    payload: email
  };
};

export const verifyEmailSuccess = (response) => {
  return {
    type: VERIFY_EMAIL_SUCCESS,
    payload: response
  };
};

export const verifyEmailError = (error) => {
  return {
    type: VERIFY_EMAIL_ERROR,
    payload: error
  };
};

export const resetPassword = (rec) => {
  return {
    type: RESET_PASSWORD,
    payload: rec
  };
};

export const resetPasswordSuccess = (response) => {
  return {
    type: RESET_PASSWORD_SUCCESS,
    payload: response
  };
};

export const resetPasswordError = (error) => {
  return {
    type: RESET_PASSWORD_ERROR,
    payload: error
  };
};

export const clearAuthResponse = () => {
  return {
    type: CLEAR_AUTH_RESPONSE,
    payload: {}
  };
};

export const changePassword = (rec) => {
  return {
    type: CHANGE_PASSWORD,
    payload: rec
  };
};

export const changePasswordSuccess = (response) => {
  return {
    type: CHANGE_PASSWORD_SUCCESS,
    payload: response
  };
};

export const changePasswordError = (error) => {
  return {
    type: CHANGE_PASSWORD_ERROR,
    payload: error
  };
};
