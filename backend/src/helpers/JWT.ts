import jwt from "jsonwebtoken";
import { User } from "../entities/User";
export class JWTHelper {
    private static SECRET = process.env.JWT_SECRET || 'MiSecreto';
    private static readonly EXPIRES_IN = "1h"
    constructor(){}

    private static jwtOptions(): jwt.SignOptions {
    return {
      expiresIn: this.EXPIRES_IN
    }
  }

    private static jwtPayload(user: User) {
    return {
      id: user.id_usuario,
    };
  }


  public static generateToken(user: User): string {
    const payload = this.jwtPayload(user);
    const options = this.jwtOptions();

    return jwt.sign(payload, this.SECRET, options);
  }
    
}