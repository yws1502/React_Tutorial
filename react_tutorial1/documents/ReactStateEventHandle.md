# React State, Event Handle

## State, 이벤트 다루기

```jsx
import { useState } from "react";

function Test() {
  const [title, setTitle] = useState("");

  const clickHandler = () => {
    setTitle("Updated!");
  }

  return (
    <div>
      <h1>{title}</h1>
      <button onClick={clickHandler}>change title</button>
    </div>
  )
}

export default Test;
```

특정 인스턴스의 버튼을 클릭하면 전체가 아닌 이벤트가 발생한 친구만 다시 evaluate 한다.
> - 해당 컴포넌트의 함수가 다시 실행이된다.
다른 인스턴스들은 영향을 받지 않는다.

상수를 사용하는 이유 -> react에서는 할당하는 방법으로 값을 할당하지 않기 때문에

정리
- 리액트에서 상태를 쓰는 것은 간단하다.
1. useState로 상태를 등록하고(처음에는 초기값 설정)
  - 이후에는 react가 초기값을 기억하여 최신의 값(새로 갱신되는 값)을 기억한다.
2. 반환값으로 값과 업데이트 함수를 받게 되고
3. 값을 변경하고 싶을 때는 변경하고자하는 값을 업데이트 함수에 넣어 값을 업데이트해준다.


### 입력폼 다루기

입력값의 모든 변화를 읽어야된다.

input에 대한 이벤트 리스너로 `onInput` 혹은 `onChange`을 사용할 수 있다.

둘다 기능은 비슷하지만 `onChange`의 장점은 모든 입력 타입과 같은 이벤트를 사용할 수 있다

**Note `onChange`와 `onInput` 비교
React의 `onChage`는 모든 변경에 대해 발생하므로 DOM의 change 이벤트가 매번 발생하지 않고 포커스를 잃었을 때만 발생하는 것과는 차이가 있다.

앞서 언급한 것처럼 React의 경우 `onChange` 이벤트가 포커스를 잃을 때뿐만 아니라 키 입력 시마다 발생한다. 반면에 React의 `onInput` 이벤트는 DOM의 `onInput` 이벤트를 감싼 것으로, 변경할 때마다 발생한다.

[출처](https://thebook.io/006961/part01/ch07/01/01-01/)


### 여러개 state 다루기

```jsx
function ExpenseForm() {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState(0);
  const [enteredDate, setEnteredDate] = useState(0);

  const titleChangeHandler = (e) => {
    setEnteredTitle(e.target.value);
  };

  const amountChangeHandler = (e) => {
    setEnteredAmount(e.target.value);
  };

  const dateChangeHandler = (e) => {
    setEnteredDate(e.target.value);
  };

  return (
    <form>
      <div className="new-expense__control">
        <label>Title</label>
        <input type="text" onChange={titleChangeHandler}/>
      </div>
      <div className="new-expense__control">
        <label>Amount</label>
        <input type="number" min="0.01" step="0.01" onChange={amountChangeHandler}/>
      </div>
      <div className="new-expense__control">
        <label>Date</label>
        <input type="date" min="2020-01-01" max="2023-12-31" onChange={dateChangeHandler}/>
      </div>
    </form>
  );
}
```

위와 같이 필요한 state를 전부 선언하는 방법이 있다
또한 아래의 코드와 같이 자바스크립트의 객체를 이용해 하나의 state만으로 관리할 수 있다.

**위에서 제공한 방식과 아래에서 제공한 방식은 취향차이고 상황에 맞춰서 사용하면 된다.**

```jsx
function ExpenseForm() {
  const [userInput, setUserInput] = useState({
    enteredTitle: "",
    enteredAmount: "",
    enteredDate: "",
  });

  const titleChangeHandler = (e) => {
    setUserInput({
      ...userInput,
      enteredTitle: event.target.value
    });
  };

  const amountChangeHandler = (e) => {
    setUserInput({
      ...userInput,
      enteredAmount: event.target.value
    });
  };

  const dateChangeHandler = (e) => {
    setUserInput({
      ...userInput,
      enteredDate: event.target.value
    });
  };

  return (
    <form>
      <div className="new-expense__control">
        <label>Title</label>
        <input type="text" onChange={titleChangeHandler}/>
      </div>
      <div className="new-expense__control">
        <label>Amount</label>
        <input type="number" min="0.01" step="0.01" onChange={amountChangeHandler}/>
      </div>
      <div className="new-expense__control">
        <label>Date</label>
        <input type="date" min="2020-01-01" max="2023-12-31" onChange={dateChangeHandler}/>
      </div>
    </form>
  );
}
```

**BUT**
해당하는 key의 값만 변경하려고 하면 새로운 객체만 재정의되어 기존 값들이 없어지게 된다. 따라서 기존에 값을 스프레이트 기법으로 넣어주고 다음 줄에 업데이트하는 방식으로 상태를 업데이트한다.

```jsx
// XXXXX
const titleChangeHandler = (e) => {
  setUserInput({
    enteredTitle: event.target.value
  });
};

// OOOOO
const titleChangeHandler = (e) => {
  setUserInput({
    ...userInput,
    enteredTitle: event.target.value
  });
};
```

**BUT 2**
하지만 React에서는 PrevValue를 인수로 넣어준다. -> 이것을 사용하자
> React가 상태 업데이트를 하는 것은 즉시 일어나지 않을 수도 있다.
> 따라서 동시에 많은 상태 업데이트한다면 위와 같이 state를 복사해서 사용하게 되면 오래되거나 잘못된 상태의 snapshot을 사용할 수도 있게 된다.

이런 경우 업데이트 함수의 첫번째 인자인 이전 State를 이용하자

```jsx
const titleChangeHandler = (e) => {
  setUserInput((prevState) => {
    return { ...prevState, enteredTitle: e.target.value };
  });
};
```


## bottom up data pass??
자식 컴포넌트에서 생성된 데이터를 부모 컴포넌트에서 사용하고 싶은 경우
React의 Props는 기본적으로는 Top down방식으로 실행되므로 자식의 데이터를 부모로 보낼 수 없다.

하지만 부모 컴포넌트에서 **데이터를 저장하는 함수**를 정의하고 데이터 저장 함수를 props로 내려준 후 자식 요소에서 이 함수를 실행하여 값을 저장하면 부모 컴포넌트에서도 자식의 데이터를 사용할 수 있다.

```jsx
// NewExpense.jsx
import React from "react";
import ExpenseForm from "./ExpenseForm";
import "./NewExpense.css";

function NewExpense() {
  const saveExpenseDataHandler = (enteredExpenseData) => {
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random().toString(),
    };
    console.log(expenseData);
  };

  return (
    <div className="new-expense">
      <ExpenseForm onSaveExpenseData={saveExpenseDataHandler} />
    </div>
  );
}

export default NewExpense;

// ExpenseForm.jsx
function ExpenseForm(props) {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDate, setEnteredDate] = useState("");

  const titleChangeHandler = (e) => {
    setEnteredTitle(e.target.value);
  };

  const amountChangeHandler = (e) => {
    setEnteredAmount(e.target.value);
  };

  const dateChangeHandler = (e) => {
    setEnteredDate(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const expenseData = {
      title: enteredTitle,
      amount: enteredAmount,
      date: new Date(enteredDate),
    };

    props.onSaveExpenseData(expenseData);
    setEnteredTitle("");
    setEnteredAmount("");
    setEnteredDate("");
  };
  return (
    <form>
      {...some code}
    </form>
  )
}

```


### Lifting State Up
형제 컴포넌트 사이끼리는 직접적인 연결이 되지 않아 데이터를 주고 받을 수 없다.

이러한 경우 가장 가까운 컴포넌트를 사용해야된다.(직, 간접적으로 연결된 가장 가까운 부모 컴포넌트)
