'use server'

import mongoose from 'mongoose';
import logger from './logger';
const dbConnect = async () => {
    try {
        if (mongoose.connection.readyState >= 1) {
            return;
        }
          logger.info(`DB connection trying ${process.env.MONGODB_USERNAME}, ${process.env.MONGODB_PASSWORD} `);
          const mongoURI=`mongodb+srv://somu:sg334s22@cluster0.mvf57zm.mongodb.net/ethicallearner?retryWrites=true&w=majority`
          mongoose.set("strictQuery", false);
          const dbConnection=await mongoose.connect(mongoURI);
          logger.info('DB connection successful');

          return dbConnection;

    }
    catch (error) {
        logger.error(`Db connection error , ${error}`,error);

    }

 
};

export default dbConnect;
