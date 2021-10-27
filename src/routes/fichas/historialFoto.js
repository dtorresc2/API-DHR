const express = require('express');
const router = express.Router();

const querysFotosFN = require('./controllers/querysFotosFN');

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

   if (resultado.ID != -1) {
      if (req.body.HISTORIAL_FOTOS.length > 0) {
         let arreglo = req.body.HISTORIAL_FOTOS;

         for (let element of arreglo) {
            contador++;
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