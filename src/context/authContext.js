import { createContext, useState, useEffect } from 'react';


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is already logged in when app loads
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  //Login User --> ref. login.js
  const login = (userData) => {

    setUser(userData);

    localStorage.setItem('user', JSON.stringify(userData));

  };

  //Logout User -->Button in Menu.js
  const logout = () => {

    setUser(null);

    localStorage.removeItem('user');

  };

  return (
    <AuthContext.Provider value={{ user , login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
