const express = require('express');
const router = express.Router();

const querysPadecimientos = require('./controllers/querysPadecimientos');

router.post('/padecimientos', async (req, res) => {
   const resultado = await querysPadecimientos.registrarPadecimientos(req.body);
   res.json(resultado);
});

router.post('/padecimientos/full', async (req, res) => {
   const resultado = await querysPadecimientos.registrarPadecimientos(req.body);
   res.json(resultado);
});

router.get('/padecimientos/:id', async (req, res) => {
   const resultado = await querysPadecimientos.obtenerPadecimientos(req.params);
   res.json(resultado);
});

router.put('/padecimientos/:id', async (req, res) => {
   console.log(req.params);
   const resultado = await querysPadecimientos.actualizarPadecimientos(req.params, req.body);
   res.json(resultado);
});

router.delete('/padecimientos/:id', async (req, res) => {
   const resultado = await querysPadecimientos.eliminarPadecimientos(req.params);
   res.json(resultado);
});

module.exports = router;