import express from 'express'; // import express

const router = express.Router();//creo una instancia de express.Router () y lo dejo guardado

router.get ("/",(req,res) =>{
    res.send("Esta es la ruta para los usuarios")
})

router.get ("/about",(req,res) =>{
    res.send("Esta es la ruta de about")
})

export default router;//exporto la instancia de express.Router()
