import express, { Request, Response } from 'express'
import uniqid from 'uniqid'
import cloudinary from 'cloudinary'
import DatauriParser from 'datauri/parser'
import path from 'path'

import Link from '../models/link'
import sequelize from '../models'

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})
const parser = new DatauriParser()

export interface AuthRequest extends Request {
    userId?: number
}

interface UploadFileResponse {
    status?: string
    message: string
}

const uploadFile = async (req: Request, res: Response): Promise<Response<UploadFileResponse> | string> => {
    try {
        if (!req.files) {
            return res.status(401).json({
                message: "\"image\" is required",
            })
        }

        const uploadedFile = req.files.photo
        if (Array.isArray(uploadedFile)) {
            // Handle case when multiple files are uploaded
            return res.status(400).send({
                message: 'Multiple files uploaded'
            });
        }
        const fileName = uploadedFile.name
        const fileData = uploadedFile.data

        const file = parser.format(path.extname(fileName).toString(), fileData).content as string
        const result = await cloudinary.v2.uploader.upload(file, {
            folder: 'uploads',
            use_filename: true,
            unique_filename: false
        })

        return result.secure_url

    } catch (error) {
        return res.status(500).send({
            // status: 'failed',
            message: 'Server Error'
        })
    }
}

const addLink = async (req: AuthRequest, res: Response) => {
    try {
        const urlFile = await uploadFile(req, res)
        await Link.create({
            ...req.body,
            userId: req.userId,
            uniqid: uniqid.time(),
            photo: urlFile
        })
        res.send({
            message: 'Link created successfully'
        })
    } catch (error) {
        res.status(500).send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

const updateLink = async (req: Request, res: Response) => {
    try {
        if (req.file) {
            const urlFile = await uploadFile(req, res)
            req.body.photo = urlFile
        }
        await Link.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        res.send({
            message: 'Link updated successfully'
        })
    } catch (error) {
        res.status(500).send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

const getLink = async (req: Request, res: Response) => {
    try {
        const query = `select l.*, u."name" , u.email 
        from links l 
        join users u on l."userId" = u.id 
        where l.id = ${req.params.id};`

        const [[data]] = await sequelize.query(query);
        const dataResponse = {
            ...(data as Record<string, unknown> || {}),
            user: {
                name: (data && (data as Record<string, unknown>).name) || null,
                email: (data && (data as Record<string, unknown>).email) || null,
            },
        };
        res.send({
            data: {
                link: dataResponse
            }
        })
    } catch (error) {
        res.status(500).send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

const getLinkByUniqid = async (req: Request, res: Response) => {
    try {
        const query = `select l.*, u."name" , u.email 
        from links l 
        join users u on l."userId" = u.id 
        where l.uniqid = '${req.params.uniqid}';`

        const [[data]] = await sequelize.query(query);
        
        const dataResponse = {
            ...(data as Record<string, unknown> || {}),
            user: {
                name: (data && (data as Record<string, unknown>).name) || null,
                email: (data && (data as Record<string, unknown>).email) || null,
            },
        };
        res.send({
            data: {
                link: dataResponse
            }
        })
    } catch (error) {
        res.status(500).send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

const getLinks = async (req: AuthRequest, res: Response) => {
    try {
        const links = await Link.findAll({
            where: {
                userId: req.userId
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })
        res.send({
            data: {
                links
            }
        })
    } catch (error) {
        res.status(500).send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

const deleteLink = async (req: AuthRequest, res: Response) => {
    try {
        await Link.destroy({
            where: {
                id: req.params.id
            }
        })
        res.send({
            message: 'Link deleted successfully'
        })
    } catch (error) {
        res.status(500).send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

const countLink = async (req: AuthRequest, res: Response) => {
    try {
        await Link.increment({
            view: 1
        }, {
            where: {
                id: req.params.id
            }
        })

        res.send({
            message: 'Add 1 view to link'
        })
    } catch (error) {
        res.status(500).send({
            message: 'Server Error'
        })
    }
}

export {
    addLink,
    updateLink,
    getLink,
    getLinkByUniqid,
    getLinks,
    deleteLink,
    countLink,
}