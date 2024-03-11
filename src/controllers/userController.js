import userService from '../services/userService'

let handleLogin = async (req, res) => {
    try {
        let email = req.body.email;
        let password = req.body.password;
        if (!email || !password) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing input parameter!'
            })
        }
        let userData = await userService.handleUserLogin(email, password)
        // res.cookie('jwt', userData.Token, { httpOnly: true, maxAge: 60 * 60 * 1000 })
        return res.status(200).json(userData)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server!'
        })
    }
}

let handleSignUp = async (req, res) => {
    try {
        let data = await userService.handleSignUp(req.body)
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

let handldeChangePassword = async (req, res) => {
    try {
        let data = await userService.handldeChangePassword(req.body);
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server!'
        })
    }
}

let handleGetPassword = async (req, res) => {
    try {
        let data = await userService.handleGetPassword(req.body);
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server!'
        })
    }
}

module.exports = {
    handleLogin, handleSignUp, handldeChangePassword,
    handleGetPassword,
}