const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const querysCuentas = require('../usuarios/controllers/querysCuentas');
const querysUsuarios = require('../usuarios/controllers/querysUsuarios');

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

router.post('/cuentas/login', async (req, res) => {
   const { PASSWORD } = req.body;
   const resultado = await querysCuentas.obtenerConteoCuentaSesion(req.body);

   if (resultado.CONTEO > 0) {
      const resultadoExistencia = await querysCuentas.obtenerCuentaSesion(req.body);
      const resultadoDesencriptar = await querysCuentas.desencriptarPassowrd(PASSWORD, resultadoExistencia.PASSWORD);

      res.json({
         ID: resultadoExistencia.ID_CUENTA,
         MENSAJE: resultadoDesencriptar.MENSAJE,
         ESTADO: resultadoDesencriptar.ESTADO
      });
   }
   else {
      res.json({ ID: -1, MENSAJE: "USUARIO NO ENCONTRADO", ESTADO: -1 });
   }
});

router.put('/cuentas/:id/pass', async (req, res) => {
   const { PASSWORD } = req.body;
   req.body.PASSWORD = bcrypt.hashSync(PASSWORD, 10);

   const resultadoActualizacion = await querysCuentas.actualizarPassword(req.body, req.params);
   res.json(resultadoActualizacion);
});

router.delete('/cuentas/:id', async (req, res) => {
   const resultado = await querysCuentas.eliminarCuenta(req.params);
   res.json(resultado);
});

module.exports = router;