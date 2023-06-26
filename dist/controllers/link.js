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
exports.countLink = exports.deleteLink = exports.getLinks = exports.getLinkByUniqid = exports.getLink = exports.updateLink = exports.addLink = void 0;
const uniqid_1 = __importDefault(require("uniqid"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const parser_1 = __importDefault(require("datauri/parser"));
const path_1 = __importDefault(require("path"));
const link_1 = __importDefault(require("../models/link"));
const models_1 = __importDefault(require("../models"));
cloudinary_1.default.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
const parser = new parser_1.default();
const uploadFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.files) {
            return res.status(401).json({
                message: "\"image\" is required",
            });
        }
        const uploadedFile = req.files.photo;
        if (Array.isArray(uploadedFile)) {
            // Handle case when multiple files are uploaded
            return res.status(400).send({
                message: 'Multiple files uploaded'
            });
        }
        const fileName = uploadedFile.name;
        const fileData = uploadedFile.data;
        const file = parser.format(path_1.default.extname(fileName).toString(), fileData).content;
        const result = yield cloudinary_1.default.v2.uploader.upload(file, {
            folder: 'uploads',
            use_filename: true,
            unique_filename: false
        });
        return result.secure_url;
    }
    catch (error) {
        return res.status(500).send({
            // status: 'failed',
            message: 'Server Error'
        });
    }
});
const addLink = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const urlFile = yield uploadFile(req, res);
        yield link_1.default.create(Object.assign(Object.assign({}, req.body), { userId: req.userId, uniqid: uniqid_1.default.time(), photo: urlFile }));
        res.send({
            message: 'Link created successfully'
        });
    }
    catch (error) {
        res.status(500).send({
            status: 'failed',
            message: 'Server Error'
        });
    }
});
exports.addLink = addLink;
const updateLink = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.file) {
            const urlFile = yield uploadFile(req, res);
            req.body.photo = urlFile;
        }
        yield link_1.default.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.send({
            message: 'Link updated successfully'
        });
    }
    catch (error) {
        res.status(500).send({
            status: 'failed',
            message: 'Server Error'
        });
    }
});
exports.updateLink = updateLink;
const getLink = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = `select l.*, u."name" , u.email 
        from links l 
        join users u on l."userId" = u.id 
        where l.id = ${req.params.id};`;
        const [[data]] = yield models_1.default.query(query);
        const dataResponse = Object.assign(Object.assign({}, (data || {})), { user: {
                name: (data && data.name) || null,
                email: (data && data.email) || null,
            } });
        res.send({
            data: {
                link: dataResponse
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
exports.getLink = getLink;
const getLinkByUniqid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = `select l.*, u."name" , u.email 
        from links l 
        join users u on l."userId" = u.id 
        where l.uniqid = '${req.params.uniqid}';`;
        const [[data]] = yield models_1.default.query(query);
        const dataResponse = Object.assign(Object.assign({}, (data || {})), { user: {
                name: (data && data.name) || null,
                email: (data && data.email) || null,
            } });
        res.send({
            data: {
                link: dataResponse
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
exports.getLinkByUniqid = getLinkByUniqid;
const getLinks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const links = yield link_1.default.findAll({
            where: {
                userId: req.userId
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        });
        res.send({
            data: {
                links
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
exports.getLinks = getLinks;
const deleteLink = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield link_1.default.destroy({
            where: {
                id: req.params.id
            }
        });
        res.send({
            message: 'Link deleted successfully'
        });
    }
    catch (error) {
        res.status(500).send({
            status: 'failed',
            message: 'Server Error'
        });
    }
});
exports.deleteLink = deleteLink;
const countLink = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield link_1.default.increment({
            view: 1
        }, {
            where: {
                id: req.params.id
            }
        });
        res.send({
            message: 'Add 1 view to link'
        });
    }
    catch (error) {
        res.status(500).send({
            message: 'Server Error'
        });
    }
});
exports.countLink = countLink;
