module.exports = function(sequelize, DataTypes) {
    const modelDefinition = {

        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },

        contentSize: {
            type: DataTypes.STRING,
            allowNull: true
        },
        originalFileName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        contentUrl: {
            type: DataTypes.STRING,
            allowNull: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        fileFormat: {
            type: DataTypes.STRING,
            allowNull: true
        },
        linkedObject: {
            type: DataTypes.STRING,
            allowNull: true
        }
    };
    const ListingPhotosModel = sequelize.define('listingPhoto', modelDefinition);
    return ListingPhotosModel;

};