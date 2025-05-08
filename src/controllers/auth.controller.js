export const home = (req,res) => {
    res.send("Esta es la ruta home para los usuarios") // mensaje de benvenida
}

export const about = (req, res) => {
    res.send("Esta es la ruta de about")
}

export const getUser = (req,res) => {
    try {
      const {username, email, edad, password} = req.body; //obtengo el usuario del body de la peticion

      if(!username || !email || !edad || !password){
        return res.status(400).json({message:"Todos los datos del usuario son obligatorios"}) //si no se envia el usuario, devuelvo un error 400
      }     

      console.log(req.body);
      
      return res.status(200).json({
        user: {
            username,
            email,
            edad,
            password
        }, //devuelvo el usuario
        message: "Usuario obtenido correctamente" //mensaje de exito 
      })         
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error obteniendo el usuario"})        
    }
}