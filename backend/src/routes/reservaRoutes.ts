import express from "express";
import { ReservaController } from "../controllers/reservaController";

const reservaRouter = express.Router();


reservaRouter.get("/",ReservaController.getAllReservas)
reservaRouter.post("/",ReservaController.createReserva)

export default reservaRouter;