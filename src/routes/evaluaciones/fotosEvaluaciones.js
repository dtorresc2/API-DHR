const express = require('express');
const router = express.Router();

const funcionesS3 = require('./../../config/s3');
const guardia = require('./../../config/guardia');
const querysFotosEvaluacion = require('./controllers/querysFotosEvaluacion');

router.post('/evaluaciones/fotos/actualizar', guardia, async (req, res) => {
   // FOTOS
   let contador = 0;
   let ID_USUARIO = req.body.FOTOS.ID_USUARIO;
   let ID_EVALUACION = req.body.FOTOS.ID_EVALUACION
   let ruta = "Usuarios/" + ID_USUARIO + "/FE/FE-" + ID_EVALUACION + "/Fotos";

   let resultadoEliminarFotos = await querysFotosEvaluacion.eliminarFotosEvaluacion(ID_USUARIO);
   let resultadoEliminarCarpeta = await funcionesS3.eliminarCarpeta(ruta);

   if (req.body.FOTOS.DETALLE.length > 0) {
      let arreglo = req.body.FOTOS.DETALLE;

      for (let element of arreglo) {
         contador++;
         element.ID_EVALUACION = ID_EVALUACION;

         // RegistrarImagen
         let nombre = "F-" + contador;
         let nombreArchivo = `${ruta}/${nombre}.jpg`

         const buffer = Buffer.from(element.FOTO, 'base64');
         const resultadoURL = await funcionesS3.imageUpload(nombreArchivo, buffer);

         // Ajustar Datos
         element.DESCRIPCION = "FOTO EVALUACION - Foto #" + (contador + 1);
         element.URL = ruta;
         element.NOMBRE = nombre + '.jpg';

         const resultadoFoto = await querysFotosEvaluacion.registrarFoto(element);
      }
   }

   res.json({ MENSAJE: 'FOTOS ACTUALIZADAS', ESTADO: 1 });

});

module.exports = router;