import React from 'react';
import {BrowserRouter, Switch} from 'react-router-dom';
import Navbar from "./navbar/Navbar";
import {Routes} from "../constants/routes";
import {AuthContext} from "./AuthProvider";
import {Redirect, Route} from "react-router";
import Login from "./login/Login";
import Sensors from "./sensors/Sensors";
import {Editor} from "./edited/Editor";
import {PrivateRouter} from "./PrivateRouter";
import {OnlyGuestRouter} from "./OnlyGuestRouter";


class App extends React.Component {
    render() {
        let isLogged=!!this.context.currentUser;
        return (
            <div>
                <BrowserRouter>
                    <Navbar/>
                    <Switch>
                        <PrivateRouter exact path={Routes.sensors} component={Sensors}/>
                        <PrivateRouter onlyForAdmin  path={Routes.sensorEditor} component={Editor}/>
                        <OnlyGuestRouter path={Routes.login} component={Login}/>
                        <Redirect to={Routes.login}/>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }

}

App.contextType = AuthContext;
export default App;
