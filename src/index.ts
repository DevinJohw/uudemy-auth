import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import router from './router';

const app = express();
const PORT = 3000;

app.use(
  cors({
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
