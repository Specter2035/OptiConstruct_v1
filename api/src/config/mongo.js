const mongoose = require('mongoose');
require('dotenv').config();

async function connectMongo(){
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Conexión exitosa a MongoDB')
    } catch(error)
    {
        console.error('Error al conectar con MongoDB', error.Message)
        throw error;
    }
}

module.exports = connectMongo