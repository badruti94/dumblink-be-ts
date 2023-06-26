import { Dialect, Sequelize } from 'sequelize'
import pg from 'pg'

const sequelize = new Sequelize(process.env.DB_URL as string, {
    dialectModule: pg
})

export default sequelize