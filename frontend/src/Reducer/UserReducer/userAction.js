import {
  loginRequest,
  loginSuccess,
  loginFail,
  registerUserRequest,
  registerUserSuccess,
  registerUserFail,
  loadUserRequest,
  loadUserSuccess,
  loadUserFail,
  logoutSuccess,
  logoutFail,
  clearErrors,
} from "./userReducer";

import {
  updateUserFail,
  updateUserRequest,
  updateUserSuccess,
  updatePasswordRequest,
  updatePasswordSuccess,
  updatePasswordFail,
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFail,
} from "./userProfleReducer";

import {
  userDetailsRequest,
  userDetailsSuccess,
  userDetailsFail,
} from "./userDetails";

import {
  allUsersRequest,
  allUsersSuccess,
  allUsersFail,
} from "./allUserReducer";

import axios from "axios";

// ✅ Use environment variable or fallback to localhost
const API = process.env.REACT_APP_API_URL || "https://buylit-backend.onrender.com/api/v1";

// ------------------- LOGIN USER -------------------
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(loginRequest());

    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true, // ✅ important for sending/receiving cookies
    };

    const { data } = await axios.post(`${API}/login`, { email, password }, config);

    dispatch(loginSuccess(data.user));
  } catch (err) {
    dispatch(loginFail(err.response?.data?.message || err.message));
  }
};

// ------------------- LOGOUT USER -------------------
export const logout = () => async (dispatch) => {
  try {
    await axios.get(`${API}/logout`,{withCredentials: true});
    dispatch(logoutSuccess());
  } catch (err) {
    dispatch(logoutFail(err.response?.data?.message || err.message));
  }
};

// ------------------- LOAD USER -------------------
export const loadUser = () => async (dispatch) => {
  try {
    dispatch(loadUserRequest());
    
    const { data } = await axios.get(`${API}/me`,{withCredentials: true});
    dispatch(loadUserSuccess(data.user));
  } catch (err) {
    dispatch(loadUserFail(err.response?.data?.message || err.message));
  }
};

// ------------------- REGISTER USER -------------------
export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch(registerUserRequest());
    const config = { headers: { "Content-Type": "application/json" }, withCredentials: true, };
    const { data } = await axios.post(`${API}/register`, userData, config);
    dispatch(registerUserSuccess(data.user));
  } catch (err) {
    dispatch(registerUserFail(err.response?.data?.message || err.message));
  }
};

// ------------------- UPDATE USER -------------------
export const updateUser = (updatedData) => async (dispatch) => {
  try {
    dispatch(updateUserRequest());
     const config = { headers: { "Content-Type": "application/json" }, withCredentials: true, };
    const { data } = await axios.put(`${API}/me/update`, updatedData,config);
    dispatch(updateUserSuccess(data.success));
  } catch (err) {
    dispatch(updateUserFail(err.response?.data?.message || err.message));
  }
};

// ------------------- UPDATE PASSWORD -------------------
export const updatePassword = (userData) => async (dispatch) => {
  try {
    dispatch(updatePasswordRequest());
    const config = { headers: { "Content-Type": "application/json" }, withCredentials: true, };
    const { data } = await axios.put(`${API}/password/update`, userData,config);
    dispatch(updatePasswordSuccess(data.success));
  } catch (err) {
    dispatch(updatePasswordFail(err.response?.data?.message || err.message));
  }
};

// ------------------- DELETE USER (ADMIN) -------------------
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch(deleteUserRequest());
    const { data } = await axios.delete(`${API}/admin/user/${id}`,{withCredentials: true});
    dispatch(deleteUserSuccess(data));
  } catch (err) {
    dispatch(deleteUserFail(err.response?.data?.message || err.message));
  }
};

// ------------------- GET ALL USERS (ADMIN) -------------------
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch(allUsersRequest());
    const { data } = await axios.get(`${API}/admin/users`,{withCredentials: true});
    dispatch(allUsersSuccess(data.users));
  } catch (err) {
    dispatch(allUsersFail(err.response?.data?.message || err.message));
  }
};

// ------------------- GET USER DETAILS (ADMIN) -------------------
export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch(userDetailsRequest());
    const { data } = await axios.get(`${API}/admin/user/${id}`,{withCredentials: true});
    dispatch(userDetailsSuccess(data.user));
  } catch (err) {
    dispatch(userDetailsFail(err.response?.data?.message || err.message));
  }
};

// ------------------- UPDATE USER ROLE (ADMIN) -------------------
export const updateUserRole = (id, userData) => async (dispatch) => {
  try {
    dispatch(updateUserRequest());
    const config = { headers: { "Content-Type": "application/json" },withCredentials: true };
    const { data } = await axios.put(`${API}/admin/user/${id}`, userData, config);
    dispatch(updateUserSuccess(data.success));
  } catch (err) {
    dispatch(updateUserFail(err.response?.data?.message || err.message));
  }
};

// ------------------- CLEAR ERRORS -------------------
export const clearError = () => async (dispatch) => {
  dispatch(clearErrors());
};
