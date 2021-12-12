const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Configuracion archivo - variables de entorno
const envFile = "./src/config/.env";
dotenv.config({ path: envFile });

const rutasProtegidas = (req, res, next) => {
   const token = req.headers["x-access-dhr-token"];

   if (!token) {
      return res.status(403).json({ MENSAJE: 'EL TOKEN ES REQUERIDO' });
   }
   try {
      const decoded = jwt.verify(token, process.env.LLAVE_JWT);
      req.user = decoded;
   } catch (err) {
      return res.status(401).json({ MENSAJE: 'TOKEN INVALIDO' });
   }
   return next();
};

module.exports = rutasProtegidas;