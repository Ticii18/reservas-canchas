import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes";

dotenv.config();
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());


app.use("/api/users", userRouter)

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});