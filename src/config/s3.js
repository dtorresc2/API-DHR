const dotenv = require('dotenv');
// require('../../src/config/')

// Configuracion archivo - variables de entorno
const envFile = "./src/config/.env";
dotenv.config({ path: envFile });


// Funciones para S3 ==============================================================
const s3URL = "https://s3.amazonaws.com/coloridosgt/";
// const fileName = 'C:/Users/diego/Documents/Decimo Semestre/Seminario de Tecnologias de la Informacion/Repositorios Coloridos/apirest-coloridosgt/src/456.PNG'
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
      Bucket: 'coloridosgt'
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
            // var aux = s3URL + path;
            // var arreglo = aux.split('/');
            // var conteo = arreglo.length;
            // console.log(arreglo[conteo-1], '-', conteo);
            // console.log(data);
            // console.log(s3URL + path);
            const URL = s3URL + path;
            pathURL = URL;
            // console.log(pathURL);
            // return pathURL;
            resolve(pathURL);
         }
      });
   });
   // console.log(pathURL);
   // return pathURL;
};

const getImageURL = async (name, base64Image) => {
   const buffer = getImgBuffer(base64Image);
   const currentTime = new Date().getTime();
   // return imageUpload(`${type}/${currentTime}.jpeg`, buffer);
   // imageUpload(name, buffer);
   // return auxURL;
   const auxURL = await imageUpload(name, buffer);
   return auxURL;
   // return imageUpload('./tickets/coca.jpeg', buffer);
}

const subirS3 = async () => {
   // return new Promise((resolve, reject) => {
   const buffer = fs.readFileSync(fileName, 'base64');
   const currentTime = new Date().getTime();
   const url = await getImageURL("not.jpg", buffer);
   // const url = await getImageURL(`${currentTime}.jpg`, buffer);
   return url;
   // console.log("Entre");
   // console.log(envFile);
   // resolve("Imagen Actualizada");
   // });
}

// const eliminarImagen = ({ nombre }) => {
const eliminarImagen = ({ key }) => {
   return new Promise((resolve, reject) => {
      const data = {
         Key: key
         // Key: '1597897275879.jpg'
      };

      s3Bucket.deleteObject(data, (err) => {
         if (err) {
            reject("Error al eliminar imagen");
         }
         else {
            resolve("Imagen eliminada");
         }
      });

   });

}