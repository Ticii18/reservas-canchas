"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const userRouter = express_1.default.Router();
userRouter.get("/", userController_1.UserController.getAllUsers);
userRouter.get("/:id", userController_1.UserController.getUserById);
userRouter.post("/", userController_1.UserController.createUser);
exports.default = userRouter;
