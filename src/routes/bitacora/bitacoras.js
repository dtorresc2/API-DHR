const express = require('express');
const router = express.Router();
const moment = require('moment-timezone');

const querysBitacora = require('../bitacora/controllers/querysBitacoras');

router.get('/bitacora', async (req, res) => {
   const resultado = await querysBitacora.obtenerListadoBitacora();
   res.json(resultado);
});

router.get('/bitacora/:id', async (req, res) => {
   const resultado = await querysBitacora.obtenerListadoBitacoraXUsuario(req.params);
   res.json(resultado);
});

router.post('/bitacora', async (req, res) => {
   const fechaMoment = moment().tz("America/Guatemala").format('YYYY-MM-DD HH:mm:ss');
   req.body.FECHA = fechaMoment;
   console.log(req.body);

   const resultado = await querysBitacora.registrarBitacora(req.body);
   res.json(resultado);
});

module.exports = router;