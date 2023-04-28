import "toastr/build/toastr.min.css";

import {
  ADD_NEW_PRODUCT_LIST,
  ADD_NEW_PRODUCT_LIST_FAIL,
  ADD_NEW_PRODUCT_LIST_SUCCESS,
  ADD_TO_CART,
  CLEAR_CART,
  CLEAR_PRODUCT_IMAGES,
  CLEAR_SINGLE_IMAGE,
  DELETE_PRODUCT_LIST_FAIL,
  DELETE_PRODUCT_LIST_SUCCESS,
  GET_PRODUCT_LIST_FAIL,
  GET_PRODUCT_LIST_SUCCESS,
  QUANTITY_CHANGE,
  RESET_STATUS,
  UPDATE_PRODUCT_LIST,
  UPDATE_PRODUCT_LIST_FAIL,
  UPDATE_PRODUCT_LIST_SUCCESS,
  UPLOAD_PRODUCT_IMAGE,
  UPLOAD_PRODUCT_IMAGE_FAIL,
  UPLOAD_PRODUCT_IMAGE_SUCCESS
} from "./actionTypes";

import toastr from "toastr";

const INIT_STATE = {
  productList: null,
  QuantityofEachProduct: [],
  loading: false,
  error: null,
  added: false,
  updated: false,
  deleted: false,
  uploaded: false,
  imageUrls: [],
  imageLoading: false,
  imageError: null
};

const ProductListReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ADD_NEW_PRODUCT_LIST:
      return {
        ...state,
        loading: true,
        added: false
      };

    case ADD_NEW_PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        added: true
      };

    case ADD_NEW_PRODUCT_LIST_FAIL:
      return {
        ...state,
        loading: false,
        added: false,
        error: action.payload
      };

    case UPLOAD_PRODUCT_IMAGE:
      return {
        ...state,
        imageLoading: true,
        uploaded: false
      };

    case UPLOAD_PRODUCT_IMAGE_SUCCESS:
      return {
        ...state,
        imageLoading: false,
        imageUrls: state.imageUrls.concat(action.payload),
        uploaded: true
      };

    case UPLOAD_PRODUCT_IMAGE_FAIL:
      return {
        ...state,
        imageLoading: false,
        imageError: action.payload,
        uploaded: false
      };

    case QUANTITY_CHANGE:
      let cartRecord = state.QuantityofEachProduct;

      const recIndex = cartRecord.findIndex((t) => t._id == action.payload.record._id);

      if (recIndex == -1) {
        if (action.payload.action === "increment") {
          let rec = action.payload.record;
          rec["addToCart"] = 1;
          cartRecord.push(rec);
        } else if (action.payload.action === "input") {
          // if (action.payload.value > 0) {
          let rec = action.payload.record;
          rec["addToCart"] = action.payload.value;
          cartRecord.push(rec);
          // }
        }
      } else {
        if (action.payload.action === "increment") {
          // if (cartRecord[recIndex]["CartVisibility"]) {
          //   toastr.info("Item quantity has been changed");
          // }

          cartRecord[recIndex]["addToCart"]++;
        } else if (action.payload.action === "decrement") {
          if (cartRecord[recIndex]["addToCart"] == 1) {
            cartRecord[recIndex]["addToCart"]--;
            cartRecord[recIndex]["CartVisibility"] = false;
            toastr.info("Item has been removed.");

            cartRecord.splice(recIndex, 1);
          } else {
            // if (cartRecord[recIndex]["CartVisibility"]) {
            //   toastr.info("Item quantity has been changed");
            // }

            cartRecord[recIndex]["addToCart"]--;
          }
        } else if (action.payload.action === "remove") {
          cartRecord[recIndex]["addToCart"] = 0;
          cartRecord[recIndex]["CartVisibility"] = false;
          toastr.info("Item has been removed.");
          cartRecord.splice(recIndex, 1);
        } else if (action.payload.action === "input") {
          cartRecord[recIndex]["addToCart"] = action.payload.value;
        }
      }

      return {
        ...state,
        QuantityofEachProduct: cartRecord
      };

    case ADD_TO_CART:
      let cartRecordv2 = state.QuantityofEachProduct;

      const recIndexv2 = cartRecordv2.findIndex((t) => t._id == action.payload._id);

      if (recIndexv2 == -1) {
        //do nothing
      } else {
        cartRecordv2[recIndexv2]["CartVisibility"] = true;
        if (cartRecordv2[recIndexv2]["addToCart"] > 0) {
          toastr.success("Item has been added to cart");
        }
      }

      return {
        ...state,
        QuantityofEachProduct: cartRecordv2
      };

    case GET_PRODUCT_LIST_SUCCESS:
      // options from product list
      // let options = action.payload.data.map((item) => {
      //   return {
      //     value: item.code,
      //     label: item.name
      //   };
      // });

      return action.payload
        ? {
            ...state,
            productList: action.payload
          }
        : {
            ...state,
            productList: { message: "No Content Found" }
          };

    case GET_PRODUCT_LIST_FAIL:
      return {
        ...state,
        error: action.payload
      };

    case UPDATE_PRODUCT_LIST:
      return {
        ...state,
        updated: false
      };

    case UPDATE_PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        updated: true

        // productList: state.productList.map((data) => {
        //   return data.code.toString() === action.payload.data.code.toString()
        //     ? { data, ...action.payload.data }
        //     : data;
        // })
      };

    case UPDATE_PRODUCT_LIST_FAIL:
      return {
        ...state,
        error: action.payload,
        updated: false
      };

    case DELETE_PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        deleted: true

        // productList: state.productList.filter(
        //   (data) => data.code.toString() !== action.payload.data.code.toString()
        // )
      };

    case CLEAR_CART:
      const s = state.QuantityofEachProduct;
      s.forEach(function (item) {
        item.addToCart = 0;
        item.CartVisibility = false;
      });

      return {
        ...state,
        QuantityofEachProduct: s
      };

    case DELETE_PRODUCT_LIST_FAIL:
      return {
        ...state,
        error: action.payload,
        deleted: false
      };

    case CLEAR_PRODUCT_IMAGES:
      return {
        ...state,
        imageUrls: [],
        imageLoading: false,
        imageError: null
      };

    case CLEAR_SINGLE_IMAGE:
      const index = state.imageUrls.findIndex((data) => data.filename === action.payload);

      if (index > -1) {
        state.imageUrls.splice(index, 1);
      }

      return {
        ...state
      };

    case RESET_STATUS:
      return {
        ...state,
        loading: false,
        added: false,
        error: null,
        imageLoading: false,
        imageError: null,
        imageUrls: [],
        uploaded: false
      };

    default:
      return state;
  }
};

export default ProductListReducer;
