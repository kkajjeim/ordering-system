import express from 'express';
import userRouter from './user';
import orderRouter from './order';

const router = express.Router();
router.use('/', userRouter);
router.use('/', orderRouter);

export default router;
