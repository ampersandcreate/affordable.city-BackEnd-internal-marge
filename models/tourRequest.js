module.exports = function(sequelize, DataTypes) {
    const modelDefinition = {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
    };
    const TourRequestModel = sequelize.define('tourRequest', modelDefinition);
    return TourRequestModel;
};