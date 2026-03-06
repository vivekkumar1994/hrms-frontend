import axios from "axios";

const API = axios.create({
  baseURL: "https://hrms-backend-cqqc.onrender.com",
});

export default API;