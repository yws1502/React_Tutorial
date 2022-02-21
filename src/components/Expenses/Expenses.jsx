import Card from "../UI/Card";
import "./Expenses.css";
import ExpenseItem from "./ExpenseItem";

function Expenses({ items }) {
  return (
    <Card className="expenses">
      {items.map((item, idx) => {
        return (
          <ExpenseItem
            key={idx}
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
