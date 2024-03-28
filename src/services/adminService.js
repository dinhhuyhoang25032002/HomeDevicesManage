import axios from '../axios';
//import * as queryString from 'query-string';

// const adminService = {

//     /**
//      * Đăng nhập hệ thống
//      * {
//      *  "username": "string",
//      *  "password": "string"
//      * }
//      */
//     login(loginBody) {
//         return axios.post(`/admin/login`, loginBody)
//     },

// };

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

let handleChangePassword = (data) => {
    return axios.put('/api/change-passord', data);
}

let getAllDeviceInfor = () => {
    return axios.get('api/get-all-description-department');
}

let handleGetAllDateInfor = () => {
    return axios.get('/api/get-all-temp-humidy-date');
}

let handleGetAllInforEnergy = (date) => {
    return axios.get(`/api/get-energy-comsumer-by-date?date=${date}`);
}
let handleGetAllInforDePartment = (id) => {
    return axios.get(`/api/get-all-infor-department-by-id?id=${id}`);
}
let handleGetAllValuesByIdAndDate = (id, date) => {
    return axios.get(`/api/get-all-value-of-department-by-id?id=${id}&date=${date}`);
}

export {
    handleSignin, handleSignUp, handleCreateADevice,
    handleChangePassword, getAllDeviceInfor, handleGetAllDateInfor,
    handleGetAllInforEnergy, handleGetAllInforDePartment,
    handleGetAllValuesByIdAndDate
};