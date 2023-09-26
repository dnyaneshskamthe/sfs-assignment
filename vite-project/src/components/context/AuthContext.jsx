import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const getUserFromLocalStorage = () => {
    const token = localStorage.getItem('token');
    return token ? { token } : null;
  };

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(getUserFromLocalStorage()); // Call the function here

  const login = (token, username) => {
    // Save the token in local storage or a cookie
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);

    // Set the user state with the token
    setUser({ token, username });
  };

  const logout = () => {
    // Remove the token from local storage or a cookie
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    // Clear the user state
    setUser(null);
  };

  const isAuthenticated = () => {
    return !!user?.token; // Check if user has a token
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
