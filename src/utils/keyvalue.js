const keyValue = {
  optionsPerPage: [
    { value: 10, label: "10" },
    { value: 25, label: "25" },
    { value: 35, label: "35" },
    { value: 50, label: "50" },
  ],

  optionsOrderStatus: [
    { value: "none", label: "None" },
    { value: "openOrder", label: "Open Order" },
    { value: "delivered", label: "Delivered" },
    { value: "invoiced", label: "Invoiced" },
    { value: "cancelled", label: "Cancelled" },
  ],
  orderStatus: [
    { value: "paid", label: "Paid" },
    { value: "refund", label: "Refund" },
    { value: "unpaid", label: "Unpaid" },
  ],
};

export { keyValue as keyValue };
