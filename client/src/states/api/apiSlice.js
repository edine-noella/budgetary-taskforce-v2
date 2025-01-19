import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://budgetary-taskforce-v2.onrender.com/api/v1' }),
    endpoints: (builder) => ({
        getAllExpenses: builder.query({
            query: () => `/expenses`,
        }),
        getAllExpensesCategories: builder.query({
            query: () => `/expensesCategories`,
        }),
        getAllExpensesSubCategories: builder.query({
            query: () => `/expensesSubCategories`,
        }),
        getAllIncome: builder.query({
            query: () => `/income`,
        }),
        getBalance: builder.query({
            query: () => `expenses/balance`,
        }),
        createExpenses: builder.mutation({
            query: ({amount, ExpensesCategoriesId, ExpensesSubCategoriesId}) => ({
                url: `/expenses`,
                method: 'POST',
                body:{
                    amount,
                    ExpensesCategoriesId,
                    ExpensesSubCategoriesId
                }
            }),
        }),
        createExpensesCategories: builder.mutation({
            query: ({categoryName, description}) => ({
                url: `/expensesCategories`,
                method: 'POST',
                body: {
                    categoryName,
                    description
                }
            }),
        }),
        createIncome: builder.mutation({
            query: ({amount , incomeName}) => ({
                url: `/income`,
                method: 'POST',
                body: {
                    amount,
                    incomeName
                }
            }),
        }),
        createSubCategories: builder.mutation({
            query: ({subCategoryName, description, ExpensesCategoriesId}) => ({
                url: `/expensesSubCategories`,
                method: 'POST',
                body: {
                    subCategoryName,
                    description,
                    ExpensesCategoriesId

                }
            }),
        }),
        
    }),
})


export const { 
    useLazyGetAllExpensesQuery,
    useLazyGetAllExpensesCategoriesQuery, 
    useLazyGetAllExpensesSubCategoriesQuery,
    useLazyGetAllIncomeQuery,
    useLazyGetBalanceQuery,
    useCreateExpensesMutation,
    useCreateExpensesCategoriesMutation,
    useCreateSubCategoriesMutation,
    useCreateIncomeMutation 
} = apiSlice;

