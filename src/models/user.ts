import {
    DataTypes, Model, InferAttributes,
    InferCreationAttributes, CreationOptional,
    NonAttribute, Association
} from 'sequelize'
import sequelize from './index'
import Link from './link'

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>>{
    declare id: CreationOptional<number>;
    declare email: string;
    declare name: string;
    declare password: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

    declare links?: NonAttribute<Link[]>;

    declare static associations: {
        projects: Association<User, Link>;
    };
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: new DataTypes.STRING(255),
            allowNull: false,
        },
        password: {
            type: new DataTypes.STRING(255),
            allowNull: false,
        },
        name: {
            type: new DataTypes.STRING(255),
            allowNull: true,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        tableName: 'users',
        sequelize
    }
)

export default User