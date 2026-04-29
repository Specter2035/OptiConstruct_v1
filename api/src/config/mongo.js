const path = require('path');
require('dotenv').config({path:path.resolve(__dirname,'../../.env')});
const mongoose = require('mongoose');
require('dotenv').config();

async function connectMongo(){

    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('conexion exitosa a Mongodb');
    }catch (error)
    {
     console.error("Error al conectar con mongo:", error.message);
     throw error;
    }
}

module.exports= connectMongo;
