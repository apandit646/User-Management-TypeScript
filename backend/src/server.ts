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

import userRoutes from './routers/User';
import projectRoutes from './routers/Project';
import employeeRoutes from './routers/Employee';

// Use user routes
app.use('/api/users', userRoutes);
app.use('/api/project', projectRoutes);
app.use('/api/employee', employeeRoutes);


// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
