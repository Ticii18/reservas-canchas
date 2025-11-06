import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { AppDataSource } from "./config/db";
import "reflect-metadata";
import userRouter from "./routes/userRoutes";
import authRouter from "./routes/authRoutes";
import reservaRouter from "./routes/reservaRoutes";

dotenv.config();
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());


app.use("/api/auth", authRouter)
app.use("/api/users", userRouter)
app.use("/api/reservas",reservaRouter)

const PORT = process.env.PORT;

async function main() {
  try {
    await AppDataSource.initialize();
    console.log("Database conectada exitosamente 👍");

    app.listen(PORT, () => {
      console.log(`Server está corriendo en http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("Error al inicializar la base de datos:", error);
  }
}

main();