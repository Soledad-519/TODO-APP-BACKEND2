import express from "express"; //importar express
import dotenv from "dotenv"; // importar dotenv
import fs from "node.fs";// importar fs

dotenv.config();//ejecuta dotenv

const app = express(); //crear una instancia de express



const PORT = process.env.PORT //definir el puerto

app.listen(PORT, () => {
    console.log("Server is running on port: http://localhost:"+PORT); //iniciar el servidor en el puerto 3000
})

//MANEJO DE RUTAS