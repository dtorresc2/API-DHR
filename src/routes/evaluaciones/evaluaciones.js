const express = require('express');
const router = express.Router();
const moment = require('moment-timezone');
const funcionesS3 = require('./../../config/s3');
const guardia = require('./../../config/guardia');
const req = require('express/lib/request');

router.post('/evaluaciones/registro', guardia, async (req, res) => {

});

router.put('/fichas/:id/estado', guardia, async (req, res) => {
   const resultadoRegistro = await querysFichas.actualizarEstadoFicha(req.params, req.body);
   res.json(resultadoRegistro);
});

module.exports = router;