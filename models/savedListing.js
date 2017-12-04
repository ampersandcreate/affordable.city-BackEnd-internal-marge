module.exports = function(sequelize, DataTypes) {
    const modelDefinition = {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
    };
    const SavedListingModel = sequelize.define('savedListing', modelDefinition);
    return SavedListingModel;
};