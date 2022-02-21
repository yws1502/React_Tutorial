import Expenses from "./components/Expenses/Expenses";
import NewExpense from "./components/NewExpense/NewExpense";

function App () {
  const expenses = [
    {
      id: "e1",
      title: "Car Insurance",
      amount: 294.67,
      date: new Date(2021, 2, 28),
    },
    {
      id: "e2",
      title: "Cook",
      amount: 280.67,
      date: new Date(2021, 1, 28),
    },
    {
      id: "e3",
      title: "new TV",
      amount: 23.67,
      date: new Date(2020, 3, 28),
    },
  ];

  const addExpenseHandler = (expense) => {
    console.log("in App.js")
    console.log(expense)
  }

  return (
    <div>
      <NewExpense onAddExpense={addExpenseHandler} />
      <Expenses items={expenses} />
    </div>
  );
}

export default App;
