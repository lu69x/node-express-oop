import { Sequelize } from 'sequelize';
import { DATABASE_URL } from '../config';

// ModelStatic provides a control logic for the model
// IModel provides an interface to model's instance

interface IDatabase {
    sequelize: Sequelize
}

console.log('DATABASE : ' + DATABASE_URL);

const sequelize = new Sequelize(DATABASE_URL!, {
    dialect: 'postgres',
    pool: {
        max: 9,
        min: 0,
        idle: 10000,
    },
});

// Models

// Associations

const db: IDatabase = { sequelize };

db.sequelize
    .sync()
    .then(() => console.log('Database & tables synced'))
    .catch((e) => console.log(e));

export default db;