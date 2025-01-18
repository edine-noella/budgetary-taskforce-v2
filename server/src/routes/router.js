import express from 'express';
import IncomeRoutes from './incomeRoutes';
import ExpensesCategoriesRoutes from './expensesCategoriesRoutes';
import ExpensesSubCategoriesRoutes from './expensesSubCategoryRoutes';
import ExpensesRoutes from './expensesRoutes';

const router = express.Router();

router.use('/income', IncomeRoutes);
router.use('/expensesCategories', ExpensesCategoriesRoutes);
router.use('/expensesSubCategories', ExpensesSubCategoriesRoutes);
router.use('/expenses', ExpensesRoutes);

export default router;