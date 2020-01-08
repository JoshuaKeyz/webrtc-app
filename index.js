const httpServer = require('./lib/server');
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    if (!err && client) {
        const db = client.db('mongodb-practice');
        httpServer.init(db);
        const serverInstance = httpServer.instance;
    }
})
