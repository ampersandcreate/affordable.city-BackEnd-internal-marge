const db = require('../models/database');
const geoLocation = require('../helpers/geoLocationHelper');

const BuildingService = function() {}; // eslint-disable-line

BuildingService.prototype.getAllBuildings = async() => {
    try {
        const result = await db.building.findAll();
        return result;
    } catch (error) {
        throw (error);
    }
};

BuildingService.prototype.createBuilding = async(params) => {
    try {
        const {
            address,
            city,
            state,
            zipCode,
            units,
            userId
        } = params;
        const data = await geoLocation.geocoder.geocode(`${params.address}, ${params.city}, ${params.zipCode}`);
        const { latitude, longitude } = data[0];
        const newBuilding = {
            address,
            city,
            state,
            zipCode,
            units,
            userId,
            latitude,
            longitude
        };
        const building = await db.building.create(newBuilding);
        const result = await db.building.findOne({
            id: building.id
        });
        return result;
    } catch (error) {
        throw (error);
    }
};

BuildingService.prototype.getBuilding = async(id) => {
    try {
        const result = await db.building.findOne({
            where: {
                id
            }
        });
        return result;
    } catch (error) {
        throw (error);
    }
};

module.exports = new BuildingService();