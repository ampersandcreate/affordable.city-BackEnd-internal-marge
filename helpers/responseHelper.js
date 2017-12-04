const log = require('./../lib/log')(module);

module.exports = {
    setSuccessResponse(data, res) {
        const response = {
            success: true,
            data,
            error: []
        };
        log.info('Successfull');
        this.setResponse(200, response, res);
    },
    setErrorResponse(errors, res) {
        const response = {
            success: false,
            data: [],
            error: errors
        };
        log.error('Internal error(%d): %s', res.statusCode, errors);
        this.setResponse(500, response, res);
    },
    setBadRequestResponse(errors, res) {
        const response = {
            success: false,
            data: [],
            errors
        };
        log.error('Bad Request error(%d): %s', res.statusCode, errors);
        this.setResponse(401, response, res);
    },
    setResponse(status, response, res) {
        res.status(status).json(response);
        res.end();
    }
};