const router = require('express').Router();

const config = require('../config');
const { allowOnly } = require('../helpers/routesHelper');
const AuthController = require('../controllers/authController');
const UsersController = require('../controllers/usersController');
const AdminController = require('../controllers/adminController');
const BuildingsController = require('../controllers/buildingsController');
const ListingsController = require('../controllers/listingsController');

const APIRoutes = (passport) => {
    router.post('/signup', UsersController.create);
    router.get('/profile', passport.authenticate('jwt', { session: false }), allowOnly(config.accessLevels.user, UsersController.show));

    router.post('/authenticate', AuthController.authenticateUser);
    router.post('/refresh_token', AuthController.refreshToken);
    router.post('/verify', AuthController.verifyAccount);

    router.get('/admin', passport.authenticate('jwt', { session: false }), allowOnly(config.accessLevels.admin, AdminController.index));

    router.get('/buildings', passport.authenticate('jwt', { session: false }), allowOnly(config.accessLevels.user, BuildingsController.index));
    router.post('/buildings', passport.authenticate('jwt', { session: false }), allowOnly(config.accessLevels.user, BuildingsController.create));
    router.get('/buildings/:id', passport.authenticate('jwt', { session: false }), allowOnly(config.accessLevels.user, BuildingsController.show));

    router.get('/buildings/:buildingId/listings', passport.authenticate('jwt', { session: false }), allowOnly(config.accessLevels.user, ListingsController.index));
    router.post('/buildings/:buildingId/listings', passport.authenticate('jwt', { session: false }), allowOnly(config.accessLevels.user, ListingsController.create));
    router.get('/listings/:id', passport.authenticate('jwt', { session: false }), allowOnly(config.accessLevels.user, ListingsController.show));

    return router;
};

module.exports = APIRoutes;