const express = require('express');
const router = express.Router();

const querysPadecimientos = require('./controllers/querysPadecimientos');
const guardia = require('./../../config/guardia');

router.post('/padecimientos', guardia, async (req, res) => {
   const resultado = await querysPadecimientos.registrarPadecimientos(req.body);
   res.json(resultado);
});

router.post('/padecimientos/full', guardia, async (req, res) => {
   const resultado = await querysPadecimientos.registrarPadecimientos(req.body);
   res.json(resultado);
});

router.get('/padecimientos/:id', guardia, async (req, res) => {
   const resultado = await querysPadecimientos.obtenerPadecimientos(req.params);
   res.json(resultado);
});

router.put('/padecimientos/:id', guardia, async (req, res) => {
   console.log(req.params);
   const resultado = await querysPadecimientos.actualizarPadecimientos(req.params, req.body);
   res.json(resultado);
});

router.delete('/padecimientos/:id', guardia, async (req, res) => {
   const resultado = await querysPadecimientos.eliminarPadecimientos(req.params);
   res.json(resultado);
});

module.exports = router;