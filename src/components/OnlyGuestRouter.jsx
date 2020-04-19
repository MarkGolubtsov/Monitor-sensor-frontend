import {Redirect, Route} from "react-router-dom";
import authServices from "../services/authService";
import {Routes} from "../constants/routes";
import React from "react";

export const OnlyGuestRouter = ({component: Component, ...rest}) => (
    <Route
        {...rest}
        render={props => {
            let user = authServices.getUserFromStorage();
            if (!user) {
                return <Component {...props}/>;
            } else {
                return <Redirect to={Routes.sensors}/>
            }
        }
        }/>
);
