const { Router } = require('express');
const routeDog= require('./routeDog');
const routeTemperament= require('./routeTemperament')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dogs',routeDog);
router.use('/temperaments',routeTemperament);

module.exports = router;
