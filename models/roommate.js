module.exports = function(sequelize, DataTypes) {
    const modelDefinition = {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
    };

    const RoommateModel = sequelize.define('roommate', modelDefinition);
    return RoommateModel;
};