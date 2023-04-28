import { atom } from "recoil";

const sideMenuforAdmin = atom({
  key: "sideMenuforAdmin",
  default: {
    menuforAdmin: [
      // {
      //   icon: "Home",
      //   pathname: "/admin-panel",
      //   title: "Admin Panel"
      // },
      // {
      //   icon: "Layout",
      //   pathname: "/manage-users",
      //   title: "Manage Users"
      // },
      // {
      //   icon: "DollarSign",
      //   pathname: "/plans",
      //   title: "Plans & Pricing"
      // },
      // {
      //   icon: "ShoppingBag",
      //   pathname: "/products",
      //   title: "Products"
      // },
      // {
      //   icon: "Grid",
      //   pathname: "/sales-order",
      //   title: "Sales Order"
      // },
      // {
      //   icon: "Grid",
      //   pathname: "/contacts",
      //   title: "Contacts"
      // },
      // {
      //   icon: "Grid",
      //   pathname: "/vendors",
      //   title: "Vendors"
      // }
    ]
  }
});

export { sideMenuforAdmin };
