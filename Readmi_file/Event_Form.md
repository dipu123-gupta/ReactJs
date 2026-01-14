

# 🔹 4. Events & Forms (React)

---

## 1️⃣ Event Handling in React

---

## 🔸 Definition

**Event handling** ka matlab hota hai:
👉 *User ke action (click, typing, submit, hover, etc.) par React ka response dena.*

React me events **JavaScript jaise hi hote hain**, bas thoda syntax different hota hai.

---

### 🔸 Common Events

* `onClick`
* `onChange`
* `onSubmit`
* `onMouseEnter`
* `onKeyDown`

---

### 🔸 Event Handling Syntax

❌ HTML me:

```html
<button onclick="handleClick()">Click</button>
```

✅ React me:

```jsx
<button onClick={handleClick}>Click</button>
```

---

### 🔸 Simple Example

```jsx
function App() {

  function handleClick() {
    alert("Button clicked");
  }

  return (
    <button onClick={handleClick}>
      Click Me
    </button>
  );
}

export default App;
```

📌 **Important points**

* Event name camelCase hota hai (`onClick`)
* Function call nahi likhte → reference dete hain

---

## 2️⃣ Synthetic Events

---

## 🔸 Definition

**Synthetic Event** React ka ek wrapper hota hai jo browser ke real events ke upar kaam karta hai.

👉 Matlab:

* React events **same behavior** dete hain
* Sab browsers me **same tarike se work** karte hain

---

### 🔸 Why Synthetic Events?

* Cross-browser compatibility
* Performance optimization
* Same event API everywhere

---

### 🔸 Example

```jsx
function App() {

  function handleClick(event) {
    console.log(event);
    console.log(event.target);
  }

  return (
    <button onClick={handleClick}>
      Click Me
    </button>
  );
}
```

📌 `event` yaha **SyntheticEvent** object hota hai
But use karne me bilkul normal JS event jaisa lagta hai

---

## 3️⃣ Controlled Components

---

## 🔸 Definition

**Controlled Component** wo component hota hai jisme:

* Form input ki value **React state control karti hai**
* Input ka data **single source of truth = state**

---

### 🔸 Without Controlled Component (Wrong way)

```jsx
<input type="text" />
```

👉 React ko pata hi nahi user kya type kar raha hai

---

### 🔸 Controlled Component (Correct way)

```jsx
import { useState } from "react";

function App() {
  const [name, setName] = useState("");

  return (
    <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  );
}

export default App;
```

📌 Ab:

* Input value = `name`
* User type kare → state update ho
* UI re-render ho

---

### 🔸 Why Controlled Components?

* Easy validation
* Easy form submit
* Easy reset
* Predictable behavior

---

## 4️⃣ Form Submission in React

---

## 🔸 Problem

Normal HTML form me:

```html
<form>
  <button type="submit">Submit</button>
</form>
```

👉 Page reload ho jata hai ❌

---

## 🔸 React Solution: `preventDefault()`

---

### 🔸 Example: Basic Form Submit

```jsx
import { useState } from "react";

function App() {
  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault(); // page reload stop
    console.log("Submitted name:", name);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default App;
```

📌 `onSubmit` hamesha `<form>` pe lagta hai

---

## 5️⃣ Handling Multiple Inputs

---

## 🔸 Problem

Agar form me bahut saare inputs ho:

* name
* email
* password

To alag-alag state banana messy ho jata hai ❌

---

## 🔸 Solution: Single State Object

---

### 🔸 Example: Multiple Inputs Form

```jsx
import { useState } from "react";

function App() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
  }

  return (
    <form onSubmit={handleSubmit}>

      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
      />

      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />

      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
      />

      <button type="submit">Submit</button>

    </form>
  );
}

export default App;
```

---

### 🔸 Key Concept

```js
[name]: value
```

👉 Ye **dynamic key** hai
👉 Jo input change hota hai wahi update hota hai

---

## 6️⃣ Basic Form Validation

---

## 🔸 Definition

**Form validation** ka matlab:

* User ne correct data bhara ya nahi
* Empty input, wrong email, short password check karna

---

## 🔸 Example: Basic Validation

```jsx
import { useState } from "react";

function App() {

  const [formData, setFormData] = useState({
    name: "",
    email: ""
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (formData.name === "") {
      setError("Name is required");
      return;
    }

    if (formData.email === "") {
      setError("Email is required");
      return;
    }

    setError("");
    console.log("Form Submitted", formData);
  }

  return (
    <form onSubmit={handleSubmit}>

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit">Submit</button>

    </form>
  );
}

export default App;
```

---

## 🔸 Validation Flow

1. User submit karta hai
2. `handleSubmit` call hota hai
3. Conditions check hoti hain
4. Error ho → message show
5. Sab sahi → form submit

---

## 🧠 Interview Important Points

* **Event handling** → user interaction handle karna
* **Synthetic event** → React ka cross-browser event
* **Controlled component** → input value state se controlled
* **preventDefault()** → page reload stop
* **Multiple inputs** → single object state
* **Validation** → submit se pehle data check

---

## ✅ Summary (Short)

* React events = camelCase
* Event object = SyntheticEvent
* Controlled input = `value + onChange`
* Form submit = `onSubmit + preventDefault()`
* Multiple inputs = single state object
* Validation = conditions + error state


