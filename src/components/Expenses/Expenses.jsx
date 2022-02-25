import { useState } from "react";
import "./Expenses.css";
import ExpensesFilter from "./ExpensesFilter";
import ExpenseItem from "./ExpenseItem";
import Card from "../UI/Card";

function Expenses({ items }) {
  const [filterYear, setFilterYear] = useState("2022");

  const filterChangeHandler = (selectedYear) => {
    setFilterYear(selectedYear);
  };

  const filteredItems = items.filter(
    (item) => item.date.getFullYear() === +filterYear
  );

  const ExpensesContent =
    filteredItems.length === 0 ? (
      <p>No expenses found</p>
    ) : (
      filteredItems.map((item) => (
        <ExpenseItem
          key={item.id}
          title={item.title}
          amount={item.amount}
          date={item.date}
        />
      ))
    );

  return (
    <Card className="expenses">
      <ExpensesFilter
        selected={filterYear}
        onChangeFilter={filterChangeHandler}
      />
      {ExpensesContent}
    </Card>
  );
}

export default Expenses;
