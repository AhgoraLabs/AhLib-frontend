import React, { createContext, useState, useEffect } from 'react';
import { authUser } from '../../api/apiService';
import jwt from 'jwt-decode'

const AuthContext = createContext({});


export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState({});
  console.log(user, 'user')

  async function Login(email, senha) {

    const { data, error } = await authUser(email, senha);
    console.log(data, 'error');
    setUser({ id: data.user._id, name: data.user.name, email, profile: data.profile, image: data.user.image });



    if (error) {
      return [];
    }



    localStorage.setItem('@App:user', data.user.name);
    localStorage.setItem('@App:id', JSON.stringify(data.user._id));
    localStorage.setItem('@App:email', data.user.email)
    localStorage.setItem('@App:token', data.token);
    localStorage.setItem('@App:image', data.user.image);


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
    const storagedImage = localStorage.getItem('@App:image');


    const { profile } = storagedToken && jwt(storagedToken) || {};

    console.log(storagedUser, 'storagedUser')
    if (storagedToken && storagedUser) {
      console.log('prestes a retornar');
      setUser(previousSate => {
        console.log(previousSate, 'previousSate');
        return ({ ...previousSate, id: storagedId, name: storagedUser, email: storagedEmail, profile , image: storagedImage})
      });
    }

  }, []);

  return (
    <AuthContext.Provider value={{ signed: Boolean(user), user, Login, Logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;