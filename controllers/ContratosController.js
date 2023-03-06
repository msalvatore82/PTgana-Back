const MongoClient = require('mongodb').MongoClient;
const { ObjectId } = require('mongodb');

const { MONGO_URI } = require("../config/keys");

const ContratosController = {
    async createContract(req, res) {
        const client = await MongoClient.connect(MONGO_URI, { useUnifiedTopology: true });
        const db = client.db('gana');
        const collection = db.collection('contratos');

        try {
            const contratos = await collection.insertOne(req.body);
            res.status(201).send({ msg: "sus contratos son", contratos });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Ha habido un problema al crear el contrato' });
        } finally {
            client.close();
        }
    },
    async updateContractById(req, res) {
        const client = await MongoClient.connect(MONGO_URI, { useUnifiedTopology: true });
        const db = client.db('gana');
        const collection = db.collection('contratos');
        /*         const query = { _id: new ObjectId(req.params._id) };
         */

        try {
            const contratos = await collection.findOneAndUpdate(
                { _id: new ObjectId(req.params._id) },
                { $set: { ...req.body } },
                { new: true }
            );
            res.status(201).send({ msg: "sus contratos son", contratos });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Ha habido un problema al actualizar el contrato' });
        } finally {
            client.close();
        }
    },
    async getContractById(req, res) {
        const client = await MongoClient.connect(MONGO_URI, { useUnifiedTopology: true });
        const db = client.db('gana');
        const collection = db.collection('contratos');
        const contractId = req.params._id;

        try {
            const contract = await collection.findOne({ _id: new ObjectId(contractId) });
            if (!contract) {
                res.status(404).send({ message: `Contrato no encontrado para el ID ${contractId}` });
            } else {
                res.status(200).send({ message: 'Contrato encontrado', contract });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: `Ha habido un problema al buscar el contrato con el ID ${contractId}` });
        } finally {
            client.close();
        }
    },


    async deleteContractById(req, res) {
        const client = await MongoClient.connect(MONGO_URI, { useUnifiedTopology: true });
        const db = client.db('gana');
        const collection = db.collection('contratos');
        try {
            const contratos = await collection.findOneAndDelete(
                { _id: new ObjectId(req.params._id) },
            );
            res.status(201).send({ msg: "sus contratos son", contratos });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Ha habido un problema al actualizar el contrato' });
        } finally {
            client.close();
        }
    },
    async getAllContracts(req, res) {
        const client = await MongoClient.connect(MONGO_URI, { useUnifiedTopology: true });
        const db = client.db('gana');
        const collection = db.collection('contratos');
        try {
            const contratos = await collection.find().toArray();
            res.status(201).send({ msg: "sus contratos son", contratos });
        } catch (error) {
            console.error(error);
            res.status(500).send({ msg: 'Ha habido un problema al actualizar el contrato' });
        } finally {
            client.close();
        }
    },
    async  getContractByName(req, res) {
        const client = await MongoClient.connect(MONGO_URI, { useUnifiedTopology: true });
        const db = client.db('gana');
        const collection = db.collection('contratos');
        const name = req.params.name.toString();
      
        if (!name) { // Verificar si el parámetro `name` no está presente
          return res.status(400).send({ msg: 'El parámetro de búsqueda `name` es obligatorio' });
        }
      
        try {
          const query = {
            nombre: { $regex: name.toString(), $options: "i" }
          };
          const result = await collection.find(query).toArray();
          if (result.length === 0) {
            res.status(404).send({ msg: 'Contrato no encontrado para el nombre', name });
          } else {
            res.status(200).send({ msg: 'Contrato encontrado', result });
          }
        } catch (error) {
          console.error(error);
          res.status(500).send({ msg: 'Ha ocurrido un error al buscar los contratos por nombre' });
        } finally {
          client.close();
        }
      }
      
}

module.exports = ContratosController;

