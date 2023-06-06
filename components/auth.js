import React, { createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [tokenH, setTokenH] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);

  const login = async (token) => {
    setLoggedIn(true);
    setShowLoginModal(true);
    setTokenH(token);
    try {
      await AsyncStorage.setItem('token', token);
    } catch (error) {
      console.error(error);
    }
  };

  const getToken = async () => {
    if (!tokenH) {
      try {
        const token = await AsyncStorage.getItem('token');
        setTokenH(token);
      } catch (error) {
        console.error(error);
      }
    }
    return tokenH;
  };

  const logout = async () => {
    setLoggedIn(false);
    setShowLoginModal(false);
    setTokenH('');
    try {
      await AsyncStorage.removeItem('token');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider value={{ loggedIn, tokenH, showLoginModal, login, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};
