const express = require('express');
const router = express.Router();

const querysFotosFN = require('./controllers/querysFotosFN');
const funcionesS3 = require('./../../config/s3');


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
   const resultado = await querysFotosFN.eliminarFotosFicha(req.params);
   const resultadoS3 = await funcionesS3.eliminarImagen(req.body.HISTORIAL_FOTOS[0].URL);

   if (resultado.ID != -1) {
      if (req.body.HISTORIAL_FOTOS.length > 0) {
         let arreglo = req.body.HISTORIAL_FOTOS;

         for (let element of arreglo) {
            contador++;

            // RegistrarImagen
            let ruta = element.ID_USUARIO + "/FN-" + element.ID;
            let nombre = "HF-" + (i + 1);
            // element.URL = nombre;

            const buffer = Buffer.from(element.FOTO, 'base64');
            const resultadoURL = await funcionesS3.imageUpload(`${ruta}/${nombre}.jpg`, buffer);

            // Ajustar Datos
            element.DESCRIPCION = "Historial Fotografico - Foto #" + (i + 1);
            element.URL = ruta;
            element.NOMBRE = nombre;

            const resultado = await querysFotosFN.registrarFotos(element);
         }
         res.json({ MENSAJE: 'FOTOS REGISTRADOS', CUENTA: contador });
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