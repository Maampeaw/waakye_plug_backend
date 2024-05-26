import express from 'express';
import router from './app/routes/order_routes.js';
import {urlencoded, json} from 'express'
import cors from 'cors'
import { config } from 'dotenv';
// import { appConfig } from './config';

const app = express();
config();
app.use(
    json({ limit: '20mb' })
  );
  app.use(urlencoded({ extended: true, limit: '20mb' }));
  app.use(cors())
app.use('/', router)


app.listen(8080, ()=>{
    console.log(`app is listening on port 8080`)
})
export default app;