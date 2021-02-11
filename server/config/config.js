// Puerto
process.env.PORT = process.env.PORT || 3000;


//entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


//vencimiento del tojen
//60 segundos
//60 minutos
//24 horas
//30 días
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;


//SEED de autenticación
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';


//BD
let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    //urlDB = 'mongodb+srv://atlas_1:BIJGt2mK8QB7Lica@cluster0.yiprd.mongodb.net/cafe';
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;

//Google Client ID
process.env.CLIENT_ID = process.env.CLIENT_ID || '876631671660-i3rnv7loal7nmdvo0af1b0vfbnlgvib3.apps.googleusercontent.com';