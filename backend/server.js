import express from 'express';
import connectToDB from "./db.js";
import bodyParser from "body-parser";
import cors from 'cors';
import { config } from 'dotenv';
import blog from './routes/blog.js';
import user from './routes/user.js';

config();

const app = express();
const port = process.env.PORT || 8082;

connectToDB();

app.use(cors());    
app.use(bodyParser.json());
app.use(express.json());

app.use('/blog', blog);
app.use('/users', user);
app.use('/uploads', express.static('uploads'));

app.listen(port, () => console.log(`Server running on port ${port}`));
