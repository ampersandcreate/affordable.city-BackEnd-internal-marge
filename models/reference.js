module.exports = function(sequelize, DataTypes) {
    const modelDefinition = {

        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        invitationToken: {
            type: DataTypes.STRING,
            allowNull: false
        }
    };
    const ReferenceModel = sequelize.define('reference', modelDefinition);
    return ReferenceModel;

};