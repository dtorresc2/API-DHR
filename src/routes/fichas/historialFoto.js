const express = require('express');
const router = express.Router();

const querysFotosFN = require('./controllers/querysFotosFN');
const querysFichas = require('./controllers/querysFichas');
const funcionesS3 = require('./../../config/s3');
// const { CostExplorer } = require('aws-sdk');


router.post('/fotos', async (req, res) => {
   const resultado = await querysFotosFN.registrarFotos(req.body);
   res.json(resultado);
});

router.get('/fotos/:id', async (req, res) => {
   const resultado = await querysFotosFN.obtenerListadoFotosFicha(req.params);
   res.json(resultado);
});

router.put('/fotos/:id', async (req, res) => {
   let contador = 0;
   let listadoFotos = await querysFotosFN.obtenerListadoFotosFicha(req.params);
   let resultadoFichas = await querysFichas.obtenerListadoFichasEspecifico(req.params);
   let resultadoS3 = '';

   if (listadoFotos.length > 0) {
      resultadoS3 = await funcionesS3.eliminarCarpeta(listadoFotos[0].URL);
   }

   const resultadoEliminado = await querysFotosFN.eliminarFotosFicha(req.params);

   if (resultadoEliminado.ID != -1) {
      if (req.body.HISTORIAL_FOTOS.length > 0) {
         let arreglo = req.body.HISTORIAL_FOTOS;
         for (let element of arreglo) {
            contador++;

            // RegistrarImagen
            let ruta = resultadoFichas.ID_USUARIO + "/FN-" + element.ID_FICHA;
            let nombre = "HF-" + (contador);
            let nombreArchivo = `${ruta}/${nombre}.jpg`

            const buffer = Buffer.from(element.FOTO, 'base64');
            const resultadoURL = await funcionesS3.imageUpload(nombreArchivo, buffer);

            // Ajustar Datos
            element.DESCRIPCION = "Historial Fotografico - Foto #" + (contador);
            element.URL = ruta;
            element.NOMBRE = nombre + '.jpg';

            const resultado = await querysFotosFN.registrarFotos(element);
         }
         res.json({ MENSAJE: 'FOTOS REGISTRADAS', CUENTA: contador, S3: resultadoS3 });
      }
      else {
         res.json({ MENSAJE: 'ERROR', CUENTA: -1 });
      }
   }
   else {
      res.json({ MENSAJE: 'ERROR', CUENTA: -1 });
   }
});

router.delete('/pagos/:id/ficha', async (req, res) => {
   const resultado = await querysFotosFN.eliminarFotosFicha(req.params);
   res.json(resultado);
});

module.exports = router;