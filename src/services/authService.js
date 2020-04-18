import {RestRequest} from "./requestServices";
import {endpoints} from "../constants/endpoints";
import jwt_decode from "jwt-decode";

const getUserFromStorage = () => {
    let token = localStorage.getItem('Token');
    if (!token) return null;
    let data = jwt_decode(token);
    return {
        name: data.sub,
        role: data.role
    };
};

const afterLogin = response => {
    if (response.data.token) {
        localStorage.setItem('Token', `${response.data.token}`);
    }
    return response;
};

const login = (email, password) => {
    return RestRequest.post(endpoints.getToken,{},{email,password}).then(afterLogin)
 }

 const logout = () => {
    localStorage.removeItem('Token');
 }

export default {
    login,
    getUserFromStorage,
    logout
}
