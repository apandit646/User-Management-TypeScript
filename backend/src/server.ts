import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();

const port: number = Number(process.env.PORT) || 3000;
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import DB and models
import sequelize from './db/config';
import './models/UserModel';
import './models/ProjectMedel';
import './models/ProjectTeamModel';
import { associateModels } from './models/associateModels'; // Or use individual init functions
associateModels();

// Routes
import userRoutes from './routers/User';
import projectRoutes from './routers/Project';
import employeeRoutes from './routers/Employee';

app.use('/api/users', userRoutes);
app.use('/api/project', projectRoutes);
app.use('/api/employee', employeeRoutes);

// Sync DB and start server
sequelize.sync().then(() => {
  console.log('✅ Database synced');
  app.listen(port, () => {
    console.log(`🚀 Server is running at http://localhost:${port}`);
  });
}).catch((err) => {
  console.error('❌ Failed to sync DB:', err);
});
