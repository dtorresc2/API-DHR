const express = require('express');
const router = express.Router();

const querysUsuarios = require('../usuarios/controllers/querysUsuarios');
const funcionesS3 = require('../../config/s3');

router.get('/usuarios', async (req, res) => {
   const listadoUsuarios = await querysUsuarios.obtenerListadoUsuarios();
   res.json(listadoUsuarios);
});

router.get('/usuarios/:id', async (req, res) => {
   const listadoUsuarios = await querysUsuarios.obtenerUsuarioEspecifico(req.params);
   res.json(listadoUsuarios);
});

router.get('/usuarios/:id/codigo', async (req, res) => {
   const resultado = await querysUsuarios.obtenerIdUsuario(req.params.id);
   res.json(resultado);
});

router.post('/usuarios', async (req, res) => {
   const resultadoConteo = await querysUsuarios.obtenerConteoUsuarios();
   req.body.CODIGO = resultadoConteo.CONTEO + 1000;
   const resultadoRegistro = await querysUsuarios.registrarUsuario(req.body);
   res.json(resultadoRegistro);
});

router.put('/usuarios/:id', async (req, res) => {
   let nombre = req.params.id + "/perfil/imagen_perfil";
   req.body.URL = nombre;
   const resultado = await querysUsuarios.actualizarUsuario(req.params, req.body);
   if (req.body.buffer == '0') {
      res.json(resultado);
   }
   else {
      const buffer = Buffer.from(req.body.buffer, 'base64');
      const resultadoURL = await funcionesS3.imageUpload(`${nombre}.jpg`, buffer);
      res.json({ ID: resultado.ID, MENSAJE: resultado.MENSAJE, URL: resultadoURL });
   }
});

router.delete('/usuarios/:id', async (req, res) => {
   const resultado = await querysUsuarios.eliminarUsuario(req.params);
   res.json(resultado);
});

// Funcion S3 prueba
router.get('/productoS3', async (req, res) => {
   const resultadoS3 = await funcionesS3.subirS3();
   res.json({ res: resultadoS3 });
});

router.get('/eliminarS3', async (req, res) => {
   const resultadoS3 = await funcionesS3.eliminarImagen({ key: 'not.jpg' });
   res.json({ res: resultadoS3 });
});


module.exports = router;