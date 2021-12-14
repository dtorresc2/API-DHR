const express = require('express');
const router = express.Router();

const querysHistorialOdonto = require('./controllers/querysHistorialOdonto');
const guardia = require('./../../config/guardia');

router.post('/historial-odonto', guardia, async (req, res) => {
   const resultado = await querysHistorialOdonto.registrarHistorialOdontodologico(req.body);
   res.json(resultado);
});

router.get('/historial-odonto/:id', guardia, async (req, res) => {
   const resultado = await querysHistorialOdonto.obtenerHistorialOdontodologico(req.params);
   res.json(resultado);
});

router.put('/historial-odonto/:id', guardia, async (req, res) => {
   const resultado = await querysHistorialOdonto.actualizarHistorialOdontogologico(req.params, req.body);
   res.json(resultado);
});

router.delete('/historial-odonto/:id', guardia, async (req, res) => {
   const resultado = await querysHistorialOdonto.eliminarHistorialOdontodologico(req.params);
   res.json(resultado);
});

module.exports = router;