import React, { createContext, useState, useEffect } from 'react';
import { authUser } from '../../api/apiService';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  async function Login(email, senha) {

    const { data } = await authUser(email, senha);
    setUser({ id: data.user._id , name: data.user.name});

    localStorage.setItem('@App:user',JSON.stringify(data.user.name));
    localStorage.setItem('@App:id',JSON.stringify(data.user._id));
    localStorage.setItem('@App:token', data.token);

  }

  function Logout() {
    setUser(null);

    sessionStorage.removeItem('@App:user');
    sessionStorage.removeItem('App:token');
  }


  useEffect(() => {
    const storagedUser = localStorage.getItem('@App:user');
    const storagedToken = localStorage.getItem('@App:token');

    if (storagedToken && storagedUser) {
      setUser(JSON.parse(storagedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ signed: Boolean(user), user, Login, Logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;