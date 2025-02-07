import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api"; //  Backend API Base URL

const API = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // Required for authentication
});

// Automatically Attach Token to Requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle Unauthorized & Expired Token Errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      logout(); 
      window.location.href = "/login"; // Redirect to login page
    }
    return Promise.reject(error.response?.data?.message || "An error occurred.");
  }
);

// Signup (User Registration)
export const signup = async (userData) => {
  try {
    const response = await API.post("/auth/signup", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Login (User Authentication)
export const login = async (credentials) => {
  try {
    const response = await API.post("/auth/login", credentials);
    localStorage.setItem("token", response.data.token); // ✅ Store token
    return response.data;
  } catch (error) {
    throw error.response?.data || "Login failed. Please try again.";
  }
};

// Logout (Remove Token)
export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login"; // 🔥 Redirect to login after logout
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!localStorage.getItem("token"); //  Returns true if token exists
};

// Fetch Categories (Authenticated)
export const getCategories = async () => {
  try {
    const response = await API.get("/categories");
    return response.data;
  } catch (error) {
    throw error;
  }
};

//  Fetch Menu Items (Authenticated)
export const getMenuItems = async () => {
  try {
    const response = await API.get("/menu");
    return response.data;
  } catch (error) {
    throw error;
  }
};

//  Base URL for Categories
const API_BASE_URL_CATEGORIES = "http://localhost:8080/api/categories";

// Fetch Pizzas
export const getPizzas = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL_CATEGORIES}/pizzas`);
    return response.data;
  } catch (error) {
    console.error("Error fetching pizzas:", error);
    return [];
  }
};

//  Fetch Chinese Food
export const getChineseFood = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL_CATEGORIES}/chinese`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Chinese food:", error);
    return [];
  }
};

// Fetch Cakes
export const getCakes = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL_CATEGORIES}/cakes`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Cakes:", error);
    return [];
  }
};

// Fetch Cocktails
export const getCocktails = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL_CATEGORIES}/cocktails`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Cocktails:", error);
    return [];
  }
};

// Fetch Mexican Food
export const getMexicanFood = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL_CATEGORIES}/mexican`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Mexican Food:", error);
    return [];
  }
};
