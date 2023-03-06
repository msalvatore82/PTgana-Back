 const express = require('express');
const { deleteContractById } = require('../controllers/ContratosController');

const router = express.Router()

const ContratosController = require('../controllers/ContratosController');

router.post("/addcontract",ContratosController.createContract)
router.put("/modifycontract/:_id",ContratosController.updateContractById)
router.delete("/deletecontract/:_id", ContratosController.deleteContractById)
router.get("/listcontracts", ContratosController.getAllContracts)
router.get('/contracts/:_id', ContratosController.getContractById);
router.get('/getContractByName/:name', ContratosController.getContractByName);





module.exports = router;