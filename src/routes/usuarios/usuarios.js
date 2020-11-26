const express = require('express');
const router = express.Router();

const querysUsuarios = require('../usuarios/controllers/querysUsuarios');

router.get('/usuarios', async (req, res) => {
   const listadoUsuarios = await querysUsuarios.obtenerListadoUsuarios();
   res.json(listadoUsuarios);
});

router.get('/usuarios/:id', async (req, res) => {
   // const { id } = req.params;
   const listadoUsuarios = await querysUsuarios.obtenerUsuarioEspecifico(req.params);
   res.json(listadoUsuarios);
});

router.post('/usuarios', async (req, res) => {
   // const { password } = req.body;
   // req.body.password = bcrypt.hashSync(password, 10);

   // const conteoUsuario = await usuarioAutenticacion.consultarExistenciaConteo(req.body);

   // if (conteoUsuario.conteo < 1) {
   //     const resultadoRegistro = await usuarioAutenticacion.registrarCliente(req.body);
   //     const resultadoUltimoID = await usuarioAutenticacion.ultimoCliente();
   //     const sistema = await bitacora.obtenerDetalleSistema();
   //     const resultadoBitacora = await usuarioAutenticacion.registrarBitacora(resultadoUltimoID, "Creacion de cuenta", sistema);
   //     res.json({ EstadoInsert: resultadoRegistro, Id: resultadoUltimoID });
   // }
   // else {
   //     res.json({ EstadoInsert: 'Usuario Existente', Id: -1 });
   // }
   const resultadoRegistro = await querysUsuarios.registrarUsuario(req.body);
   res.json(resultadoRegistro);

});

module.exports = router;