import Expenses from "./components/Expenses";

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

  return (
    <div>
      <h2>Let's get started!</h2>
      <Expenses items={expenses}/>
    </div>
  );
}

export default App;
