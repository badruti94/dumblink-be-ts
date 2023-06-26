"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("./index"));
class Link extends sequelize_1.Model {
}
Link.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    uniqid: sequelize_1.DataTypes.STRING,
    type: sequelize_1.DataTypes.STRING,
    title: sequelize_1.DataTypes.STRING,
    description: sequelize_1.DataTypes.TEXT,
    vlog: sequelize_1.DataTypes.STRING,
    galery: sequelize_1.DataTypes.STRING,
    contact: sequelize_1.DataTypes.STRING,
    about: sequelize_1.DataTypes.STRING,
    facebook: sequelize_1.DataTypes.STRING,
    instagram: sequelize_1.DataTypes.STRING,
    twitter: sequelize_1.DataTypes.STRING,
    youtube: sequelize_1.DataTypes.STRING,
    whatsapp: sequelize_1.DataTypes.STRING,
    phone: sequelize_1.DataTypes.STRING,
    web: sequelize_1.DataTypes.STRING,
    lazada: sequelize_1.DataTypes.STRING,
    photo: sequelize_1.DataTypes.STRING,
    view: sequelize_1.DataTypes.INTEGER,
    userId: sequelize_1.DataTypes.INTEGER,
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: sequelize_1.DataTypes.DATE,
}, {
    tableName: 'links',
    sequelize: index_1.default
});
exports.default = Link;
