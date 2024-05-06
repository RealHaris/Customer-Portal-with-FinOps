import AccountStatementReducer from "./accountStatement/reducer";
import InvoicesReducer from "./Invoices/reducer";
import LoginReducer from "./login/reducer";
import OrderManagementReducer from "./orderManagement/reducer";
import ProductListReducer from "./productList/reducer";
import SalesOrderListReducer from "./salesOrderList/reducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  OrderManagementReducer,
  ProductListReducer,
  SalesOrderListReducer,
  LoginReducer,
  InvoicesReducer,
  AccountStatementReducer
});

export default rootReducer;
