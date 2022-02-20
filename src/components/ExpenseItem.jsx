import "./ExpenseItem.css";

function ExpenseItem({ title, amount, date }) {
  const Year = date.getFullYear();
  const Month = date.toLocaleString("en-US", { month: "long" });
  const Day = date.toLocaleString("en-US", { day: "2-digit" });

  return (
    <div className="expense-item">
      <div>
        <div>{Month}</div>
        <div>{Year}</div>
        <div>{Day}</div>
      </div>
      <div className="expense-item__description">
        <h2>{title}</h2>
        <div className="expense-item__price">${amount}</div>
      </div>
    </div>
  );
}

export default ExpenseItem;
