import React, { useState } from "react";
import ExpenseForm from "./ExpenseForm";
import "./NewExpense.css";

function NewExpense(props) {
  const [isEditing, setIsEditing] = useState(false);

  const saveExpenseDataHandler = (enteredExpenseData) => {
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random().toString(),
    };
    props.onAddExpense(expenseData);
    setIsEditing(false);
  };

  const EditingHandler = () => {
    setIsEditing((prevShowState) => {
      return prevShowState ? false : true;
    });
  };

  return (
    <div className="new-expense">
      {!isEditing ? (
        <button type="button" onClick={EditingHandler}>
          Add New Expense
        </button>
      ) : (
        <ExpenseForm
          onSaveExpenseData={saveExpenseDataHandler}
          onCancel={EditingHandler}
        />
      )}
    </div>
  );
}

export default NewExpense;
