
import React from "react";
import { Route, Redirect } from "react-router-dom";

export const NavRoute = ({ exact, path, component: Component, header: Header }) => {

    const isLogged = !!localStorage.getItem('@App:token');
    console.log(isLogged, window.location.path)

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