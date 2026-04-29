const path = require('path');
require('dotenv').config({path:path.resolve(__dirname,'../../.env')});
//require('dotenv').config();
const app= require ('./app');
const connectMongo = require ('./config/mongo');
const {connectMySQL} = require ('./config/mysql');
const PORT = process.env.PORT || 3000;
async function iniciarServidor(){
    try{
        await connectMySQL();
        await connectMongo();
        app.listen(PORT , () => {
            console.log("Servidor ejecutandose en puerto " + PORT);
        });
    }catch (error){
        console.error ("Error al iniciar el servidor");
        throw error;
    }
}

iniciarServidor();
