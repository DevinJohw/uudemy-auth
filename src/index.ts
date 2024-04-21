import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import router from './router';
import mongoose from 'mongoose';
import 'dotenv/config';

const app = express();
const PORT = 3000;

app.use(
  cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true,
  })
);
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`🥷 Listening on ${PORT}!`);
});

app.use('/api', router);

try {
  await mongoose.connect(process.env.MONGODB_URL as string);
  console.log('🚀 Connected to database successfully.');
} catch (error) {
  throw error;
}
