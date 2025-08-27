import axios from './axios.customize';

const createUserApi = (name, email, password) => {
    const URL_API = "/v1/api/register";
    const data = {
        name,
        email,
        password
    }
    return axios.post(URL_API, data);
};
// const createUserApi = async (name, email, password) => {
//     const URL_API = "/v1/api/register";
//     const data = { name, email, password };
//     const res = await axios.post(URL_API, data);
//     return res.data; 
// };

const loginApi = async (email, password) => {
    const URL_API = "/v1/api/login";
    const data = {
        email,
        password
    }
    return axios.post(URL_API, data);
};

const getUserApi = () => {
    const URL_API = "/v1/api/user";
    return axios.get(URL_API);
};

export {
    createUserApi,
    loginApi,
    getUserApi
};