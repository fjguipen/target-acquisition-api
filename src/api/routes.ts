import express from 'express';
import RadarController from './controllers/RadarController';

const router = express.Router();

router.post('/radar', RadarController);

export default router;
