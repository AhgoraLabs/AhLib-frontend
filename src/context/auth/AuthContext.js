import React, { createContext, useState, useEffect } from 'react';
import { authUser } from '../../api/apiService';
import jwt from 'jwt-decode'

const AuthContext = createContext({});


export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState({});

  async function Login(email, senha) {

    const { data, error } = await authUser(email, senha);

    if (error) {
      return false;
    }

    setUser({ id: data.user._id, name: data.user.name, email, profile: data.profile });

    localStorage.setItem('@App:user', JSON.stringify(data.user.name));
    localStorage.setItem('@App:id', JSON.stringify(data.user._id));
    localStorage.setItem('@App:email', data.user.email)
    localStorage.setItem('@App:token', data.token);
    return true;
  }

  function Logout() {
    setUser(null);

    sessionStorage.removeItem('@App:user');
    sessionStorage.removeItem('App:token');
  }


  useEffect(() => {
    const storagedUser = localStorage.getItem('@App:user');
    const storagedToken = localStorage.getItem('@App:token');
    const storagedId = localStorage.getItem('@App:id');
    const storagedEmail = localStorage.getItem('@App:email');

   
    const { profile } = storagedToken && jwt(storagedToken) || {};


    if (storagedToken && storagedUser) {
      setUser({ id: JSON.parse(storagedId), profile, name: JSON.parse(storagedUser), email: storagedEmail });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ signed: Boolean(user), user, Login, Logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;