const responseHelper = require('../helpers/responseHelper');
const ListingService = require('../services/listingService');

const ListingsController = {};

ListingsController.index = async(req, res, next) => {
    try {
        const { buildingId } = req.params;
        const result = await ListingService.getAllListingsForBuilding(buildingId);
        responseHelper.setSuccessResponse(result, res);
    } catch (error) {
        next(error);
    }
};

ListingsController.create = async(req, res, next) => {
    try {
        const {
            rent,
            numberOfBedrooms,
            numberOfBathrooms,
            neighborhood
        } = req.body;
        const { buildingId } = req.params;
        const result = await ListingService.createListingForBuilding({
            rent,
            numberOfBedrooms,
            numberOfBathrooms,
            neighborhood,
            buildingId
        });
        responseHelper.setSuccessResponse(result, res);
    } catch (error) {
        next(error);
    }
};


ListingsController.show = async(req, res, next) => {
    try {
        const { id } = req.params;
        const result = await ListingService.getListing(id);
        responseHelper.setSuccessResponse(result, res);
    } catch (error) {
        next(error);
    }
};

module.exports = ListingsController;