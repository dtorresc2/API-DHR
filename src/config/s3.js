const dotenv = require('dotenv');
const aws = require('aws-sdk');
const fs = require('fs');

// Configuracion archivo - variables de entorno
const envFile = "./src/config/.env";
dotenv.config({ path: envFile });

// Funciones para S3 ==============================================================
const s3URL = "https://s3.amazonaws.com/dhr-sanjose/";
const fileName = './src/not.png'

function getImgBuffer(base64) {
   const base64str = base64.replace(/^data:image\/\w+;base64,/, '');
   return Buffer.from(base64str, 'base64');
}

aws.config.update({
   accessKeyId: process.env.S3_PUBLIC,
   secretAccessKey: process.env.S3_PRIVATE,
   region: 'us-east-1'
});

const s3Bucket = new aws.S3({
   params: {
      Bucket: process.env.BUCKET
   }
});

const imageUpload = (path, buffer) => {
   let pathURL;
   const data = {
      Key: path,
      Body: buffer,
      ContentEncoding: 'base64',
      ContentType: 'image/jpeg',
      ACL: 'public-read'
   };
   return new Promise((resolve, reject) => {
      s3Bucket.putObject(data, (err) => {
         if (err) {
            pathURL = err;
            reject(err);
         }
         else {
            const URL = s3URL + path;
            pathURL = URL;
            resolve(pathURL);
         }
      });
   });
};

const getImageURL = async (name, base64Image) => {
   const buffer = getImgBuffer(base64Image);
   const currentTime = new Date().getTime();
   const auxURL = await imageUpload(name, buffer);
   return auxURL;
}

const subirS3 = async () => {
   const buffer = fs.readFileSync(fileName, 'base64');
   const currentTime = new Date().getTime();
   const url = await getImageURL("not.jpg", buffer);
   return url;
}

const eliminarImagen = ( key ) => {
   return new Promise((resolve, reject) => {
      const data = {
         Key: key
      };

      s3Bucket.deleteObject(data, (err) => {
         if (err) {
            reject("ERROR AL ELIMINAR IMAGEN");
         }
         else {
            resolve("IMAGEN ELIMINADA");
         }
      });

   });
}

module.exports = { 
   subirS3 : subirS3,
   imageUpload : imageUpload,
   eliminarImagen : eliminarImagen
}