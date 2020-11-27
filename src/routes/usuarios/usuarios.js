const express = require('express');
const router = express.Router();

const querysUsuarios = require('../usuarios/controllers/querysUsuarios');

router.get('/usuarios', async (req, res) => {
   const listadoUsuarios = await querysUsuarios.obtenerListadoUsuarios();
   res.json(listadoUsuarios);
});

router.get('/usuarios/:id', async (req, res) => {
   const listadoUsuarios = await querysUsuarios.obtenerUsuarioEspecifico(req.params);
   res.json(listadoUsuarios);
});

router.get('/usuarios/:id/codigo', async (req, res) => {
   const resultado = await querysUsuarios.obtenerIdUsuario(req.params);
   res.json(resultado);
});


router.post('/usuarios', async (req, res) => {
   const resultadoRegistro = await querysUsuarios.registrarUsuario(req.body);
   res.json(resultadoRegistro);
});

module.exports = router;