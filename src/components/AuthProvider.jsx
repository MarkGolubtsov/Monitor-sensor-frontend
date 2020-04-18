import * as React from "react";
import authService from "../services/authService";

export const AuthContext = React.createContext();

export default class AuthProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.updateCurrentUser(authService.getUserFromStorage());
    }

    updateCurrentUser = (user) => {
        this.setState({user})
    }
    login = (email, password) => {
        authService.login(email, password)
            .then(response => this.updateCurrentUser(authService.getUserFromStorage()))
    }
    logout = () => {
        authService.logout();
        this.updateCurrentUser(null);
    }

    render() {
        return (
            <AuthContext.Provider
                value={{
                    currentUser: this.state.user,
                    login: this.login,
                    logout: this.logout
                }}>
                {this.props.children}
            </AuthContext.Provider>
        )
    }
}
