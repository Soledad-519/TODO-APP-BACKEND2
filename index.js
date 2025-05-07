import express, {urlencoded} from "express"; //importar express
import dotenv from "dotenv"; //importar dotenv
import fs from "node:fs"; //importar fs
import cors from "cors"; //importar cors


dotenv.config() //ejecuta dotenv

const app = express(); //crear una instancia de express

const PORT = process.env.PORT || 3000;

//Middlewares
app.use(cors({
    origin: "*", // Permitir todas las solicitudes de origen cruzado desde cualquier origen
    credentials:true // Permitir el intercambio de credenciales (cookies, encabezados de autorización, etc.)
}));
app.use(express.json()); //analizar el cuerpo de la solicitud como JSON
app.use(urlencoded({
    extended:true //analizar el cuerpo de la solicitud como URL codificada
}))



//MANEJO DE RUTAS
// Leemos todos los archivos dentro del directorio './src/routes' de forma síncrona.
// fs.readdirSync devuelve un array con los nombres de todos los archivos en ese directorio.
const routeFiles = fs.readdirSync('./src/routes');

// Iteramos sobre cada archivo encontrado en el directorio de rutas
routeFiles.forEach((file) => {
    // Usamos importaciones dinámicas (import()) para cargar cada módulo de ruta.
    // Esto es útil porque:
    // 1. Nos permite cargar módulos de forma asíncrona
    // 2. Cada ruta se registra independientemente
    // 3. Si una ruta falla, no afecta a las demás
    import(`./src/routes/${file}`).then((route) => {
        // Registramos la ruta en nuestra aplicación Express
        // Todas las rutas importadas serán prefijadas con '/api/v1'
        // Esto nos da:
        // - Versionado de API
        // - Un punto de entrada común para todas las rutas
        // - Mejor organización del código
        app.use('/api/v1', route.default);
    }).catch((err) => {
        console.error(`Error al cagrar la ruta ${file}:`, err)        
    })
})

    

//Iniciar el servidor
const server = async () => {
    try {
        app.listen(PORT, () => {
            console.log("Server is running on port: http://localhost:"+PORT); //iniciar el servidor en el puerto 3000
        })        
    } catch (error) {
        console.log("Error al iniciar el servidor: ", error);
        process.exit(1) //salir del proceso con un código de error 1        
    }
}


server(); //ejecutar la función server






