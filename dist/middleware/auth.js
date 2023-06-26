"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(201).send({
            message: 'Access is denied'
        });
    }
    try {
        const tokenKey = process.env.TOKEN_KEY;
        const verified = jsonwebtoken_1.default.verify(token, tokenKey);
        req.userId = verified.id;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).send({
            message: "Invalid token"
        });
    }
};
exports.auth = auth;
