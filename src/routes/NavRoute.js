
import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../context/auth/AuthContext";



export const NavRoute = ({ exact, path, component: Component, header: Header }) => {

    const { signed } = useContext(AuthContext);
    const isLogged = signed || !!localStorage.getItem('@App:token');

    const render = isLogged ?
        <Route exact={exact} path={path} render={(props) => (
            <div>
                {Header}
                <Component {...props} />
            </div>
        )} />
        : <Redirect to='/' />;

    return render;
}