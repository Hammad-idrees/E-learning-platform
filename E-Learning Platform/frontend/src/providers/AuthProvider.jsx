import React, { useState, useEffect } from "react";
import {
  saveToken,
  removeToken,
  saveUser,
  removeUser,
  initializeAuth,
} from "../services/auth";
import { AuthContext } from "../contexts/AuthContext";

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({
    user: null,
    token: null,
    isLoading: true,
  });

  // Initialize auth state on mount
  useEffect(() => {
    const { token, user } = initializeAuth();
    setAuthState({ user, token, isLoading: false });
  }, []);

  const login = async (userData, token) => {
    const normalizedUser = { ...userData, isAdmin: !!userData.isAdmin };

    saveToken(token);
    saveUser(normalizedUser);

    setAuthState({
      user: normalizedUser,
      token,
      isLoading: false,
    });
  };

  const logout = () => {
    removeToken();
    removeUser();
    setAuthState({
      user: null,
      token: null,
      isLoading: false,
    });
  };

  // Update user data (e.g., after profile update)
  const updateUser = (userData) => {
    saveUser(userData);
    setAuthState((prev) => ({
      ...prev,
      user: userData,
    }));
  };

  const value = {
    user: authState.user,
    token: authState.token,
    isLoading: authState.isLoading,
    login,
    logout,
    updateUser,
    isAuthenticated: !!authState.token,
  };

  return (
    <AuthContext.Provider value={value}>
      {!authState.isLoading && children}
    </AuthContext.Provider>
  );
}
