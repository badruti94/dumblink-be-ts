import express, { Request, Response } from 'express'
import User from '../models/user'

export interface AuthRequest extends Request {
    userId?: number
}

const getProfile = async (req: AuthRequest, res: Response) => {
    try {
        const profile = await User.findOne({
            where: {
                id: req.userId
            },
            attributes: ['email', 'name']
        })
        res.send({
            data: {
                profile
            }
        })
    } catch (error) {
        res.status(500).send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

const updateProfile = async (req: AuthRequest, res: Response) => {
    try {
        await User.update(req.body, {
            where: {
                id: req.userId
            }
        })

        res.send({
            message: 'Profile updated successfully'
        })
    } catch (error) {
        res.status(500).send({
            message: 'Server Error'
        })
    }
}

const deleteProfile = async (req: AuthRequest, res: Response) => {
    try {
        await User.destroy({
            where: {
                id: req.userId
            }
        })
        res.send({
            message: 'Profile deleted successfully'
        })
    } catch (error) {
        res.status(500).send({
            message: 'Server Error'
        })
    }
}

export {
    getProfile,
    updateProfile,
    deleteProfile,
}