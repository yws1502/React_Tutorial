import { useState } from "react";
import "./Expenses.css";
import ExpensesFilter from "./ExpensesFilter";
import ExpensesList from "./ExpensesList";
import Card from "../UI/Card";

function Expenses({ items }) {
  const [filterYear, setFilterYear] = useState("2022");

  const filterChangeHandler = (selectedYear) => {
    setFilterYear(selectedYear);
  };

  const filteredItems = items.filter(
    (item) => item.date.getFullYear() === +filterYear
  );

  return (
    <Card className="expenses">
      <ExpensesFilter
        selected={filterYear}
        onChangeFilter={filterChangeHandler}
      />
      <ExpensesList items={filteredItems} />
    </Card>
  );
}

export default Expenses;
