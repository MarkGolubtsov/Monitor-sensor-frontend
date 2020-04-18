import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {isAdmin,  isViewer} from '../constants/roles';
import {Routes} from '../constants/routes';
import authServices from "../services/authService";

export const PrivateRouter = ({component: Component, onlyForAdmin, ...rest}) => (
    <Route
        {...rest}
        render={props => {
            let user = authServices.getUserFromStorage();
            if (onlyForAdmin && isAdmin(user) || isViewer(user)) {
                return <Component {...props}/>;
            } else {
                return <Redirect to={Routes.login}/>
            }
        }
        }/>
);
