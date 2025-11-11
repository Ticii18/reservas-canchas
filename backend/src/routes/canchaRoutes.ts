import express from "express";
import { CanchaController } from "../controllers/canchaController";
import multer from "multer";

const canchaRouter = express.Router();
const upload = multer({ dest: 'uploads/' })

canchaRouter.get("/",CanchaController.getAllCancha)
canchaRouter.post("/", upload.single("imagen"),CanchaController.createCancha)
canchaRouter.delete("/:id",CanchaController.deleteCancha)

export default canchaRouter;