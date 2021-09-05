require('dotenv').config();
import express from 'express';
import router from './api/routes';
import { API_PORT } from './constants';

const server = express();

server.use(express.json());
server.use(router);

server.listen(API_PORT, () => {
  console.log(`Server listening on http://localhost:${API_PORT}`);
});
