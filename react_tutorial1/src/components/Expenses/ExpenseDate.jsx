import "./ExpenseDate.css";

function ExpenseDate({ date }) {
  const Month = date.toLocaleString("en-US", { month: "long" });
  const Year = date.getFullYear();
  const Day = date.toLocaleString("en-US", { day: "2-digit" });

  return (
    <div className="expense-date">
      <div className="expense-date__month">{Month}</div>
      <div className="expense-date__year">{Year}</div>
      <div className="expense-date__day">{Day}</div>
    </div>
  );
}

export default ExpenseDate;
