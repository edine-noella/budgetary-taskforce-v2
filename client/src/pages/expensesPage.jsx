import ExpensesTable from "../components/ExpensesTable";
import CreateExpenseModel from "../components/models/createExpenseModel";


function Expenses() {
 
  return (
    <main>    
    <CreateExpenseModel />  
      <ExpensesTable />
    </main>
  );
}

export default Expenses;
