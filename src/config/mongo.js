const mongoose = require('mongoose');
require('dotenv').config();

async function connectMongo() {
    try
    {
        await mongoose.connect(process.env.MONGO_URI); //la conexion de .env que se creó
        console.log('conexion exitosa a mongoDB');
    }
    catch (error)
    {
        console.error('Error al conectar con MongoDB:', error.message);
        throw error;
    }

}

module.exports = connectMongo;

//Pluggin para autocompletar en visualstudio 