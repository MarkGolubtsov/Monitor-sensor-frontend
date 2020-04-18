import React from 'react';
import {BrowserRouter, Switch} from 'react-router-dom';
import Navbar from "./navbar/Navbar";
import {Routes} from "../constants/routes";
import {AuthContext} from "./AuthProvider";
import {Redirect, Route} from "react-router";
import {PrivateRouter} from "./PrivateRouter";
import Login from "./login/Login";
import Sensors from "./sensors/Sensors";

class App extends React.Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Navbar/>
                    <Switch>
                        {
                            this.context.currentUser ?
                                <>
                                    <Route exact path={Routes.sensors} component={Sensors}/>
                                    <Redirect to={Routes.sensors}/>
                                </>
                                :
                                <>
                                    <Route exact path={Routes.login} component={Login}/>
                                    <Redirect to={Routes.login}/>
                                </>
                        }

                    </Switch>
                </BrowserRouter>
            </div>
        );
    }

}

App.contextType = AuthContext;
export default App;
