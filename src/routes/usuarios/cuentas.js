const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const querysCuentas = require('../usuarios/controllers/querysCuentas');
const querysUsuarios = require('../usuarios/controllers/querysUsuarios');
// Configuracion archivo - variables de entorno
const envFile = "./src/config/.env";
dotenv.config({ path: envFile });

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
   const resultadoID = await querysUsuarios.obtenerIdUsuario(req.body.ID_USUARIO);

   if (resultadoID != undefined) {
      req.body.ID_USUARIO = resultadoID.ID_USUARIO;
      const resultado = await querysCuentas.obtenerConteoCuentaSesion(req.body);

      if (resultado.CONTEO > 0) {
         const resultadoExistencia = await querysCuentas.obtenerCuentaSesion(req.body);
         const resultadoDesencriptar = await querysCuentas.desencriptarPassowrd(PASSWORD, resultadoExistencia.PASSWORD);

         const payload = {
            check:  true
         };
         
         const jwtRespuesta = jwt.sign(payload, process.env.LLAVE_JWT);
         
         res.json({
            ID_USUARIO : resultadoID.ID_USUARIO,
            ID_CUENTA: resultadoExistencia.ID_CUENTA,
            MENSAJE: resultadoDesencriptar.MENSAJE,
            ESTADO: resultadoDesencriptar.ESTADO,
            TOKEN: jwtRespuesta
         });
      }
      else {
         res.json({ ID: -1, MENSAJE: "USUARIO NO ENCONTRADO", ESTADO: -1 });
      }
   }
   else {
      res.json({ ID: -1, MENSAJE: "CODIGO NO REGISTRADO", ESTADO: -1 });
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