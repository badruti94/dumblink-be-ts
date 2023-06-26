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
exports.deleteProfile = exports.updateProfile = exports.getProfile = void 0;
const user_1 = __importDefault(require("../models/user"));
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profile = yield user_1.default.findOne({
            where: {
                id: req.userId
            },
            attributes: ['email', 'name']
        });
        res.send({
            data: {
                profile
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
exports.getProfile = getProfile;
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user_1.default.update(req.body, {
            where: {
                id: req.userId
            }
        });
        res.send({
            message: 'Profile updated successfully'
        });
    }
    catch (error) {
        res.status(500).send({
            message: 'Server Error'
        });
    }
});
exports.updateProfile = updateProfile;
const deleteProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user_1.default.destroy({
            where: {
                id: req.userId
            }
        });
        res.send({
            message: 'Profile deleted successfully'
        });
    }
    catch (error) {
        res.status(500).send({
            message: 'Server Error'
        });
    }
});
exports.deleteProfile = deleteProfile;
