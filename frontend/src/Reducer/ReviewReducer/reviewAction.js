import axios from "axios";
import {
  newReviewRequest,
  newReviewSuccess,
  newReviewFail,
  clearErrors,
} from "./reviewReducer";

import {
  deleteReviewRequest,
  deleteReviewSuccess,
  deleteReviewFail,
} from "./reviewReducerD";

import {
  allReviewFail,
  allReviewRequest,
  allReviewSuccess,
} from "./allReviewReducer";

// ✅ Base API URL (Render backend in .env, fallback to localhost)
const API = process.env.REACT_APP_API_URL || "https://buylit-backend.onrender.com/api/v1";

// ------------------- CREATE NEW REVIEW -------------------
export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch(newReviewRequest());

    const config = { headers: { "Content-Type": "application/json" }, withCredentials: true };

    const { data } = await axios.put(`${API}/review`, reviewData, config);

    dispatch(newReviewSuccess(data.success));
  } catch (err) {
    console.log("error in new review action", err);
    dispatch(newReviewFail(err.response?.data?.message || err.message));
  }
};

// ------------------- DELETE REVIEW (ADMIN) -------------------
export const deleteReviews = (id, productId) => async (dispatch) => {
  console.log("Deleting review:", id, "for product:", productId);

  try {
    dispatch(deleteReviewRequest());

    const { data } = await axios.delete(
        `${API}/reviews?id=${id}&productId=${productId}`,{ withCredentials: true}
    );

    console.log(data);

    dispatch(deleteReviewSuccess(data.success));
  } catch (err) {
    console.log(err);
    dispatch(deleteReviewFail(err.response?.data?.message || err.message));
  }
};

// ------------------- GET ALL REVIEWS -------------------
export const getAllReviews = (id) => async (dispatch) => {
  try {
    dispatch(allReviewRequest());

    const { data } = await axios.get(`${API}/reviews?id=${id}`,{withCredentials: true);

    dispatch(allReviewSuccess(data.reviews));
  } catch (err) {
    dispatch(allReviewFail(err.response?.data?.message || err.message));
  }
};

// ------------------- CLEAR ERRORS -------------------
export const clearError = () => async (dispatch) => {
  dispatch(clearErrors());
};
