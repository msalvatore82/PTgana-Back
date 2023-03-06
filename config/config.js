const { MongoClient } = require('mongodb');
const { MONGO_URI } = require("./keys");

const client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const dbConnection = async () => {
    try {
        await client.connect();
    } catch (error) {
        console.error(error);
        throw new Error("Error a la hora de iniciar la base de datos");
    }
};

module.exports = {
    dbConnection,
}
