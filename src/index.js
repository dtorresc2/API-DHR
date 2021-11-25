const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();

// Configuracion del Puerto
app.set('port', process.env.PORT || 3000);

// Configuracion JSON
app.use(express.json({ limit: '80MB' }));
app.use(cors());
dotenv.config();

// Rutas

// Rutas - Citas
app.use(require('./routes/citas/citas'));

// Rutas - Catalogos
app.use(require('./routes/pacientes/pacientes'));
app.use(require('./routes/piezas/piezas'));
app.use(require('./routes/servicios/servicios'));
app.use(require('./routes/usuarios/usuarios'));
app.use(require('./routes/usuarios/cuentas'));

// Rutas - Bitacora
app.use(require('./routes/bitacora/bitacoras'))

// Rutas - Ficha Normal
app.use(require('./routes/fichas/fichas'));
app.use(require('./routes/fichas/pagos'));
app.use(require('./routes/fichas/historialMed'));
app.use(require('./routes/fichas/padecimientos'));
app.use(require('./routes/fichas/historialOdonto'));
app.use(require('./routes/fichas/tratamientos'));
app.use(require('./routes/fichas/historialFoto'));

// Iniciando Servidor
app.listen(app.get('port'), () => {
   console.log('Servidor en Puerto ', app.get('port'));
})