const express = require("express");
const app = express();
const PORT = 8080;
const { dbConnection } = require("./config/config")
var cors = require('cors')

app.use(express.json())
app.use(cors())

app.use('/contractos', require('./routes/contractos'));
app.use('/localidades', require('./routes/localidades'));




dbConnection()

app.listen(PORT, ()=> console.log(`Base de datos conectada con éxito en puerto: ${PORT}`));

