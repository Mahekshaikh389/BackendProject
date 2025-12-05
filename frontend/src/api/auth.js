import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000", 
});

// REGISTER
export const registerUser = async ({ name, email, password, role }) => {
  const res = await API.post("/api/v1/auth/register", {
    name,
    email,
    password,
    role,
  });
  return res.data;
};

// LOGIN
export const loginUser = async ({ email, password }) => {
  const res = await API.post("/api/v1/auth/login", {
    email,
    password,
  });
  return res.data;
};
