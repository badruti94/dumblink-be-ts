import dotenv from 'dotenv'
dotenv.config()
import express, {Request, Response} from 'express'
import router from './routers'
import cors from 'cors'
import fileUpload from 'express-fileupload'

const app: express.Application = express()
const port: number = parseInt(process.env.PORT as string) || 3000

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())
app.use(fileUpload())
app.use('/uploads', express.static('uploads'))

app.use('/api/v1/', router)

app.listen(8080, () => console.log('listent'))
