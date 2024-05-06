import {
  ADD_NEW_ORDER_MANAGEMENT,
  DELETE_ORDER_MANAGEMENT,
  EXPORT_ALL_ORDERS,
  GET_ORDER_DETAILS,
  GET_ORDER_MANAGEMENT,
  UPDATE_ORDER_MANAGEMENT,
} from "./actionTypes";
import {
  addNewOrderManagement,
  deleteOrderManagement,
  getAllOrders,
  getOrderDetails,
  getOrderManagement,
  updateOrderManagement,
} from "../../helpers/backend_helper";
import {
  addNewOrderManagementFail,
  addNewOrderManagementSuccess,
  deleteOrderManagementFail,
  deleteOrderManagementSuccess,
  getAllOrdersFail,
  getAllOrdersSuccess,
  getOrderDetailsFail,
  getOrderDetailsSuccess,
  getOrderManagementFail,
  getOrderManagementSuccess,
  updateOrderManagementFail,
  updateOrderManagementSuccess,
} from "./actions";
import { call, put, takeEvery } from "redux-saga/effects";

import { func } from "prop-types";

// OrderManagement Redux States

//Include Both Helper File with needed methods

function* fetchOrderManagement({ payload: rec }) {
  try {
    const response = yield call(getOrderManagement, rec);
    yield put(getOrderManagementSuccess(response));
  } catch (error) {
    yield put(getOrderManagementFail(error));
  }
}

function* fetchAllOrders({ payload: rec }) {
  try {
    const response = yield call(getAllOrders, rec);
    yield put(getAllOrdersSuccess(response));
  } catch (error) {
    yield put(getAllOrdersFail(error));
  }
}

function* fetchOrderDetails({ payload: rec }) {
  try {
    const response = yield call(getOrderDetails, rec);
    yield put(getOrderDetailsSuccess(response));
  } catch (error) {
    yield put(getOrderDetailsFail(error));
  }
}

function* onUpdateOrderManagement({ payload: rec }) {
  try {
    const response = yield call(updateOrderManagement, rec);
    yield put(updateOrderManagementSuccess(response));
  } catch (error) {
    yield put(updateOrderManagementFail(error));
  }
}

function* onAddNewOrderManagement({ payload: rec }) {
  try {
    const response = yield call(addNewOrderManagement, rec);
    if (response?.Success === true) {
      yield put(addNewOrderManagementSuccess(response));
    } else {
      yield put(addNewOrderManagementFail(response));
    }
  } catch (error) {
    yield put(addNewOrderManagementFail(error));
  }
}

function* onDeleteOrderManagement({ payload: rec }) {
  try {
    const response = yield call(deleteOrderManagement, rec);
    yield put(deleteOrderManagementSuccess(response));
  } catch (error) {
    yield put(deleteOrderManagementFail(error));
  }
}

function* OrderManagementSaga() {
  yield takeEvery(GET_ORDER_MANAGEMENT, fetchOrderManagement);
  yield takeEvery(ADD_NEW_ORDER_MANAGEMENT, onAddNewOrderManagement);
  yield takeEvery(UPDATE_ORDER_MANAGEMENT, onUpdateOrderManagement);
  yield takeEvery(DELETE_ORDER_MANAGEMENT, onDeleteOrderManagement);
  yield takeEvery(GET_ORDER_DETAILS, fetchOrderDetails);
  yield takeEvery(EXPORT_ALL_ORDERS, fetchAllOrders);
}

export default OrderManagementSaga;
