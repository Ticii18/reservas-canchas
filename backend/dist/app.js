"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
require("reflect-metadata");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use("/api/auth", authRoutes_1.default);
app.use("/api/users", userRoutes_1.default);
const PORT = process.env.PORT;
async function main() {
    try {
        await db_1.AppDataSource.initialize();
        console.log("Database conectada exitosamente 👍");
        app.listen(PORT, () => {
            console.log(`Server está corriendo en http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error("Error al inicializar la base de datos:", error);
    }
}
main();
