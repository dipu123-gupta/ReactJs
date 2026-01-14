

# 🔹 useState Hook 

---

## 1️⃣ Definition (Simple & Clear)

### 🔸 Official Definition

`useState` React ka ek **Hook** hai jo functional component me **state (data)** ko store karta hai aur jab state change hoti hai to **UI ko automatically update (re-render)** karta hai.

### 🔸 Simple Language

👉 Jab kisi component ke **data change hone par screen bhi change honi chahiye**, tab `useState` use hota hai.

📌 **Rule:**

> Data change → Component re-render → UI update

---

## 2️⃣ Problem Without useState (Why it is needed)

### ❌ Normal Variable Example

```jsx
function Counter() {
  let count = 0;

  return (
    <button onClick={() => count = count + 1}>
      Count: {count}
    </button>
  );
}
```

### ❌ Problem

* Button click hota hai
* `count` badhta hai memory me
* ❌ Screen update nahi hoti

### ❓ Why?

* React ko pata hi nahi chala ki data change hua
* Component dobara render hi nahi hua

📌 **Conclusion:**

> Normal variables React ko UI update karne ka signal nahi dete

---

## 3️⃣ What useState Actually Does (Concept)

`useState` React ko **signal deta hai**:

> “Mera data change hua hai, component dobara run karo”

---

## 4️⃣ Syntax of useState

```jsx
const [state, setState] = useState(initialValue);
```

### Breakdown:

| Part           | Meaning                        |
| -------------- | ------------------------------ |
| `state`        | Current value                  |
| `setState`     | Value update karne ka function |
| `initialValue` | Starting value                 |

---

## 5️⃣ Basic Example (Counter)

### 🔹 Example Code

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}

export default Counter;
```

---

## 6️⃣ Step-by-Step Implementation (Very Important)

### 🔁 First Render

1. `useState(0)` call hota hai
2. React internally value **0 store** karta hai
3. `count = 0`
4. JSX banata hai → `Count: 0`
5. Screen par show hota hai

---

### 🖱️ Button Click

1. `setCount(count + 1)` call
2. React value **0 → 1** update karta hai
3. React **re-render schedule** karta hai
4. Component function **poora dobara run** hota hai
5. Ab `count = 1`
6. JSX → `Count: 1`
7. DOM update

📌 **Key Point:**

> Component function dobara run hota hai, isliye UI update hoti hai

---

## 7️⃣ Re-render Means What?

Re-render ka matlab:

* Component ka **poora function fir se execute**
* Saare variables dobara bante hain
* Sirf **state value purani yaad rehti hai**

### Example:

```jsx
function Example() {
  const [count, setCount] = useState(1);
  const double = count * 2;

  return <p>{double}</p>;
}
```

👉 Har render me `double` dobara calculate hota hai

---

## 8️⃣ State Update Is NOT Immediate (Async Nature)

### ❌ Example

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    console.log(count); // 0
    setCount(count + 1);
    console.log(count); // 0 (still)
  }

  return <button onClick={handleClick}>{count}</button>;
}
```

### ❓ Why?

* `setCount` turant value change nahi karta
* React pehle function complete hone deta hai
* Baad me re-render hota hai

📌 **Rule:**

> State update asynchronous hota hai

---

## 9️⃣ Correct Way When New State Depends on Old State

### ❌ Wrong

```jsx
setCount(count + 1);
setCount(count + 1);
```

👉 Result: `+1` only

---

### ✅ Correct (Updater Function)

```jsx
setCount(prev => prev + 1);
setCount(prev => prev + 1);
```

👉 Result: `+2`

📌 **Golden Rule:**

> Jab new state old state par depend kare → updater function use karo

---

## 🔟 Different Types of useState Implementation

---

### 🔢 Number State

```jsx
const [count, setCount] = useState(0);
setCount(count + 1);
```

---

### 🔤 String State

```jsx
const [name, setName] = useState("");
setName("Rahul");
```

---

### 🔘 Boolean State (Toggle)

```jsx
const [isOpen, setIsOpen] = useState(false);
setIsOpen(!isOpen);
```

---

### 📦 Array State

```jsx
const [items, setItems] = useState([]);

// Add
setItems([...items, "Apple"]);

// Remove
setItems(items.filter(item => item !== "Apple"));
```

---

### 🧍 Object State

```jsx
const [user, setUser] = useState({
  name: "",
  age: 0
});

setUser({ ...user, name: "Amit" });
```

---

## 1️⃣1️⃣ Multiple useState in One Component

```jsx
function Form() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <>
      <input value={name} onChange={e => setName(e.target.value)} />
      <input value={email} onChange={e => setEmail(e.target.value)} />
    </>
  );
}
```

📌 **Allowed:**

> Ek component me multiple `useState` ho sakte hain

---

## 1️⃣2️⃣ Real-Life Example (Form Input)

```jsx
function Login() {
  const [username, setUsername] = useState("");

  return (
    <>
      <input
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <p>Typed: {username}</p>
    </>
  );
}
```

👉 User type kare → state change → UI update

---

## 1️⃣3️⃣ Common Mistakes

❌ Direct state change

```js
count = count + 1
```

❌ Object overwrite

```js
setUser({ name: "A" }) // age lost
```

✅ Correct

```js
setUser({ ...user, name: "A" })
```

---

## ✅ Final Summary (Interview Ready)

* `useState` component ko reactive banata hai
* State change → re-render → UI update
* Normal variables UI update nahi karte
* Re-render = function dobara run
* State update async hota hai
* Old state dependent update → updater function
