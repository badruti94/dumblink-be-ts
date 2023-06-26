import express from 'express'
const router: express.Router = express.Router()

import { auth } from '../middleware/auth'
import { login, register } from '../controllers/auth'
import { getProfile, updateProfile, deleteProfile } from '../controllers/profile'
import {
    addLink,
    getLink,
    getLinks,
    deleteLink,
    countLink,
    getLinkByUniqid,
    updateLink,
} from '../controllers/link'

router.post('/login', login)
router.post('/register', register)

router.get('/profile', auth, getProfile)
router.put('/profile', auth, updateProfile)
router.delete('/profile', auth, deleteProfile)

router.post('/link', auth, addLink)
router.get('/link/:id', getLink)
router.get('/link-uniqid/:uniqid', getLinkByUniqid)
router.get('/link', auth, getLinks)
router.put('/link/:id', auth, updateLink)
router.delete('/link/:id', auth, deleteLink)
router.get('/link/:id/count', countLink)

export default router