const config = require('../config');
const bcrypt = require('bcrypt');
async function comparePasswords(password, pwd) {
    return await bcrypt.compare(password, pwd);
}

function hashPassword(user) {
    if (user.changed('password')) {
        return bcrypt.hash(user.password, 10).then(function(password) {
            user.password = password;
        });
    }
}
module.exports = (sequelize, DataTypes) => {
    const modelDefinition = {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: 'Oops. Looks like you already have an account with this email address. Please try to login.',
                fields: [sequelize.fn('lower', sequelize.col('email'))]
            },
            validate: {
                isEmail: {
                    args: true,
                    msg: 'Email address must be valid'
                }
            }
        },
        phone: {
            type: DataTypes.BIGINT,
            allowNull: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.INTEGER,
            defaultValue: config.userRoles.user
        },
        verifiedAt: {
            type: DataTypes.DATE
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updatedAt: DataTypes.DATE,
        deletedAt: DataTypes.DATE
    };

    const modelOptions = {
        hooks: {
            beforeValidate: hashPassword
        }
    };

    const UserModel = sequelize.define('user', modelDefinition, modelOptions);

    UserModel.associate = function(models) {
        UserModel.hasMany(models.building, { foreignKey: 'userId', onDelete: 'CASCADE' });
        UserModel.hasMany(models.savedListing, { foreignKey: 'userId', onDelete: 'CASCADE' });
        UserModel.hasMany(models.tourRequest, { foreignKey: 'userId', onDelete: 'CASCADE' });
        UserModel.hasMany(models.application, { foreignKey: 'userId', onDelete: 'CASCADE' });
        UserModel.hasMany(models.roommate, { foreignKey: 'userId', onDelete: 'CASCADE' });
    };

    UserModel.prototype.comparePasswords = function(password) {
        return comparePasswords(password, this.password);
    };
    return UserModel;
};