const jwt = require('jsonwebtoken');
const config = require('../config');
const db = require('../models/database');
const responseHelper = require('../helpers/responseHelper');
const sequelize = require('sequelize');

const AuthService = function() {}; // eslint-disable-line
AuthService.prototype.authenticateUser = async(params) => {
    try {
        const { email, password, res } = params;
        const userQuery = { where: { email } };
        const user = await db.user.findOne(userQuery);
        const { id, firstName, lastName } = user;
        if (!user) {
            responseHelper.setBadRequestResponse('Authentication failed!', res);
        } else {
            const isMatch = await user.comparePasswords(password);
            if (isMatch) {
                const jwtToken = jwt.sign({
                        id,
                        email,
                        firstName,
                        lastName
                    },
                    config.keys.secret, { expiresIn: '30m' }
                );
                const newRefreshToken = jwt.sign({ email },
                    config.keys.refSecret, { expiresIn: '30d' }
                );
                const result = {
                    refreshToken: newRefreshToken,
                    token: `JWT ${jwtToken}`
                };
                return result;
            }
        }
        return responseHelper.setBadRequestResponse('Login failed!', res);
    } catch (error) {
        throw (error);
    }
};

AuthService.prototype.getRefreshToken = async(refreshToken) => {
    try {
        const decoded = jwt.verify(refreshToken, config.keys.refSecret);
        const potentialUser = { where: { email: decoded.email } };
        const user = await db.user.findOne(potentialUser);
        const {
            id,
            email,
            firstName,
            lastName
        } = user;
        const jwtToken = jwt.sign({
                email,
                id,
                firstName,
                lastName
            },
            config.keys.secret, { expiresIn: '30m' }
        );
        const newRefreshToken = jwt.sign({ email },
            config.keys.refSecret, { expiresIn: '30d' }
        );
        const result = {
            refreshToken: newRefreshToken,
            token: `JWT ${jwtToken}`
        };
        return result;
    } catch (error) {
        throw (error);
    }
};

AuthService.prototype.verifyAccount = async(userId) => {
    try {
        const userQuery = { where: { id: userId } };
        await db.user.update({ verifiedAt: sequelize.fn('NOW') }, userQuery);
        const user = await db.user.findOne(userQuery);
        const {
            id,
            email,
            firstName,
            lastName
        } = user;
        const jwtToken = jwt.sign({
                id,
                email,
                firstName,
                lastName
            },
            config.keys.secret, { expiresIn: '30m' }
        );
        const newRefreshToken = jwt.sign({ email },
            config.keys.refSecret, { expiresIn: '30d' }
        );
        const result = {
            refreshToken: newRefreshToken,
            token: `JWT ${jwtToken}`
        };
        return result;
    } catch (error) {
        throw (error);
    }
};
module.exports = new AuthService();