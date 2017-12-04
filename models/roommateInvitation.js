module.exports = function(sequelize, DataTypes) {
    var modelDefinition = {

        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        invitationToken: {
            type: DataTypes.STRING,
            allowNull: false
        },
        expiresAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        convertedAt: {
            type: DataTypes.DATE,
            allowNull: true
        }

    };
    const RoommateInvitationModel = sequelize.define('roommateInvitation', modelDefinition);
    return RoommateInvitationModel;

};