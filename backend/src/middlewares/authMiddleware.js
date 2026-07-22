//Este Middleware lo que hará será:
//#1- Accede a las cookies
//#2- Mira que valor hay dentro de esa cookie
//#3- Si el valor de la cookie coincide con la protección que
//escribimos en el enpoint o método HTTP entonces lo deja pasar
//Si no, no

import jsonwebtoken from "jsonwebtoken";
import { config } from "../../config.js";

export const validateAuthCookie = (allowedTypes =[]) => {
    
    return (req, res, next) => {
        try {
            //#1- Extraer el token que está en la cookie (authCookie)
            //ya que en esa cookie está el tipo de usuario guardado
            const {authCookie} = req.cookies;

            if(!authCookie){
                return res.status(403).json({message: "No cookie found, Authorization require"})
            }
            
            //#2- Extraer toda la información de la cookie
            const decoded = jsonwebtoken.verify(authCookie, config.JWT.secret)

            //Verificar si el rol que tiene la cookie puede pasar o no
            if(!allowedTypes.includes(decoded.userType)){
                return res.status(401).json({message: "Access denied"})
            }

            next()
        } catch (error) {
            console.log("error"+error)
            return res.status(500).json({message: "Internal server error"})
        }
    }
}

