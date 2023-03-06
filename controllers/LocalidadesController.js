const MongoClient = require('mongodb').MongoClient;
const { ObjectId } = require('mongodb');

const { MONGO_URI } = require("../config/keys");

const LocalidadesController = {
    async getAllLocation(req, res) {
        const client = await MongoClient.connect(MONGO_URI, { useUnifiedTopology: true });
        const db = client.db('gana');
        const collection = db.collection('localidades');
        try {
            const localidades = await collection.find().toArray();
            res.status(201).send({ msg: "sus localidades", localidades });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Ha habido un problema al mostrar las localidades' });
        } finally {
            client.close();
        }
    },
    async getLocationCp(req, res) {
        const client = await MongoClient.connect(MONGO_URI, { useUnifiedTopology: true });
        const db = client.db('gana');
        const collection = db.collection('localidades');
        const cp = req.params.cp;
        try {
          const localidad = await collection.findOne({ codigo_postal: cp });
          if (!localidad) {
            return res.status(404).send({ message: 'No se ha encontrado una localidad para el código postal proporcionado' });
          }
          res.status(200).send({ localidad });
        } catch (error) {
          console.error(error);
          res.status(500).send({ message: 'Ha habido un problema al buscar la localidad por código postal' });
        } finally {
          client.close();
        }    
    }    
}
module.exports = LocalidadesController;

