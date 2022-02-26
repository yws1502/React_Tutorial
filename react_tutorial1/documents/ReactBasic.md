# React Basic

## 리액트 사용이유
- 유저 인터페이스를 만드는 과정을 단순화해주기 때문
- 앱을 구성하는 중요한 비즈니스 로직에 집중할 수 있다.
  - 어떤 일이 발생했을 때, 업데이트하는 과정에 집중할 필요가 없다.
- 작업을 단순화하기 위해 리액트에 컴포넌트를 사용한다.

## Components and Props

작은 빌딩 블록을 모아 사용자 인터페이스를 만드는 것 -> 컴포지션이라 한다.

> 특수 props
> children -> 컴포넌트의 하위 컴포넌트들을 받아 적용한다.
> 
> className -> Component에 적용된 className을 받아온다.

### JSX
**개발자가 읽기 쉽고 이해하기 편한 문법, 결국은 뒤에서 js코드로 변환하는 작업을 거친다.**

```jsx
<div>
  <h2>Let's get started!</h2>
  <Expenses items={expenses} />
</div>
```

만약 jsx가 없다면( 위와 같은 코드 )
```js
React.createElement(
  "div",
  {},
  React.createElement("h2", {}, "Let's get started!"),
  React.createElement(Expenses, {items: expenses})
  );
```

jsx에서 상위 한개의 태그가 필요한 이유는 js로 구현했을 때의 처음 React.createElement로 만든 친구 한개만을 반환하기 때문, -> 이후에 생성되는 태그들은 처음 생성된 element의 안에서 생성이 되고 최초 생성된 element만 반환이 되는 형식
