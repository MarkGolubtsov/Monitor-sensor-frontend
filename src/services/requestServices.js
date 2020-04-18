import Axios from 'axios'

const method = {
    GET: 'get',
    PUT: 'put',
    POST: 'post',
    DELETE: 'delete'
};

const sendRequest = (method, url, data) => {
    const Authorization = localStorage.getItem('Token');
    const headers = {Authorization};
    return Axios.request({method, url, data, headers});
};

const convertParamsToUrl = (params1) => {
    let params = {...params1};
    let result = Object.entries(params).reduce((accumulator, currentValue) => {
        return accumulator + `&${currentValue[0]}=` + currentValue[1];
    }, '');
    return '?' + result.substring(1);
};

export const RestRequest = {
    get: (endpoint, parameters, data) => sendRequest(method.GET, endpoint+convertParamsToUrl(parameters), data),
    put: (endpoint, parameters, data) => sendRequest(method.PUT, endpoint, data),
    post: (endpoint, parameters, data) => sendRequest(method.POST, endpoint, data),
    delete: (endpoint, parameters, data) => sendRequest(method.DELETE, endpoint, data)
};
