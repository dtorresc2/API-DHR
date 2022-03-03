const express = require('express');
const router = express.Router();
const funcionesS3 = require('./../../config/s3');
const guardia = require('./../../config/guardia');

const querysContrato = require('./controllers/querysContrato');

router.post('/evaluaciones/contrato/actualizar', guardia, async (req, res) => {
   let ID_EVALUACION = req.body.ID_EVALUACION;
   let ID_USUARIO = req.body.ID_USUARIO;

   let ruta = "Usuarios/" + ID_USUARIO + "/FE/FE-" + ID_EVALUACION + "/Contrato";
   const resultadoS3 = await funcionesS3.eliminarCarpeta(ruta);

   // RegistrarImagen - Doctor
   let nombre = "firma_doctor";
   let nombreArchivo = `${ruta}/${nombre}.jpg`
   let buffer = Buffer.from(req.body.URL_FIRMA_DOC, 'base64');
   let resultadoURL = await funcionesS3.imageUpload(nombreArchivo, buffer);
   req.body.URL_FIRMA_DOC = ruta;

   // RegistrarImagen - Paciente
   nombre = "firma_paciente";
   nombreArchivo = `${ruta}/${nombre}.jpg`
   buffer = Buffer.from(req.body.URL_FIRMA_PAC, 'base64');
   resultadoURL = await funcionesS3.imageUpload(nombreArchivo, buffer);
   req.body.URL_FIRMA_PAC = ruta;

   const resultado = await querysContrato.actualizarContrato(req.body);

   res.json({ MENSAJE: 'CONTRATO ACTUALIZADO', ESTADO: 1 });
});

module.exports = router;