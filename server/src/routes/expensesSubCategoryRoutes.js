import express from 'express';
import ExpensesSubCategoriesClass from '../controllers/expenseSubCategories';

const router = express.Router();

router.post('/', ExpensesSubCategoriesClass.createExpenseSubCategory);
router.get('/', ExpensesSubCategoriesClass.getAllExpenseSubCategories);
router.delete('/', ExpensesSubCategoriesClass.deleteAllExpenseSubCategories);

export default router;