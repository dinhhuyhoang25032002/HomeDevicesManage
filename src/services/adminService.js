import axios from '../axios';
import * as queryString from 'query-string';

const adminService = {

    /**
     * Đăng nhập hệ thống
     * {
     *  "username": "string",
     *  "password": "string"
     * }
     */
    login(loginBody) {
        return axios.post(`/admin/login`, loginBody)
    },

};

let handleSignin = (userEmail, userPassword) => {
    return axios.post('/api/login',
        {
            email: userEmail,
            password: userPassword
        });
}

let handleSignUp = (data) => {
    return axios.post('/api/signup', data);
}

let handleCreateADevice = (data) => {
    return axios.post('/api/create-new-device', data);
}

export {
    handleSignin, handleSignUp, handleCreateADevice
};