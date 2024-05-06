import {
  ADD_NEW_ORDER_MANAGEMENT,
  ADD_NEW_ORDER_MANAGEMENT_FAIL,
  ADD_NEW_ORDER_MANAGEMENT_SUCCESS,
  CLEAR_RESPONSE_STATUS,
  DELETE_ORDER_MANAGEMENT_FAIL,
  DELETE_ORDER_MANAGEMENT_SUCCESS,
  EXPORT_ALL_ORDERS_FAIL,
  EXPORT_ALL_ORDERS_SUCCESS,
  GET_ORDER_DETAILS_FAIL,
  GET_ORDER_DETAILS_SUCCESS,
  GET_ORDER_MANAGEMENT,
  GET_ORDER_MANAGEMENT_FAIL,
  GET_ORDER_MANAGEMENT_SUCCESS,
  UPDATE_ORDER_MANAGEMENT_FAIL,
  UPDATE_ORDER_MANAGEMENT_SUCCESS
} from "./actionTypes";

const INIT_STATE = {
  orderManagements: null,
  orderDetailsState: {},
  allOrders: [],
  added: null,
  addedResponse: null,
  error: null,
  loading: false,
  fetched: false,
  loadingforAdd: false
};

const OrderManagementReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        orderDetailsState: action.payload
      };

    case GET_ORDER_DETAILS_FAIL:
      return {
        ...state
        // error: action.payload
      };

    case ADD_NEW_ORDER_MANAGEMENT:
      return {
        ...state,
        loadingforAdd: true,
        addedResponse: null,
        added: false
      };

    case ADD_NEW_ORDER_MANAGEMENT_SUCCESS:
      return {
        ...state,
        loadingforAdd: false,
        addedResponse: action.payload,
        added: true
        // orderManagements: [...state.orderManagements, action.payload],
      };

    case ADD_NEW_ORDER_MANAGEMENT_FAIL:
      return {
        ...state,
        loadingforAdd: false,
        addedResponse: null,
        error: action.payload
      };

    case GET_ORDER_MANAGEMENT:
      return {
        ...state,
        orderManagements: null,
        loading: true
      };

    case GET_ORDER_MANAGEMENT_SUCCESS:
      return {
        ...state,
        orderManagements: action.payload,
        loading: false,
        fetched: true
      };

    // return action.payload
    //   ? {
    //       ...state,
    //       orderManagements: action.payload
    //     }
    //   : {
    //       ...state,
    //       orderManagements: { message: "No Content Found" }
    //     };

    // return {
    //   ...state,
    //   orderManagements: action.payload,
    // };

    case GET_ORDER_MANAGEMENT_FAIL:
      return {
        ...state,
        // error: action.payload,
        loading: false
      };

    case UPDATE_ORDER_MANAGEMENT_SUCCESS:
      return {
        ...state,
        orderManagements: state.orderManagements.map((data) => {
          return data.code.toString() === action.payload.data.code.toString()
            ? { data, ...action.payload.data }
            : data;
        })
      };

    case UPDATE_ORDER_MANAGEMENT_FAIL:
      return {
        ...state,
        error: action.payload
      };

    case DELETE_ORDER_MANAGEMENT_SUCCESS:
      return {
        ...state,
        orderManagements: state.orderManagements.filter(
          (data) => data.code.toString() !== action.payload.data.code.toString()
        )
      };

    case DELETE_ORDER_MANAGEMENT_FAIL:
      return {
        ...state,
        error: action.payload
      };

    // case EXPORT_ALL_ORDERS:
    //   return {};

    case EXPORT_ALL_ORDERS_SUCCESS:
      return {
        ...state,
        allOrders: action.payload
      };

    case EXPORT_ALL_ORDERS_FAIL:
      return {
        ...state,
        error: action.payload
      };

    case CLEAR_RESPONSE_STATUS:
      return {
        ...state,
        added: false,
        error: null
      };

    default:
      return state;
  }
};

export default OrderManagementReducer;
