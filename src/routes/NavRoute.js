
import React, { useContext } from "react";
import { Route,Redirect } from "react-router-dom";
import UserContext from '../../src/context/user/index';


 
export const NavRoute = ({ exact, path, component: Component, header: Header }) => {

    const { state: { token } } = useContext(UserContext);

    const isLogged = !!token || !!localStorage.getItem('token');

    const render = isLogged ? 
    <Route exact={exact} path={path} render={(props) => (
        <div>
            {Header}
            <Component {...props} />
        </div>
    )} />
    : <Redirect to='/'/>;

    return render;
}