import React from 'react';
import {BrowserRouter, Switch} from 'react-router-dom';
import Navbar from "./navbar/Navbar";
import {Routes} from "../constants/routes";
import {AuthContext} from "./AuthProvider";
import {Redirect, Route} from "react-router";
import Login from "./login/Login";
import Sensors from "./sensors/Sensors";
import {PrivateRouter} from "./PrivateRouter";
import {OnlyGuestRouter} from "./OnlyGuestRouter";
import Editor from "./edited/Editor";


class App extends React.Component {
    render() {

        return (
            <div>
                <BrowserRouter>
                    <Navbar/>
                    <Switch>
                        <PrivateRouter exact path={Routes.sensors} component={Sensors}/>
                        <PrivateRouter exact   path={Routes.sensorEditor} component={Editor} onlyForAdmin={true}/>
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
