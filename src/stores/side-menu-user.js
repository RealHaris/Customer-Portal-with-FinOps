import { atom } from "recoil";

const sideMenuforUser = atom({
  key: "sideMenuforUser",
  default: {
    menuforUser: [
      {
        icon: "Home",
        pathname: "/order-management",
        title: "Order Management"
      },

      {
        icon: "PackagePlus",
        pathname: "/create-sales-order",
        title: "Create Sales Order"
      },
      {
        icon: "ClipboardCheck",
        pathname: "/invoices",
        title: "Invoice History"
      },
      {
        icon: "User",
        pathname: "/account-statement",
        title: "Account Statement"
      },
      {
        icon: "CreditCard",
        pathname: "/payment-details",
        title: "Payment Details"
      }
    ]
  }
});

export { sideMenuforUser };
