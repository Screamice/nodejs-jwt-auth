const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

/* Configuración de Express */
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.set('port', 3000);

/* Configuración de las Rutas */
const router = express.Router();

router.get('/', (req, res) => {
    res
        .status(200)
        .send({message: 'Todo bien desde el backend'});
});