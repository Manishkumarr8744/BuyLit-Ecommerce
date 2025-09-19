import {
  allProductRequest,
  adminProductRequest,
  allProductSuccess,
  adminProductSuccess,
  allProductFail,
  adminProductFail,
  clearErrors,
} from "./ProductReducer";

import {
  productDetailsRequest,
  productDetailsSuccess,
  productDetailsFail,
} from "./productDetailsReducer";

import {
  deleteProductRequest,
  updateProductRequest,
  deleteProductSuccess,
  updateProductSuccess,
  deleteProductFail,
  updateProductFail,
  deleteProductReset,
  updateProductReset,
} from "./ProductReducers";

import {
  newProductRequest,
  newProductSuccess,
  newProductFail,
} from "./newProductReducer";

import axios from "axios";

// ✅ Use env var if available, otherwise localhost
const API = process.env.REACT_APP_API_URL || "https://buylit-backend.onrender.com/api/v1";

// ------------------- GET ALL PRODUCTS -------------------
export const getProduct =
  (keyword = "", currentPage = 1, price = [0, 25000], category, ratings = 0) =>
  async (dispatch) => {
    try {
      dispatch(allProductRequest());

      let link = `${API}/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

      if (category) {
        link += `&category=${category}`;
      }

      const { data } = await axios.get(link);

      dispatch(allProductSuccess(data));
    } catch (error) {
      dispatch(allProductFail(error.response?.data?.message || error.message));
    }
  };

// ------------------- GET SINGLE PRODUCT -------------------
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch(productDetailsRequest());

    const { data } = await axios.get(`${API}/products/${id}`);

    dispatch(productDetailsSuccess(data.product));
  } catch (err) {
    console.log("error in getProductDetails action", err);
    dispatch(productDetailsFail(err.response?.data?.message || err.message));
  }
};

// ------------------- UPDATE PRODUCT (ADMIN) -------------------
export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch(updateProductRequest());

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `${API}/api/v1/admin/products/${id}`,
      productData,
      config
    );

    dispatch(updateProductSuccess(data));
  } catch (err) {
    dispatch(updateProductFail(err.response?.data?.message || err.message));
  }
};

// ------------------- GET ALL ADMIN PRODUCTS -------------------
export const getAdminProduct = () => async (dispatch) => {
  try {
    dispatch(adminProductRequest());

    const { data } = await axios.get(`${API}/admin/products`);

    dispatch(adminProductSuccess(data.products));
  } catch (err) {
    dispatch(adminProductFail(err.response?.data?.message || err.message));
  }
};

// ------------------- DELETE PRODUCT (ADMIN) -------------------
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch(deleteProductRequest());

    const { data } = await axios.delete(`${API}/admin/products/${id}`);

    dispatch(deleteProductSuccess(data.success));
  } catch (err) {
    dispatch(deleteProductFail(err.response?.data?.message || err.message));
  }
};

// ------------------- CREATE PRODUCT (ADMIN) -------------------
export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch(newProductRequest());

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `${API}/admin/products/new`,
      productData,
      config
    );

    dispatch(newProductSuccess(data.success));
  } catch (err) {
    console.log(err);
    dispatch(newProductFail(err.response?.data?.message || err.message));
  }
};

// ------------------- CLEAR ERRORS -------------------
export const ClearErrors = () => async (dispatch) => {
  dispatch(clearErrors());
};
