const AuthService = require('../services/authService');
const responseHelper = require('../helpers/responseHelper');

const AuthController = {};

AuthController.authenticateUser = async(req, res, next) => {
    try {
        if (!req.body.email || !req.body.password) {
            responseHelper.setBadRequestResponse('Please provide an email and a password.', res);
        } else {
            const { email, password } = req.body;
            const result = await AuthService.authenticateUser({ email, password, res });
            responseHelper.setSuccessResponse(result, res);
        }
    } catch (error) {
        next(error);
    }
};

AuthController.refreshToken = async(req, res, next) => {
    try {
        const refreshToken = req.headers['refresh-token'];
        const result = await AuthService.getRefreshToken(refreshToken);
        responseHelper.setSuccessResponse(result, res);
    } catch (error) {
        next(error);
    }
};

AuthController.verifyAccount = async(req, res, next) => {
    try {
        const { userId } = req.body;
        const result = await AuthService.verifyAccount(userId);
        responseHelper.setSuccessResponse(result, res);
    } catch (error) {
        next(error);
    }
};

module.exports = AuthController;