import {
    DataTypes, Model, InferAttributes,
    InferCreationAttributes, CreationOptional, ForeignKey, NonAttribute
} from 'sequelize'
import sequelize from './index'
import User from './user'

class Link extends Model<InferAttributes<Link>, InferCreationAttributes<Link>>{
    declare id: CreationOptional<number>;
    declare uniqid: string;
    declare type: string;
    declare title: string;
    declare description: string;
    declare vlog: string;
    declare galery: string;
    declare contact: string;
    declare about: string;
    declare facebook: string;
    declare instagram: string;
    declare twitter: string;
    declare youtube: string;
    declare whatsapp: string;
    declare phone: string;
    declare web: string;
    declare lazada: string;
    declare photo: string;
    declare view: number;
    declare userId: ForeignKey<User['id']>
    // declare userId: number;
    declare user?: NonAttribute<User>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

Link.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    uniqid: DataTypes.STRING,
    type: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    vlog: DataTypes.STRING,
    galery: DataTypes.STRING,
    contact: DataTypes.STRING,
    about: DataTypes.STRING,
    facebook: DataTypes.STRING,
    instagram: DataTypes.STRING,
    twitter: DataTypes.STRING,
    youtube: DataTypes.STRING,
    whatsapp: DataTypes.STRING,
    phone: DataTypes.STRING,
    web: DataTypes.STRING,
    lazada: DataTypes.STRING,
    photo: DataTypes.STRING,
    view: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
}, {
    tableName: 'links',
    sequelize
})

export default Link