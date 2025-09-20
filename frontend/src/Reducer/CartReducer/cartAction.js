import axios from "axios";
import { addToCart, removeCartItem, saveShippingInfo } from "./cartReducer";

// ✅ Base API URL (Render backend in .env, fallback to localhost)
const API = process.env.REACT_APP_API_URL || "https://buylit-backend.onrender.com/api/v1";

// ------------------- ADD TO CART -------------------
export const addtocart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`${API}/products/${id}`,{withCredentials: true});

  dispatch(
    addToCart({
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.image[0].url,
      stock: data.product.stock,
      quantity,
    })
  );

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// ------------------- REMOVE FROM CART -------------------
export const removetocart = (id) => async (dispatch, getState) => {
  dispatch(removeCartItem(id));
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// ------------------- SAVE SHIPPING INFO -------------------
export const saveshippingInfo = (data) => async (dispatch) => {
  dispatch(saveShippingInfo(data));
  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
