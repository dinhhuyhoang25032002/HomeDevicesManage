import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";


let router = express.Router();

let initWebRoutes = (app) => {
    //userController
    router.post('/api/login', userController.handleLogin);
    router.post('/api/signup', userController.handleSignUp);
    router.put('/api/change-passord', userController.handldeChangePassword);
    router.put('/api/forgot-password', userController.handleGetPassword);

    //homeController
    router.get('/api/get-all-description-department', homeController.getAllDescriptionDepartment);
    router.post('/api/create-new-device', homeController.handleCreateADevice)
    router.get('/api/get-all-temp-humidy-date', homeController.handleGetAllDateInfor);
    router.get('/api/get-energy-comsumer-by-date', homeController.handleGetAllInforEnergy);
    router.get('/api/get-all-infor-department-by-id', homeController.handleGetAllInforDePartment);
    router.get('/api/get-all-value-of-department-by-id', homeController.handleGetAllValuesByIdAndDate);

    return app.use("/", router);
}

module.exports = initWebRoutes; 