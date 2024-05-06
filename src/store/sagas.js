import { all, fork } from "redux-saga/effects";

import InvoicesSaga from "./Invoices/saga";
import OrderManagementSaga from "./orderManagement/saga";
import ProductListSaga from "./productList/saga";
import SalesOrderListSaga from "./salesOrderList/saga";
import authSaga from "./login/saga";
import watchAccountStatement from "./accountStatement/saga";

//public

export default function* rootSaga() {
  yield all([
    //public
    fork(OrderManagementSaga),
    fork(ProductListSaga),
    fork(SalesOrderListSaga),
    fork(authSaga),
    fork(InvoicesSaga),
    fork(watchAccountStatement)
  ]);
}
