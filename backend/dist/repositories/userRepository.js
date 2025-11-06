"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
const db_1 = require("../config/db");
const User_1 = require("../entities/User");
exports.userRepository = db_1.AppDataSource.getRepository(User_1.User);
