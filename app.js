const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const user = require('./routes/user');
const middleware = require('./routes/middleware');

/* Configuración de Express */
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.set('port', 3000);

/* Configuración de los views */
app.use(express.static(__dirname + '/public'));

/* Configuración de las Rutas */
const router = express.Router();

router.get('/', (req, res) => {
    res
        .status(200)
        .send({message: 'Todo bien desde el backend'});
});

/* Rutas generales */
router.post('/auth/signup', user.emailSignup);
router.post('/auth/login', user.emailLogin);

/* Rutas privadas */
router.get('/private', middleware.ensureAuthenticated, (req, res) => {
    res.send({message: "Todo bien desde privado"});
});

/* Inciar el servidor y la base de datos */
mongoose.connect('mongodb://localhost:27017/users', {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    // Comprobar errores
    if (err) console.error(err);
    
    app.use(router);
    app.listen(app.get('port'), () => {
        console.log(`Servidor express inciado en ${app.get('port')}`);
    });
});