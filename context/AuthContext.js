import { createContext, useState, useContext } from 'react';
import Cookies from 'js-cookie'; // Ensure Cookies is imported

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider component that wraps around the children components to provide the context
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // login function to set the user data and store the token in cookies
  const login = (userData) => {
    setUser(userData);
    // Optionally, store user data in cookies for persistence
    Cookies.set('token', userData.token, { expires: 1 });
  };

  // logout function to clear the user state and remove the token from cookies
  const logout = () => {
    setUser(null); // Clear user state
    Cookies.remove('token'); // Remove token from cookies
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy access to AuthContext
export const useAuth = () => useContext(AuthContext);
