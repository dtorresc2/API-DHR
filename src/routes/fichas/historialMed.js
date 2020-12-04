const express = require('express');
const router = express.Router();

const querysHistorialMed = require('./controllers/querysHistorialMed');

router.post('/historial-medico', async (req, res) => {
   const resultado = await querysHistorialMed.registrarHistorialMed(req.body);
   res.json(resultado);
});

module.exports = router;