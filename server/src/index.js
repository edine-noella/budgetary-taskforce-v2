import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import db from '../models/index.js';  
import allRoutes from './routes/router';

dotenv.config();  

const { PORT } = process.env; 

const app = express();


app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());

// Routes
app.use('/api/v1', allRoutes);


const server = app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});


const dbCon = async () => {
  try {
    await db.sequelize.authenticate();  
    console.log(`Database connected successfully`); 
  } catch (error) {
    console.log('Database connection failed:', error);  
  }
};


Promise.all([server, dbCon()]).catch((error) => {
  console.log(`Server error: ${error.message}`);
});

export default app; 
