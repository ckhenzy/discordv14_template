const typeOrmConnection = require('../database/db.js');

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`Logged in as ${client.user.tag}!`);
        typeOrmConnection.initialize().then(() => {
            console.log('Initialized Database!');
        });
    },
};
