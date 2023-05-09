import AccountStatement from "../views/accountStatement/Main";
import ErrorPage from "../views/errorPage/Main";
import ForgotPassword from "../views/forgotPassword/Main";
import Invoices from "../views/Invoices/Main";
import Login from "../views/login/Main";
import Logout from "../components/Logout";
import OrderManagement from "../views/orderManagement/Main";
import Profile from "../views/Profile/Main";
import Register from "../views/register/Main";
import ResetPassword from "../views/resetPassword/Main";
import createSalesOrder from "../views/createSalesOrder/Main";

const authProtectedRoutes = [
  { path: "/", component: OrderManagement, role: "customer" },
  { path: "/order-management", component: OrderManagement, role: "customer" },
  { path: "/create-sales-order", component: createSalesOrder, role: "customer" },
  {
    path: "/profile",
    component: Profile,
    role: "customer"
  },
  {
    path: "/invoices",
    component: Invoices,
    role: "customer"
  },
  {
    path: "/account-statement",
    component: AccountStatement,
    role: "customer"
  }
];

const publicRoutes = [
  { path: "/", component: Login },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/logout", component: Logout },
  { path: "/error-page", component: ErrorPage },
  {
    path: "/forgot-password",
    component: ForgotPassword
  },
  {
    path: "/reset-password",
    component: ResetPassword
  },
  { path: "*", component: ErrorPage }
];

export { authProtectedRoutes, publicRoutes };
