const UserService = require('../services/userService');
const responseHelper = require('../helpers/responseHelper');

const UsersController = {};

UsersController.show = async (req, res, next) => {
  try {
    const { user } = req;
    const result = await UserService.getUser(user.id);
    responseHelper.setSuccessResponse(result, res);
  } catch (error) {
    next(error);
  }
};

UsersController.create = async (req, res, next) => {
  try {
    const {
      firstName, lastName, email, phone, password
    } = req.body;
    const result = await UserService.createUser({
      firstName, lastName, email, phone, password
    });
    responseHelper.setSuccessResponse(result, res);
  } catch (error) {
    next(error);
  }
};

module.exports = UsersController;
