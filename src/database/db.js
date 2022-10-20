const typeorm = require('typeorm');
require('dotenv').config();

const typeormConnection = new typeorm.DataSource({
    type: 'mysql',
    url: process.env.DB_URL,
    synchronize: true, //disable when in production,
    entities: [], //require('./path/to/entity'), ...
});

module.exports = typeormConnection;
