# Budgetary: Track Your Finances Effortlessly

Budgetary is a web application designed to help Eric manage his finances effectively. It allows you to track all your income and expenses regardless of where you received it , shows you a report of your spending during a date range you chose your self , disciplines you on your money spending with a spending limit and categorize your spending for better insights.

## Features

Budgetary offers a range of features to help you manage your finances with ease:

*   **Income and Expense Tracking:** Add and categorize your income and expenses to keep track of your financial transactions.
*   **Custom Date Range Reports:** shows you a report for your spending  during a specific date range.
*   **Spending Limits:** warns you when you have exceeded your spending limit.
*   **Category Management:** categorize your spending to get better insights into your financial habits.


## Technologies

Budgetary leverages a modern tech stack to deliver a robust and user-friendly experience:

*   **Backend:** Express.js - A powerful Node.js framework for building web applications and APIs.
*   **Frontend:** Vite + ReactJS - A blazing-fast frontend development setup using Vite and React for a smooth user interface.
*   **CSS Framework:** Tailwind CSS - A utility-first CSS framework for rapid and responsive UI development.
*   **Database:** PostgreSQL - A powerful and scalable open-source relational database for storing financial data.
*   **ORM:** Sequelize - An object-relational mapper (ORM) that simplifies interactions between Node.js and PostgreSQL.

## Deployment

Budgetary is currently deployed on Render, a cloud platform for hosting web applications. This ensures scalability, reliability, and easy accessibility. 

[Deployment Link](https://budgetary-ghz.onrender.com/)

## Local Development

To run Budgetary on your local machine, follow these steps:

**Prerequisites:**

*   Node.js and npm installed on your system.
*   A PostgreSQL database server running locally.

**Instructions:**

1.  Clone this repository:

    ```bash
    git clone https://github.com/edine-noella/budgetary-taskforce-v2.git
    ```

2.  Navigate to the project directory:

    ```bash
    cd budgetary-taskforce-v2
    ```

3. Install dependencies for the backend and frontend projects:

    ```bash
    cd server
    npm install 

    cd ../client
    npm install 
    ```

4.  Create a `.env` file in the `server` directory and add the following environment variables:
    DATABASE_URL=
    ```

5.  Start the backend server:

    ```bash
    cd client
    npm run dev
    
    ```

6.  Start the frontend development server:

    ```bash
    cd ../server
    npm run dev 
    ```

7.  Access Budgetary in your web browser at `http://localhost:5173` 

