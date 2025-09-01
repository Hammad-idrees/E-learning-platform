import api from "../utils/axios";

// User storage keys
const TOKEN_KEY = "afaqnama_token";
const USER_KEY = "afaqnama_user";

// Auth API calls
export const login = async (email, password) => {
  try {
    const res = await api.post("/auth/login", { email, password });
    // Normalize response shape to what UI expects
    const payload = res.data?.data || {};
    return {
      token: payload.token,
      data: payload,
    };
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const signup = async (data) => {
  try {
    const res = await api.post("/auth/signup", data);
    // Normalize response shape to what UI expects
    const payload = res.data?.data || {};
    return {
      token: payload.token,
      data: payload,
    };
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Token management
export const saveToken = (token) => {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
    // Set token in API headers
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  delete api.defaults.headers.common["Authorization"];
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

// User data management
export const saveUser = (userData) => {
  if (userData) {
    localStorage.setItem(USER_KEY, JSON.stringify(userData));
  }
};

export const removeUser = () => {
  localStorage.removeItem(USER_KEY);
};

export const getUser = () => {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const initializeAuth = () => {
  const token = getToken();
  const user = getUser();

  if (token && user) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return { token, user: { ...user, isAdmin: !!user.isAdmin } };
  }

  return { token: null, user: null };
};

export const logout = () => {
  removeToken();
  removeUser();
};
