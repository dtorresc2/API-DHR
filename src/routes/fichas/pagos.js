const express = require('express');
const router = express.Router();

const querysPagos = require('../fichas/controllers/querysPagos');


router.post('/pagos', async (req, res) => {
   const resultado = await querysPagos.registrarPago(req.body);
   res.json(resultado);
});

module.exports = router;