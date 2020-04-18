import * as React from "react";
import {AuthContext} from "../AuthProvider";
import {withRouter} from 'react-router-dom';
import {Routes} from "../../constants/routes";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

class Navbar extends React.Component {

    sensors = () => {
        this.props.history.push(Routes.sensors);
    };

    logout = () => this.context.logout();

    render() {
        const user = this.context.currentUser;
        return (
            <AppBar position='static'>
                <Toolbar>
                    {user ?
                        <>
                            <Button onClick={this.sensors}>
                                Sensors table
                            </Button>
                            <Button onClick={this.logout}>
                                Logout
                            </Button>
                            <Typography>
                                Hi,{this.context.currentUser.name}!
                            </Typography>
                        </>
                        :
                        <></>

                    }
                </Toolbar>
            </AppBar>)
    }
}

Navbar.contextType = AuthContext;
export default withRouter(Navbar)

