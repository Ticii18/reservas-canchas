import express from "express";
import { CanchaController } from "../controllers/canchaController";

const canchaRouter = express.Router();

canchaRouter.get("/",CanchaController.getAllCancha)
canchaRouter.post("/",CanchaController.createCancha)
canchaRouter.delete("/:id",CanchaController.deleteCancha)

export default canchaRouter;