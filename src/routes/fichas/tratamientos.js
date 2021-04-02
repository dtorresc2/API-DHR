const express = require('express');
const router = express.Router();

const querysTratamientos = require('./controllers/querysTratamientos');

router.post('/tratamientos', async (req, res) => {
   let contador = 0;

   if (req.body.TRATAMIENTOS.length > 0) {
      let arreglo = req.body.TRATAMIENTOS;

      for (let element of arreglo) {
         contador++;
         const resultado = await querysTratamientos.registrarTratamiento(element, contador);
      }

      res.json({ MENSAJE: 'TRATAMIENTOS REGISTRADOS', CUENTA: contador });
   }
   else {
      res.json({ MENSAJE: 'ERROR', CUENTA: -1 });
   }
});

router.get('/tratamientos/:id', async (req, res) => {
   const resultado = await querysTratamientos.obtenerTratamientos(req.params);
   res.json(resultado);
});

router.put('/tratamientos/:id', async (req, res) => {
   let contador = 0;
   const resultado = await querysTratamientos.eliminarTratamientos(req.params);

   if (resultado.ID != -1) {
      if (req.body.TRATAMIENTOS.length > 0) {
         let arreglo = req.body.TRATAMIENTOS;

         for (let element of arreglo) {
            contador++;
            const resultado = await querysTratamientos.registrarTratamiento(element, contador);
         }
         res.json({ MENSAJE: 'TRATAMIENTOS REGISTRADOS', CUENTA: contador });
      }
      else {
         res.json({ MENSAJE: 'ERROR', CUENTA: -1 });
      }
   }
   else {
      res.json({ MENSAJE: 'ERROR', CUENTA: -1 });
   }
});

router.delete('/tratamientos/:id', async (req, res) => {
   const resultado = await querysTratamientos.eliminarTratamientos(req.params);
   res.json(resultado);
});

module.exports = router;