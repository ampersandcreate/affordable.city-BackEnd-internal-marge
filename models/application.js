module.exports = function(sequelize, DataTypes) {
    const modelDefinition = {

        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },

        applyWithRoommates: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        approvedAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        deniedAt: {
            type: DataTypes.DATE,
            allowNull: true
        }

    };

    const ApplicationModel = sequelize.define('application', modelDefinition);
    ApplicationModel.associate = function(models) {
        ApplicationModel.hasMany(models.roommateInvitation, { foreignKey: 'applicationId', onDelete: 'CASCADE' });
        ApplicationModel.hasMany(models.roommate, { foreignKey: 'applicationId', onDelete: 'CASCADE' });
        ApplicationModel.hasMany(models.reference, { foreignKey: 'applicationId', onDelete: 'CASCADE' });

    };
    return ApplicationModel;

};