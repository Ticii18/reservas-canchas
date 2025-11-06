"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const userService_1 = require("./userService");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userService = new userService_1.UserService();
const register = async (userData) => {
    // 1. Hashear la contraseña
    const salt = await bcryptjs_1.default.genSalt(10);
    const hashedPassword = await bcryptjs_1.default.hash(userData.password, salt);
    // 2. Reemplazar la contraseña en texto plano por la hasheada
    const dataToSave = {
        ...userData,
        password: hashedPassword,
    };
    // 3. Llamar al userService para crear el usuario
    const user = await userService.createUser(dataToSave);
    // No devolvemos la contraseña
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
};
exports.register = register;
const login = async (email, pass) => {
    // 1. Encontrar al usuario por email
    // (Debes crear esta función en tu userService)
    const user = await userService.getUserByEmail(email);
    if (!user) {
        throw new Error('Credenciales inválidas'); // Error genérico
    }
    // 2. Comparar la contraseña
    const isMatch = await bcryptjs_1.default.compare(pass, user.password);
    if (!isMatch) {
        throw new Error('Credenciales inválidas'); // Error genérico
    }
    // 3. Crear el payload del token
    const payload = {
        id: user.id_usuario,
        email: user.email,
        // puedes agregar roles u otra info
    };
    // 4. Firmar y devolver el token
    // ¡Guarda tu 'SECRET_KEY' en variables de entorno!
    const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET || 'TU_SECRET_KEY_PROVISORIA', {
        expiresIn: '1h', // El token expira en 1 hora
    });
    return token;
};
exports.login = login;
