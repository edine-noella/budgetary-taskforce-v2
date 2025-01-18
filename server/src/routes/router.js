import express from 'express';

import IncomeRoutes from './incomeRoutes';

const router = express.Router();

router.use('/income', IncomeRoutes);

export default router;