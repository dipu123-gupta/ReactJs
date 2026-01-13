

# 📘 LECTURE 02 – DETAILED DEFINITIONS & EXPLANATION

---

## 1️⃣ JSX (JavaScript XML)

### 📌 Definition

**JSX ek syntax extension hai JavaScript ka**, jo React me UI likhne ke liye use hota hai.
Ye **HTML nahi hota**, balki **JavaScript code hota hai jo HTML jaisa dikhta hai**.

---

### 🧠 Explanation

Normally JavaScript me UI likhna bahut verbose ho jata hai:

```js
React.createElement("h1", null, "Hello")
```

Isko easy aur readable banane ke liye React ne JSX introduce kiya:

```jsx
<h1>Hello</h1>
```

👉 JSX **developer experience improve karta hai**, machine ke liye nahi.

---

### ❗ Important Points

* Browser JSX samajh nahi sakta
* JSX directly run nahi hota
* JSX **JavaScript me convert hota hai**

---

## 2️⃣ Babel

### 📌 Definition

**Babel ek JavaScript compiler / transpiler hai** jo JSX aur modern JavaScript ko **browser-understandable JavaScript** me convert karta hai.

---

### 🧠 Explanation (Transformation Process)

#### Step 1: Tum JSX likhte ho

```jsx
<h1 id="title">Hello</h1>
```

#### Step 2: Babel convert karta hai

```js
React.createElement("h1", { id: "title" }, "Hello")
```

#### Step 3: React Virtual DOM banata hai

```js
{
  type: "h1",
  props: {
    id: "title",
    children: "Hello"
  }
}
```

👉 JSX sirf **React.createElement likhne se bachata hai**

---

## 3️⃣ Virtual DOM

### 📌 Definition

**Virtual DOM ek plain JavaScript object hota hai** jo UI ka **description** represent karta hai, real DOM nahi.

---

### 🧠 Explanation

* Real DOM slow hota hai
* Direct DOM manipulation expensive hota hai
* React pehle **Virtual DOM** banata hai
* Fir ReactDOM usse **Real DOM** me convert karta hai

👉 Virtual DOM = **UI ka blueprint**

---

## 4️⃣ JSX Syntax Rules

### 📌 Definition

JSX likhte waqt kuch strict rules follow karne padte hain taaki React usse correctly Virtual DOM me convert kar sake.

---

### 🔹 Rule 1: Single Root Element

❌ Wrong:

```jsx
<h1>Title</h1>
<p>Text</p>
```

✅ Correct:

```jsx
<div>
  <h1>Title</h1>
  <p>Text</p>
</div>
```

📌 **Reason:**
React.createElement ek hi object return karta hai.

---

### 🔹 Rule 2: All tags must be closed

```jsx
<img src="photo.jpg" />
<input />
<br />
```

📌 JSX HTML jaisa nahi hai, ye JavaScript hai → strict syntax.

---

## 5️⃣ JavaScript Expressions in JSX `{}`

### 📌 Definition

`{}` JSX ke andar **JavaScript expressions embed karne** ke liye use hota hai.

---

### 🧠 What is Expression?

Expression wo hota hai jo **kisi value me evaluate hota hai**.

✅ Expression:

```js
a + b
getName()
age > 18 ? "Adult" : "Minor"
```

❌ Statement:

```js
if
for
while
switch
```

---

### ✅ Examples

```jsx
<h1>Hello {name}</h1>
<p>{a + b}</p>
<p>{isLoggedIn && "Welcome"}</p>
```

---

## 6️⃣ JSX Attributes

### 📌 Definition

JSX attributes HTML jaise dikhte hain, lekin **JavaScript rules follow karte hain**.

---

### 🔹 className

```jsx
<div className="box"></div>
```

📌 **Reason:**
`class` JavaScript ka reserved keyword hai.

---

### 🔹 htmlFor

```jsx
<label htmlFor="name"></label>
```

📌 `for` JS keyword hai → htmlFor use hota hai.

---

### 🔹 Event Handling

```jsx
<button onClick={handleClick}></button>
```

📌 camelCase mandatory hai.

---

## 7️⃣ JSX Styling

### 📌 Definition

JSX me `style` attribute ek **JavaScript object** hota hai, string nahi.

---

### ❌ Wrong

```jsx
<h1 style="color:red"></h1>
```

### ✅ Correct

```jsx
<h1 style={{ color: "red", fontSize: "20px" }}></h1>
```

📌 Double braces ka matlab:

* Outer `{}` → JS expression
* Inner `{}` → JS object

---

## 8️⃣ Arrays in JSX

### 📌 Definition

JSX arrays of elements ko render kar sakta hai.

---

### 🧠 Example

```jsx
{numbers.map(num => (
  <li key={num}>{num}</li>
))}
```

📌 `key` React ko batata hai:

* kaunsa item add
* kaunsa remove
* kaunsa update

---

## 9️⃣ React Fragment

### 📌 Definition

**Fragment ek wrapper hai** jo bina extra DOM element add kiye multiple elements return karne deta hai.

---

### ✅ Syntax

```jsx
<>
  <h1 />
  <p />
</>
```

📌 DOM clean rehta hai.

---

## 🔟 React Component

### 📌 Definition

**React Component ek JavaScript function hota hai jo JSX return karta hai.**

---

### 🧠 Example

```js
function Greeting() {
  return <h1>Hello</h1>;
}
```

Use:

```jsx
<Greeting />
```

---

### ❗ Capital Letter Rule

```jsx
<div />        // DOM element
<Greeting />  // Component
```

📌 React isi se decide karta hai:

* string → HTML
* function → component

---

## 1️⃣1️⃣ Props

### 📌 Definition

**Props (Properties) ek object hota hai** jo component ko data pass karne ke liye use hota hai.

---

### 🧠 Example

```jsx
<Greeting name="Rohit" />
```

```js
function Greeting(props) {
  return <h1>Hello {props.name}</h1>;
}
```

👉 React internally karta hai:

```js
Greeting({ name: "Rohit" })
```

---

## 1️⃣2️⃣ Props are Read-Only

### 📌 Definition

Props **immutable hote hain**, unko modify nahi kar sakte.

❌ Wrong:

```js
props.name = "Other"
```

📌 Data change ke liye **State** use hota hai (next lecture).

---

## 1️⃣3️⃣ props.children

### 📌 Definition

Component ke opening aur closing tag ke beech ka content automatically `props.children` me aata hai.

---

### 🧠 Example

```jsx
<Card>
  <h2>Title</h2>
</Card>
```

```js
function Card({ children }) {
  return <div>{children}</div>;
}
```

---

## 1️⃣4️⃣ Default Props

### 📌 Definition

Jab prop pass na ho, tab **default value set karna** default props kehlata hai.

---

### Example

```js
function Greeting({ name = "Guest" }) {
  return <h1>Hello {name}</h1>;
}
```

---

## ✅ FINAL SUMMARY (Exam Ready)

* JSX → syntax sugar for `React.createElement`
* Babel → JSX ko JS me convert karta hai
* Virtual DOM → UI ka JavaScript object
* Component → function returning JSX
* Props → data passing mechanism
* props immutable hote hain
* `props.children` → nested content
* Fragment → extra DOM avoid karta hai
