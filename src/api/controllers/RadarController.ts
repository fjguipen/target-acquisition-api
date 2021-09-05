import { RequestHandler } from 'express';
import { TargetAcquisition } from '../../services/target-acquisition';
import { RadarInfoPayload } from '../../types';

const RadarController: RequestHandler = (req, res) => {
  try {
    const data: RadarInfoPayload = req.body;
    const result = new TargetAcquisition(data).aplyRules();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export default RadarController;
