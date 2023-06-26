"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const pg_1 = __importDefault(require("pg"));
const sequelize = new sequelize_1.Sequelize(process.env.DB_URL, {
    dialectModule: pg_1.default
});
exports.default = sequelize;
