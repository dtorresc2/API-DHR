const express = require('express');
const router = express.Router();

const querysTratamientos = require('./controllers/querysTratamientos');

router.post('/tratamientos', async (req, res) => {
   const resultado = await querysTratamientos.registrarHistorialMedico(req.body);
   res.json(resultado);
});

router.get('/tratamientos/:id', async (req, res) => {
   const resultado = await querysTratamientos.obtenerHistorialMedico(req.params);
   res.json(resultado);
});

router.put('/tratamientos/:id', async (req, res) => {
   const resultado = await querysTratamientos.actualizarHistorialMedico(req.params, req.body);
   res.json(resultado);
});

router.delete('/tratamientos/:id', async (req, res) => {
   const resultado = await querysTratamientos.eliminarHistorialMedico(req.params);
   res.json(resultado);
});

module.exports = router;