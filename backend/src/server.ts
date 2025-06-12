import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();

const port: number = Number(process.env.PORT) || 3000;
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

import userRoutes from './routers/User'; // Adjust the path as necessary

// Use user routes
app.use('/api/users', userRoutes);




// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
