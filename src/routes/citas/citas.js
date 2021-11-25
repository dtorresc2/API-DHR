const express = require('express');
const router = express.Router();

const querysCitas = require('./controllers/querysCitas');

router.post('/citas/consulta', async (req, res) => {
   const resultado = await querysCitas.obtenerListadoCitas(req.body);
   res.json(resultado);
});

module.exports = router;