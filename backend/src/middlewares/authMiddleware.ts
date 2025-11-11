import { NextFunction, Response } from "express";
import { User } from "../entities/User";
import { verify } from "jsonwebtoken";
import { userRepository } from "../repositories/userRepository";




interface IPayload{
  id:number,
}
// const authMiddleware = (req:Request,res: Response,next:NextFunction) =>{
//     try {
//         const cookie = req.body.cookie

//     } catch (error) {
        
//         next()
//     }
// }
export const authenticateToken = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const auth = req.body.auth
    
    if (!auth) {
      res.status(401).json({
        success: false,
        message: 'El usuario es requerido'
      });
      return;
    }

    const decoded = verify(auth, process.env.JWT_SECRET || 'TU_SECRET_KEY_PROVISORIA')
    if (!decoded.id) {
      res.status(400).json({
        success:false,
        message:"No se encontró el usuario"
      })
    }
    const user = await userRepository.findOneBy({"id_usuario": decoded.id})
    // const user = await UserModel.findById(decoded.id).select('-password');
    // const user : User = {
    //     "id_usuario":1,
    //     "apellido":"Fleitas",
    //     "email":"eze@gmail.com",
    //     "nombre":"eze",
    //     "password":"1234",
    //     "telefono":3704786682,
    //     "rol":{
    //          "id_rol":1,
    //          "rol":"Admin",
    //          "usuarios":[]
    //     }
    // }
    
    if (!user ) {
      res.status(401).json({
        success: false,
        message: 'Usuario no encontrado'
      });
      return;
    }

    req.user = user as User
    next();
  } catch (error) {
    res.status(403).json({
      success: false,
      message: 'Token inválido o expirado'
    });
  }
};


