// db.js (Sequelize setup for MySQL)
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('projectmanagement', 'root', 'root', {
    host: 'localhost' ,
    dialect: 'mysql',
    port: 3306,
});

sequelize
    .authenticate()
    .then(() => {
        console.log('✅ Connected to MySQL via Sequelize');
    })
    .catch((err: Error) => {
        console.error('❌ Unable to connect:', err);
    });

export default sequelize;
