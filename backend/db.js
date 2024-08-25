import mongoose from 'mongoose';
import { config } from 'dotenv';

config();

const connectToDB = async () => {
  mongoose.set('strictQuery', true);
  try {
    await mongoose.connect(process.env.MONGO_URI,{
            dbName:'blog_ZuPay',
        }).then(() =>{
            console.log("Connection is successful");
        })
        .catch((error) => {
            console.error('Connection to MongoDB failed:', error);
        });
    
} catch (err) {
    console.error('Database connection error:', err.message);
    process.exit(1);
  }
};

export default connectToDB;


