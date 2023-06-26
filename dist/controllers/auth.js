"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userExist = yield user_1.default.findOne({
            where: {
                email: req.body.email
            }
        });
        if (!userExist) {
            return res.status(400).send({
                status: 'failed',
                message: 'user not found'
            });
        }
        const isValid = yield bcrypt_1.default.compare(req.body.password, userExist.password);
        if (!isValid) {
            return res.status(400).send({
                status: 'failed',
                message: 'credential is invalid'
            });
        }
        const token = jsonwebtoken_1.default.sign({
            id: userExist.id
        }, process.env.TOKEN_KEY);
        res.send({
            status: 'success',
            data: {
                user: {
                    name: userExist.name,
                    email: userExist.email,
                },
                token
            }
        });
    }
    catch (error) {
        res.status(500).send({
            status: 'failed',
            message: 'Server Error'
        });
    }
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashPassword = yield bcrypt_1.default.hash(req.body.password, salt);
        const userInserted = yield user_1.default.create(Object.assign(Object.assign({}, req.body), { password: hashPassword }));
        const token = jsonwebtoken_1.default.sign({
            id: userInserted.id
        }, process.env.TOKEN_KEY);
        res.send({
            status: 'success',
            data: {
                user: {
                    name: userInserted.name,
                    email: userInserted.email,
                },
                token
            }
        });
    }
    catch (error) {
        res.status(500).send({
            status: 'failed',
            message: 'Server Error'
        });
    }
});
exports.register = register;
