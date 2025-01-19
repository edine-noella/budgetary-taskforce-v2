import dotenv from 'dotenv';
import { Op } from 'sequelize';
import db from '../../models/index'

dotenv.config();

const { Expenses, Income } = db;

class ExpensesClass{
   
    //function to create expenses
    static async createExpenses(req, res) {
        const { amount , ExpensesCategoriesId, ExpensesSubCategoriesId} = req.body;
        try {
            const newExpenses = await Expenses.create({
                amount,
                ExpensesCategoriesId,
                ExpensesSubCategoriesId
            });
            return res.status(201).json({
                status: 201,
                message: 'Expenses created successfully',
                data: newExpenses
            });
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: 'Internal server error',
                error: error.message
            });
        }
    }

    //function to get all expenses include the categories description attribute and sub categories description attribute
    static async getAllExpenses(req, res) {
        try {
            const allExpenses = await Expenses.findAll({
                include: [
                    {
                        model: db.ExpensesCategories,
                        as: 'ExpensesCategories',
                        attributes: ['categoryName','description']
                    },
                    {
                        model: db.ExpensesSubCategories,
                        as: 'ExpensesSubCategories',
                        attributes: ['subCategoryName','description']
                    }
                ]
            });
            return res.status(200).json({
                status: 200,
                message: 'All expenses',
                data: allExpenses
            });
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: 'Internal server error',
                error: error.message
            });
        }
    }

    
    static async getBalance(req, res) {
        try {
            const allIncome = await Income.findAll();
            const allExpenses = await Expenses.findAll();
            let totalIncome = 0;
            let totalExpenses = 0;
            allIncome.forEach(income => {
                totalIncome += income.amount;
            });
            allExpenses.forEach(expense => {
                totalExpenses += expense.amount;
            });
            const balance = totalIncome - totalExpenses;
            return res.status(200).json({
                status: 200,
                message: 'Balance',
                data: balance
            });
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: 'Internal server error',
                error: error.message
            });
        }
    }
   
  //function to delete all expenses
    static async deleteAllExpenses(req, res) {
        try {
            await Expenses.destroy({ where: {} });
            return res.status(200).json({
                status: 200,
                message: 'All expenses deleted successfully'
            });
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: 'Internal server error',
                error: error.message
            });
        }}

    
  
}

export default ExpensesClass;