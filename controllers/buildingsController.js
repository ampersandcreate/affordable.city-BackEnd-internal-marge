const BuildingService = require('../services/buildingService');
const responseHelper = require('../helpers/responseHelper');

const BuildingController = {};

BuildingController.index = async(req, res, next) => {
    try {
        const result = await BuildingService.getAllBuildings();
        responseHelper.setSuccessResponse(result, res);
    } catch (error) {
        next(error);
    }
};

BuildingController.create = async(req, res, next) => {
    try {
        const {
            address,
            state,
            city,
            zipCode,
            units
        } = req.body;
        const userId = req.user.id;
        const result = await BuildingService.createBuilding({
            address,
            city,
            state,
            zipCode,
            units,
            userId
        });
        responseHelper.setSuccessResponse(result, res);
    } catch (error) {
        next(error);
    }
};

BuildingController.show = async(req, res, next) => {
    try {
        const { id } = req.params;
        const result = await BuildingService.getBuilding(id);
        responseHelper.setSuccessResponse(result, res);
    } catch (error) {
        next(error);
    }
};

module.exports = BuildingController;