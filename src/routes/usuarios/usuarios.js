const express = require('express');
const router = express.Router();

const querysUsuarios = require('../usuarios/controllers/querysUsuarios');

router.get('/usuarios', async (req, res) => {
   const listadoUsuarios = await querysUsuarios.obtenerListadoUsuarios();
   res.json(listadoUsuarios);
});

router.get('/usuarios/:id', async (req, res) => {
   // const { id } = req.params;
   const listadoUsuarios = await querysUsuarios.obtenerUsuarioEspecifico(req.params);
   res.json(listadoUsuarios);
});

module.exports = router;