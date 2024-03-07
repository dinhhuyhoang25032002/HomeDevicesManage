import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";


let router = express.Router();

let initWebRoutes = (app) => {
    //userController
    router.post('/api/login', userController.handleLogin);
    router.post('/api/signup',userController.handleSignUp);

    //homeController
    router.get('api/get-all-description-department', homeController.getAllDescriptionDepartment);
    router.post('api/create-a-new-device', homeController.postANewDevice);
    router.post('/api/create-new-device', homeController.handleCreateADevice)


    return app.use("/", router);
}

module.exports = initWebRoutes; 