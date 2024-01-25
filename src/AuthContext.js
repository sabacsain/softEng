import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const storedAuth = Cookies.get('authenticated');
    if (storedAuth === 'true') {
      setAuthenticated(true);
    }
  }, []);

  const login = () => {
    setAuthenticated(true);
    Cookies.set('authenticated', 'true');
  };

  const logout = () => {
    setAuthenticated(false);
    Cookies.remove('authenticated');
  };

  return (
    <AuthContext.Provider value={{ authenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
