import { API_BASE_URL } from "@/utils";
import axios from "axios";
import toast from "react-hot-toast";

export const signup = (userData, navigate) => async (dispatch) => {
  dispatch({ type: "AUTH_REQUEST" });
  try {
    const response = await axios.post(`${API_BASE_URL}/signup`, userData);
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("userid", response.data.payload.user.id);
    localStorage.setItem("username", response.data.payload.user.name);
    localStorage.setItem("email", response.data.payload.user.email);
    dispatch({ type: "AUTH_SUCCESS", payload: response.data });
    navigate("/");
  } catch (error) {
    alert(error.response.data.msg);
    if (error.response.data.msg == "User already exists") {
      toast.dismiss();
      toast.error("Account with this email already exists!");
    }
    dispatch({ type: "AUTH_FAILURE", payload: error.response.data });
  }
};

export const signin = (userData, navigate) => async (dispatch) => {
  dispatch({ type: "AUTH_REQUEST" });
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, userData);
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("userid", response.data.payload.user.id);
    localStorage.setItem("username", response.data.payload.user.name);
    localStorage.setItem("email", response.data.payload.user.email);
    dispatch({ type: "AUTH_SUCCESS", payload: response.data });
    navigate("/");
  } catch (error) {
    if (error.response.data.msg == "Invalid credentials") {
      toast.dismiss();
      toast.error("Invalid Credentials!");
    }
    dispatch({ type: "AUTH_FAILURE", payload: error.response.data });
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: "LOGOUT" });
};
