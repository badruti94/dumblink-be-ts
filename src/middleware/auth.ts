import express, { Request, Response, NextFunction } from 'express'
import jsonwebtoken from 'jsonwebtoken'

export interface AuthRequest extends Request {
    userId?: number
}

const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader: string = req.header('Authorization') as string
    const token: string = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return res.status(201).send({
            message: 'Access is denied'
        })
    }

    try {
        const tokenKey: string = process.env.TOKEN_KEY as string
        const verified: jsonwebtoken.JwtPayload = jsonwebtoken.verify(token, tokenKey) as jsonwebtoken.JwtPayload
        req.userId = verified.id
        next()
    } catch (error) {
        console.log(error);
        res.status(401).send({
            message: "Invalid token"
        })
    }
}

export { auth }