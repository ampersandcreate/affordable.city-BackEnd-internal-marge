const db = require('../models/database');
const jwt = require('jsonwebtoken');
const config = require('../config');

const UserService = function () {}; // eslint-disable-line

UserService.prototype.getUser = async (id) => {
  const result = await db.user.findOne({
    where: {
      id
    }
  });
  return result;
};

UserService.prototype.createUser = async (params) => {
  const transaction = await db.sequelize.transaction();
  try {
    const {
      firstName, lastName, email, phone, password
    } = params;
    const newUser = {
      firstName, lastName, email, phone, password
    };
    const user = await db.user.create(newUser, { transaction });
    const jwtToken = jwt.sign(
      {
        email: user.email,
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName
      },
      config.keys.secret,
      { expiresIn: '30m' }
    );
    const refreshToken = jwt.sign(
      { email: user.email },
      config.keys.refSecret,
      { expiresIn: '30d' }
    );
    await transaction.commit();
    const result = {
      refreshToken,
      token: `JWT ${jwtToken}`
    };
    return result;
  } catch (error) {
    await transaction.rollback();
    throw (error);
  }
};

module.exports = new UserService();
