"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const auth_1 = require("../middleware/auth");
const auth_2 = require("../controllers/auth");
const profile_1 = require("../controllers/profile");
const link_1 = require("../controllers/link");
router.post('/login', auth_2.login);
router.post('/register', auth_2.register);
router.get('/profile', auth_1.auth, profile_1.getProfile);
router.put('/profile', auth_1.auth, profile_1.updateProfile);
router.delete('/profile', auth_1.auth, profile_1.deleteProfile);
router.post('/link', auth_1.auth, link_1.addLink);
router.get('/link/:id', link_1.getLink);
router.get('/link-uniqid/:uniqid', link_1.getLinkByUniqid);
router.get('/link', auth_1.auth, link_1.getLinks);
router.put('/link/:id', auth_1.auth, link_1.updateLink);
router.delete('/link/:id', auth_1.auth, link_1.deleteLink);
router.get('/link/:id/count', link_1.countLink);
exports.default = router;