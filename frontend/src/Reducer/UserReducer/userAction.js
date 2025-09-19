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
  updateUserReset,
  updatePasswordRequest,
  updatePasswordSuccess,
  updatePasswordFail,
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFail,
  deleteUserReset,
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

// ✅ Define your backend base URL
const API = axios.create({
  baseURL: "https://buylit-backend.onrender.com/api/v1",
  withCredentials: true, // if backend uses cookies/session
});

// get user
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    const { data } = await API.post(`/login`, { email, password });
    dispatch(loginSuccess(data.user));
  } catch (err) {
    console.log("error in login action", err);
    dispatch(loginFail(err.response?.data?.message || err.message));
  }
};

// logout user
export const logout = () => async (dispatch) => {
  try {
    await API.get(`/logout`);
    dispatch(logoutSuccess());
  } catch (err) {
    console.log("error in logout", err);
    dispatch(logoutFail(err.response?.data?.message || err.message));
  }
};

// load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch(loadUserRequest());
    const { data } = await API.get(`/me`);
    dispatch(loadUserSuccess(data.user));
  } catch (err) {
    console.log("error in load user action", err);
    dispatch(loadUserFail(err.response?.data?.message || err.message));
  }
};

// register user
export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch(registerUserRequest());
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await API.post(`/register`, userData, config);
    dispatch(registerUserSuccess(data.user));
  } catch (err) {
    console.log("error in register user", err);
    dispatch(registerUserFail(err.response?.data?.message || err.message));
  }
};

// update user name and email
export const updateUser = (updatedData) => async (dispatch) => {
  try {
    dispatch(updateUserRequest());
    const { data } = await API.put(`/me/update`, updatedData);
    dispatch(updateUserSuccess(data.success));
  } catch (err) {
    console.log("error in updateUser action");
    dispatch(updateUserFail(err.response?.data?.message || err.message));
  }
};

// update user password
export const updatePassowrd = (userData) => async (dispatch) => {
  try {
    dispatch(updatePasswordRequest());
    const { data } = await API.put(`/password/update`, userData);
    dispatch(updatePasswordSuccess(data.success));
  } catch (err) {
    console.log("error in update password action", err);
    dispatch(updatePasswordFail(err.response?.data?.message || err.message));
  }
};

// delete user - Admin
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch(deleteUserRequest());
    const { data } = await API.delete(`/admin/user/${id}`);
    dispatch(deleteUserSuccess(data));
  } catch (err) {
    dispatch(deleteUserFail(err.response?.data?.message || err.message));
  }
};

// get all users - Admin
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch(allUsersRequest());
    const { data } = await API.get(`/admin/users`);
    dispatch(allUsersSuccess(data.users));
  } catch (error) {
    dispatch(allUsersFail(error.response?.data?.message || error.message));
  }
};

// get user details - Admin
export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch(userDetailsRequest());
    const { data } = await API.get(`/admin/user/${id}`);
    dispatch(userDetailsSuccess(data.user));
  } catch (err) {
    dispatch(userDetailsFail(err.response?.data?.message || err.message));
  }
};

// update user role - Admin
export const updateUserRole = (id, userData) => async (dispatch) => {
  try {
    dispatch(updateUserRequest());
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await API.put(`/admin/user/${id}`, userData, config);
    dispatch(updateUserSuccess(data.success));
  } catch (err) {
    dispatch(updateUserFail(err.response?.data?.message || err.message));
  }
};

// clearing errors
export const clearError = () => async (dispatch) => {
  dispatch(clearErrors());
};
