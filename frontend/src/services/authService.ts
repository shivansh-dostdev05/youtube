
import axios from "axios";

const AUTH_URL = "http://localhost:5000/auth";

export const loginWithGoogle = () => {
  window.location.href = `${AUTH_URL}/google`;
};

export const getCurrentUser = async () => {
  const response = await axios.get(`${AUTH_URL}/user`, {
    withCredentials: true,
  });

  return response.data;
};

export const logoutUser = async () => {
  const response = await axios.get(`${AUTH_URL}/logout`, {
    withCredentials: true,
  });

  return response.data;
};
