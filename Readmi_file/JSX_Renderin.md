
# 2. JSX & Rendering (Definition + Explanation + Implementation)

---

## 1️⃣ JSX

### Definition

**JSX (JavaScript XML)** ek syntax extension hai jo React me use hota hai to write UI code using HTML-like syntax inside JavaScript.

---

### Explanation

JSX allow karta hai ki hum UI aur logic ko ek hi file me likh sake. Browser JSX ko directly nahi samajhta, isliye Babel JSX ko JavaScript me convert karta hai.

---

### Implementation (Code)

```jsx
function App() {
  return <h1>Hello React</h1>;
}

export default App;
```

---

### Output

```
Hello React
```

---

## 2️⃣ JSX Syntax Rules

### Definition

JSX syntax rules wo rules hain jo JSX likhte time follow karne hote hain, warna code error dega.

---

### Explanation + Implementation

### Rule 1: Single Parent Element

```jsx
// ❌ Error
return (
  <h1>Hello</h1>
  <p>World</p>
);

// ✅ Correct
return (
  <div>
    <h1>Hello</h1>
    <p>World</p>
  </div>
);
```

---

### Rule 2: class → className

```jsx
<div className="box">Content</div>
```

---

### Rule 3: JavaScript inside {}

```jsx
const name = "React";

<h1>Hello {name}</h1>
```

---

## 3️⃣ JavaScript Expressions in JSX

### Definition

**JavaScript expressions** wo code hote hain jo ek value return karte hain and JSX ke andar `{}` ke through use kiye jate hain.

---

### Explanation

JSX me sirf expressions allowed hote hain, statements (if, for) allowed nahi hote.

---

### Implementation

```jsx
function App() {
  const age = 18;

  return <h1>Age after 5 years: {age + 5}</h1>;
}
```

---

### Output

```
Age after 5 years: 23
```

---

## 4️⃣ Conditional Rendering

### Definition

**Conditional Rendering** ka matlab hai condition ke base pe UI ko render karna.

---

### Explanation

React me UI dynamic hota hai, isliye conditions ke according different components ya elements show karte hain.

---

### Implementation – Ternary Operator

```jsx
function App() {
  const isLoggedIn = true;

  return (
    <h1>{isLoggedIn ? "Welcome User" : "Please Login"}</h1>
  );
}
```

---

### Output

```
Welcome User
```

---

### Implementation – Logical &&

```jsx
function App() {
  const isAdmin = true;

  return (
    <>
      {isAdmin && <p>Admin Panel</p>}
    </>
  );
}
```

---

### Output

```
Admin Panel
```

---

## 5️⃣ Rendering Lists

### Definition

**Rendering lists** ka matlab hai array data ko UI me show karna using `map()` method.

---

### Explanation

React arrays ko directly render nahi karta, isliye map() use karke har item ko JSX element me convert karte hain.

---

### Implementation

```jsx
function App() {
  const users = ["Aman", "Ravi", "Neha"];

  return (
    <ul>
      {users.map((user) => (
        <li>{user}</li>
      ))}
    </ul>
  );
}
```

---

### Output

```
• Aman
• Ravi
• Neha
```

---

## 6️⃣ Keys in React

### Definition

**Key** ek unique identifier hota hai jo React ko help karta hai efficiently update karne me list items ko.

---

### Explanation

Keys React ko batate hain kaunsa item change hua, add hua ya remove hua.

---

### Implementation

```jsx
function App() {
  const users = [
    { id: 1, name: "Aman" },
    { id: 2, name: "Ravi" },
  ];

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

---

### Why not index as key?

* Reordering issues
* Performance problems

---

## 7️⃣ Fragments

### Definition

**Fragment** React ka feature hai jo bina extra HTML element add kiye multiple elements return karne deta hai.

---

### Explanation

Extra divs DOM ko messy bana dete hain, fragments is problem ko solve karte hain.

---

### Implementation

```jsx
function App() {
  return (
    <>
      <h1>Title</h1>
      <p>Description</p>
    </>
  );
}
```

---

### Output

DOM me koi extra div nahi add hota.

---

## 8️⃣ Component Composition

### Definition

**Component Composition** ka matlab hai chhote components ko combine karke ek bada component banana.

---

### Explanation

React inheritance ke bajay composition follow karta hai for better reusability and flexibility.

---

### Implementation

#### Child Component

```jsx
function Header() {
  return <h1>Header</h1>;
}
```

#### Parent Component

```jsx
function Layout() {
  return (
    <>
      <Header />
      <p>Main Content</p>
    </>
  );
}

export default Layout;
```

---

### Advanced Example using `children`

```jsx
function Card({ children }) {
  return <div className="card">{children}</div>;
}

function App() {
  return (
    <Card>
      <h2>React Card</h2>
      <p>This is component composition</p>
    </Card>
  );
}
```

---

### Output

```
[ React Card ]
This is component composition
```

---

## ✅ Final Summary

* JSX defines UI structure
* Syntax rules are strict
* Expressions power dynamic UI
* Conditional rendering controls visibility
* map() renders lists
* Keys optimize performance
* Fragments keep DOM clean
* Composition builds scalable apps

