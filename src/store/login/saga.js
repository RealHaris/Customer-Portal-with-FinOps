import {
  CHANGE_PASSWORD,
  LOGIN_USER,
  LOGOUT_USER,
  RESET_PASSWORD,
  VERIFY_EMAIL
} from "./actionTypes";
import {
  ChangePasswordCall,
  Login,
  ResetPasswordCall,
  VerifyEmailCall
} from "../../helpers/backend_helper";
import {
  apiError,
  changePasswordError,
  changePasswordSuccess,
  loginSuccess,
  resetPasswordError,
  resetPasswordSuccess,
  verifyEmailError,
  verifyEmailSuccess
} from "./actions";
import { call, put, takeEvery } from "redux-saga/effects";

import toastr from "toastr";

function* loginUser({ payload: { user, history } }) {
  try {
    const response = yield call(Login, {
      email: user.email,
      password: user.password
    });

    // {status: 'Fail', message: 'Request failed with status code 500'}message: "Request failed with status code 500"status: "Fail"[[Prototype]]: Object

    // {"Success":false,"CustomerId":"","Message":"Login failed"}

    if (response?.status === "Fail") {
      toastr.error("please try again later", "Something went wrong");
      yield put(apiError(response));
    } else if (response?.Success === false) {
      toastr.error("Invalid Credentials");
      yield put(apiError(response));
    } else if (response?.data?.Success === true) {
      if (
        response?.access_token !== null &&
        response?.access_token !== undefined &&
        response?.access_token !== "" &&
        response?.access_token !== "null" &&
        response?.data?.CustomerId !== null &&
        response?.data?.CustomerId !== undefined &&
        response?.data?.CustomerId !== "" &&
        response?.data?.CustomerId !== "null"
      ) {
        localStorage.setItem("AccessToken", response.access_token);
        localStorage.setItem("CustomerId", response.data.CustomerId);
        localStorage.setItem("CustomerName", response.data.CustomerName);
        yield put(loginSuccess(response));
        history("/order-management");
      } else {
        toastr.error("Invalid Credentials");
        yield put(apiError(response));
      }
    }
  } catch (error) {
    yield put(apiError(error));
  }
}

function* logoutUser({ payload }) {
  try {
    yield localStorage.removeItem("AccessToken");
    yield localStorage.removeItem("CustomerId");

    yield payload("/login");
  } catch (error) {
    yield put(apiError(error));
  }
}

function* verifyEmail({ payload: rec }) {
  try {
    const response = yield call(VerifyEmailCall, rec);

    const response1 = {
      Success: true,
      CustomerId: "",
      Message: "OTP Sent to provided email",
      CustomerName: ""
    };

    const response2 = {
      status: "Fail",
      message: "An exception occured when invoking the operation - Email address not found"
    };

    if (
      response?.status === "Fail" &&
      response?.message ===
        "An exception occured when invoking the operation - Email address not found"
    ) {
      yield put(verifyEmailError(response));

      toastr.error("Email address not found");
    } else if (response?.Success === true) {
      toastr.success("OTP Sent to provided email");
      yield put(verifyEmailSuccess(response));
    } else {
      toastr.error("please try again later", "Something went wrong");
      yield put(verifyEmailError(response));
    }
  } catch (error) {
    yield put(verifyEmailError(error));
  }
}

function* resetPassword({ payload: rec }) {
  try {
    const response = yield call(ResetPasswordCall, rec);

    if (response?.Success === false && response?.Message === "Please enter valid OTP code") {
      yield put(resetPasswordError(response));

      toastr.error("OTP is not valid");
    } else if (
      response?.status === "Fail" &&
      response?.message ===
        "An exception occured when invoking the operation - Password must be at least 8 characters long."
    ) {
      yield put(resetPasswordError(response));
      toastr.error("Password must be at least 8 characters long");
    } else if (response?.Success === true) {
      toastr.success("Password reset successfully");
      yield put(resetPasswordSuccess(response));
    } else {
      toastr.error("please try again later", "Something went wrong");
      yield put(resetPasswordError(response));
    }
  } catch (error) {
    yield put(resetPasswordError(error));
  }
}

function* changePassword({ payload: rec }) {
  try {
    const response = yield call(ChangePasswordCall, rec);

    if (response?.Success === false && response?.Message === "Old password is invalid") {
      yield put(changePasswordError(response));
      toastr.error("Old password is invalid");
    } else if (
      response?.status === "Fail" &&
      response?.message ===
        "An exception occured when invoking the operation - Password must be at least 8 characters long."
    ) {
      yield put(changePasswordError(response));
      toastr.error("Password must be at least 8 characters long");
    } else if (response?.Success === true) {
      toastr.success("Password changed successfully");
      yield put(changePasswordSuccess(response));
    } else {
      // toastr.error("please try again later", "Something went wrong");
      yield put(changePasswordError(response));
    }
  } catch (error) {
    yield put(changePasswordError(error));
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser);
  yield takeEvery(LOGOUT_USER, logoutUser);
  yield takeEvery(VERIFY_EMAIL, verifyEmail);
  yield takeEvery(RESET_PASSWORD, resetPassword);
  yield takeEvery(CHANGE_PASSWORD, changePassword);
}

export default authSaga;
