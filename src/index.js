const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
// const { options } = require('./routes/usuarios/usuarios');

const app = express();

// Configuracion del Puerto
app.set('port', process.env.PORT || 3000);

// Configuracion JSON
app.use(express.json({ limit: '80MB' }));
app.use(cors());
dotenv.config();

// Rutas
app.use(require('./routes/pacientes/pacientes'));
app.use(require('./routes/usuarios/usuarios'));
app.use(require('./routes/usuarios/cuentas'));
app.use(require('./routes/bitacora/bitacoras'))
app.use(require('./routes/fichas/fichas'));
app.use(require('./routes/fichas/pagos'));

// Iniciando Servidor
app.listen(app.get('port'), () => {
   console.log('Server on Port ', app.get('port'));
})