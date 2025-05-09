import express from 'express'; // import express
import { about, home } from '../controllers/auth.controllers';

const router = express.Router();//creo una instancia de express.Router () y lo dejo guardado

router.get ("/", home);

router.get ("/about", about)

router.post("/getUser", getUser); //ruta para obtener el usuario

export default router;//exporto la instancia de express.Router()
