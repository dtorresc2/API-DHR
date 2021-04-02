const express = require('express');
const router = express.Router();

const querysTratamientos = require('./controllers/querysTratamientos');

router.post('/tratamientos', async (req, res) => {
   let contador = 0;

   if (req.body.TRATAMIENTOS.length > 0) {
      let arreglo = req.body.TRATAMIENTOS;
      // arreglo.forEach(async (element, index) => {
      //    const resultado = await querysTratamientos.registrarTratamiento(element, index + 1);
      //    if (resultado.ID != -1)
      //       contador++;
      // });

      for (let element of arreglo) {
         const resultado = await querysTratamientos.registrarTratamiento(element, index + 1);
      }

      res.json({ MENSAJE: 'TRATAMIENTOS REGISTRADOS', CUENTA: contador });
   }
   
   // setTimeout(() => {
   //    res.json({ MENSAJE: 'TRATAMIENTOS REGISTRADOS', CUENTA: contador });
   // }, 1000);
});

router.get('/tratamientos/:id', async (req, res) => {
   const resultado = await querysTratamientos.obtenerTratamientos(req.params);
   res.json(resultado);
});

router.put('/tratamientos/:id', async (req, res) => {
   // const resultado = await querysTratamientos.actualizarHistorialMedico(req.params, req.body);
   let contador = 0;
   const resultado = await querysTratamientos.eliminarTratamientos(req.params);
   
   if (resultado.ID != -1) {
      if (req.body.TRATAMIENTOS.length > 0) {
         let arreglo = req.body.TRATAMIENTOS;
         arreglo.forEach(async (element, index) => {
            const resultadoRegistro = await querysTratamientos.registrarTratamiento(element, index + 1);
            if (resultadoRegistro.ID != -1)
               contador++;
         });
      }
   }
   // res.json(resultado);
   setTimeout(() => {
      res.json({ MENSAJE: 'TRATAMIENTOS REGISTRADOS', CUENTA: contador });
   }, 1000);
});

router.delete('/tratamientos/:id', async (req, res) => {
   const resultado = await querysTratamientos.eliminarTratamientos(req.params);
   res.json(resultado);
});

module.exports = router;