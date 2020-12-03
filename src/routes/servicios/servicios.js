const express = require('express');
const router = express.Router();

const querysServicios = require('./controllers/querysServicios');

router.post('/servicios', async (req, res) => {
   const resultado = await querysServicios.registrarServicio(req.body);
   res.json(resultado);
});

module.exports = router;