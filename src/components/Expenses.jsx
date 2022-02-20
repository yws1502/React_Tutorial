import Card from "./Card";
import "./Expenses.css";
import ExpenseItem from "./ExpenseItem";

function Expenses({ items }) {
  return (
    <Card className="expenses">
      {items.map((item) => {
        return (
          <ExpenseItem
            title={item.title}
            amount={item.amount}
            date={item.date}
          />
        );
      })}
    </Card>
  );
}

export default Expenses;
