const { MongoClient } = require('mongodb');
const { MONGO_URI } = require("../config/keys");

const client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const connectAndCreateSchema = async () => {
  try {
    await client.connect();
    console.log('Conectado a la base de datos');
    const db = client.db('gana');
    const collection = db.collection('contratos');

    const ContratosSchema = {
      nombre: { type: String, required: true },
      apellido1: String,
      apellido2: String,
      documento: { type: String, required: true },
      cp:  Number,
      localidad: String,
      direccion: String,
      telefono: Number,
    };

    await collection.insertOne(ContratosSchema);
    await collection.createIndex({ nombre: "text" });


    await client.close();
  } catch (error) {
    console.error(error);
    throw new Error('Error al crear el esquema');
  }
};

module.exports = {
  connectAndCreateSchema
};
