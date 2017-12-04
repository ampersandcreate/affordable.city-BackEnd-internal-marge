const config = {};

config.app = {
    title: 'Affordable City',
    host: 'localhost',
    port: 8080,
    ssl: false
};

config.logging = {
    express_format: '[:date] ":method :url HTTP/:http-version" :status :res[content-length] - :response-time ms ":referrer" :remote-addr'
};

config.mysql = {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    logging: false
};

config.user = {
    dbname: '1500city_db',
    user: 'root',
    password: ''
};

config.keys = {
    secret: '/jVdfUX+u/Kn3qPY4+ahjwQgyV5UhkM5cdh1i2xhozE=', // Not anymore...
    refSecret: '/VdfUX+u/Kn3qPY4+ahjwQgyV5UhkM5cdhzE='
};

const userRoles = {
    guest: 1, // ...001
    user: 2, // ...010
    admin: 4 // ...100
};

config.userRoles = userRoles;

config.accessLevels = {
    // 111, 110
    guest: userRoles.guest | userRoles.user | userRoles.admin, // eslint-disable-line
    user: userRoles.user | userRoles.admin, // eslint-disable-line
    admin: userRoles.admin // ...100
};

module.exports = config;