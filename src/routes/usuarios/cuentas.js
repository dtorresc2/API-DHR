const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const querysCuentas = require('../usuarios/controllers/querysCuentas');

router.get('/cuentas', async (req, res) => {
   const listadoCuentas = await querysCuentas.obtenerListadoCuentas();
   res.json(listadoCuentas);
});

router.get('/cuentas/:id', async (req, res) => {
   const listadoCuentas = await querysCuentas.obtenerListadoCuentasPorUsuario(req.params);
   res.json(listadoCuentas);
});

router.get('/cuentas/:id/usuario/:user', async (req, res) => {
   const listadoCuentas = await querysCuentas.obtenerCuentaEspecifica(req.params);
   res.json(listadoCuentas);
});

router.post('/cuentas', async (req, res) => {
   const { PASSWORD } = req.body;
   req.body.PASSWORD = bcrypt.hashSync(PASSWORD, 10);

   const resultado = await querysCuentas.obtenerConteoCuentaSesion(req.body);

   if (resultado.CONTEO < 1) {
      const resultadoRegistro = await querysCuentas.registrarCuenta(req.body);
      res.json(resultadoRegistro);
   }
   else {
      res.json({ ID: -1, MENSAJE: "USUARIO EXISTENTE" })
   }
});

module.exports = router;