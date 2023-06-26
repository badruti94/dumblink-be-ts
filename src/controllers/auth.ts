import express, { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/user'

export interface AuthRequest extends Request {
    userId?: number
}

const login = async (req: Request, res: Response) => {
    try {
        const userExist = await User.findOne({
            where: {
                email: req.body.email
            }
        })

        if (!userExist) {
            return res.status(400).send({
                status: 'failed',
                message: 'user not found'
            })
        }

        const isValid = await bcrypt.compare(req.body.password, userExist.password)
        if (!isValid) {
            return res.status(400).send({
                status: 'failed',
                message: 'credential is invalid'
            })
        }

        const token = jwt.sign({
            id: userExist.id
        }, process.env.TOKEN_KEY as string)

        res.send({
            status: 'success',
            data: {
                user: {
                    name: userExist.name,
                    email: userExist.email,
                },
                token
            }
        })
    } catch (error) {
        res.status(500).send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

const register = async (req: Request, res: Response) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(req.body.password, salt)
        const userInserted = await User.create({
            ...req.body,
            password: hashPassword
        })

        const token: string = jwt.sign({
            id: userInserted.id
        }, process.env.TOKEN_KEY as string)

        res.send({
            status: 'success',
            data: {
                user: {
                    name: userInserted.name,
                    email: userInserted.email,
                },
                token
            }
        })
    } catch (error) {
        res.status(500).send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

export { login, register }