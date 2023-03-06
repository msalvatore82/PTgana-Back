const express = require('express');
const router = express.Router()

const LocalidadesController = require('../controllers/LocalidadesController');


router.get("/getlocalidad", LocalidadesController.getAllLocation)
router.get('/getLocationCp/:cp', LocalidadesController.getLocationCp);


module.exports = router;