const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
const db = require('./models/database');
const errorHandler = require('errorhandler');
const log = require('./lib/log')(module);
const config = require('./config');
const helmet = require('helmet');
const winston = require('winston');
const compression = require('compression');

const logger = new(winston.Logger)({
    transports: [new(winston.transports.Console)({ colorize: true })]
});
// App related modules.
const hookJWTStrategy = require('./passport/passportStrategy');
// Initializations.
const app = express();
const server = require('http').createServer(app);

const startApp = () => {
    const protocol = config.app.ssl ? 'https' : 'http';
    const port = process.env.PORT || config.app.port;
    const appUrl = `${protocol}://${config.app.host}:${port}`;
    const env = process.env.NODE_ENV ?
        (`[${process.env.NODE_ENV}]`) : '[development]';

    logger.info('Initiated...', env);
    server.listen(port, () => {
        logger.info(`${config.app.title} listening at ${appUrl} ${env}`);
    });
};

// Create Tables
db.sequelize.sync({
        // Force: true
    })
    .then(startApp)
    .catch((e) => {
        throw new Error(e);
    });

// Parse as urlencoded and json.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Hook up the HTTP logger.
app.use(morgan('common'));
// To make requests lighter and load faster
app.use(compression());
// Hook up Passport.
app.use(passport.initialize());
// Helmet
app.use(helmet());

// Hook the passport JWT strategy.
hookJWTStrategy(passport);
app.use(errorHandler());
// Enable CORS from client-side
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});
// Bundle API routes.
app.use('/api', require('./routes/api')(passport));

// Main middleware
app.use((err, req, res, next) => {
    // Do logging and user-friendly error message display
    res.status(500).send({ status: 500, message: 'internal error', type: err.message });
    next();
});

// Routes
app.use((req, res, next) => {
    log('Time:', Date.now());
    next();
});

app.use((req, res) => {
    res.status(404);
    log.debug('Not found URL: %s', req.url);
    res.send({ error: `URL [${req.url}] not found!` });
});

app.use((err, req, res) => {
    res.status(err.status || 500);
    log.error('Internal error(%d): %s', res.statusCode, err.message);
    res.send({ error: err.message });
});