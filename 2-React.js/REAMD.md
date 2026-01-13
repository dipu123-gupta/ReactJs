

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

---------------------------
---------------------------
=====================================================
# 🔥 React Interview Q&A (JSX, Babel, Props, Components)

---

## 🔹 JSX (Very Important)

### Q1. JSX kya hai?

**Answer:**
JSX JavaScript ka syntax extension hai jo React me UI likhne ke liye use hota hai. Ye HTML jaisa dikhta hai lekin actual me JavaScript hota hai.

---

### Q2. Kya JSX HTML hai?

**Answer:**
Nahi. JSX HTML nahi hai. JSX ko Babel JavaScript me convert karta hai aur React usse Virtual DOM banata hai.

---

### Q3. JSX use karna mandatory hai?

**Answer:**
Nahi. JSX optional hai. Hum directly `React.createElement()` bhi use kar sakte hain, lekin JSX code readable aur maintainable banata hai.

---

### Q4. JSX browser kaise samajhta hai?

**Answer:**
Browser JSX directly nahi samajhta. Babel JSX ko JavaScript me convert karta hai, fir browser execute karta hai.

---

### Q5. JSX ke andar curly braces `{}` ka use kyu hota hai?

**Answer:**
Curly braces `{}` JSX ke andar JavaScript expressions likhne ke liye use hote hain.

---

### Q6. JSX me statements kyu allowed nahi hote?

**Answer:**
Kyuki JSX ke andar sirf expressions allowed hote hain. Statements (if, for, while) value return nahi karte.

---

## 🔹 Babel

### Q7. Babel kya hai?

**Answer:**
Babel ek JavaScript compiler (transpiler) hai jo modern JavaScript aur JSX ko browser-compatible JavaScript me convert karta hai.

---

### Q8. JSX ko kaun convert karta hai?

**Answer:**
JSX ko **Babel** `React.createElement()` calls me convert karta hai.

---

### Q9. Babel production me bhi hota hai?

**Answer:**
Development me Babel runtime pe hota hai, production me build time pe JSX convert ho jata hai.

---

## 🔹 Virtual DOM

### Q10. Virtual DOM kya hai?

**Answer:**
Virtual DOM ek plain JavaScript object hota hai jo UI ka lightweight representation hota hai.

---

### Q11. Virtual DOM real DOM se fast kyu hota hai?

**Answer:**
Kyuki Virtual DOM lightweight object hota hai, jisko compare aur update karna real DOM se fast hota hai.

---

### Q12. React direct DOM manipulation kyu avoid karta hai?

**Answer:**
Direct DOM manipulation slow aur error-prone hota hai. React pehle Virtual DOM update karta hai, fir minimum changes real DOM me karta hai.

---

## 🔹 JSX Rules (Common Interview Trap)

### Q13. JSX me ek hi root element kyu allowed hai?

**Answer:**
Kyuki JSX `React.createElement()` me convert hota hai jo ek hi object return karta hai.

---

### Q14. JSX me sab tags close kyu karne hote hain?

**Answer:**
Kyuki JSX JavaScript hai aur strict syntax follow karta hai.

---

### Q15. JSX me `class` ki jagah `className` kyu?

**Answer:**
Kyuki `class` JavaScript ka reserved keyword hai.

---

### Q16. JSX me `for` ki jagah `htmlFor` kyu?

**Answer:**
Kyuki `for` JavaScript ka keyword hai, isliye JSX me `htmlFor` use hota hai.

---

### Q17. JSX me style kaise likhte hain?

**Answer:**
JSX me style ek JavaScript object hota hai, string nahi.

```js
style={{ color: "red", fontSize: "20px" }}
```

---

## 🔹 React Components

### Q18. React component kya hai?

**Answer:**
React component ek JavaScript function hota hai jo JSX return karta hai.

---

### Q19. Component ka naam capital letter se kyu hota hai?

**Answer:**
React capital letter se identify karta hai ki ye component hai, aur lowercase ko DOM element maanta hai.

---

### Q20. Functional component aur normal function me kya difference hai?

**Answer:**
Functional component JSX return karta hai aur React usse `<Component />` syntax se render karta hai.

---

### Q21. Ek component ko multiple baar use kar sakte hain?

**Answer:**
Haan. Components reusable hote hain, isi liye React powerful hai.

---

## 🔹 Props (Very Important)

### Q22. Props kya hote hain?

**Answer:**
Props ek object hota hai jo component ko data pass karne ke liye use hota hai.

---

### Q23. Props ka data kaun pass karta hai?

**Answer:**
Parent component child component ko props pass karta hai.

---

### Q24. Props immutable kyu hote hain?

**Answer:**
Kyuki React ka data flow one-way hota hai. Props change karne ke liye state use hota hai.

---

### Q25. Props aur state me difference?

**Answer:**

* Props → parent se aata hai, read-only
* State → component ke andar hota hai, mutable

---

### Q26. props.children kya hota hai?

**Answer:**
Component ke opening aur closing tag ke beech ka content `props.children` me milta hai.

---

### Q27. Props destructuring kya hota hai?

**Answer:**
Props object se values directly nikalna destructuring kehlata hai, jo code clean banata hai.

---

## 🔹 Arrays & Keys

### Q28. JSX me list render kaise karte hain?

**Answer:**
`map()` function ka use karke.

---

### Q29. Key prop kya hota hai?

**Answer:**
Key React ko batata hai kaunsa list item change hua, add hua ya remove hua.

---

### Q30. Index ko key banana sahi hai?

**Answer:**
Small static list me theek hai, lekin dynamic list me recommended nahi hai.

---

## 🔹 Fragments & Conditional Rendering

### Q31. Fragment kya hai?

**Answer:**
Fragment multiple elements ko bina extra DOM node ke wrap karta hai.

---

### Q32. Conditional rendering kaise karte hain?

**Answer:**
Ternary operator ya logical AND (`&&`) ka use karke.

---

## 🔹 Tricky / Advanced

### Q33. JSX aur React.createElement me relation?

**Answer:**
JSX sirf syntax sugar hai for `React.createElement()`.

---

### Q34. `{false}`, `{null}` JSX me render hote hain?

**Answer:**
Nahi. Ye kuch render nahi karte.

---

### Q35. `{0}` JSX me render hota hai?

**Answer:**
Haan. `0` render hota hai.

---

## ✅ FINAL INTERVIEW TIP 🔥

Agar interviewer puche:

> **"React ka core idea kya hai?"**

👉 Best Answer:

> React UI ko **declarative**, **component-based**, aur **efficient** banata hai Virtual DOM aur one-way data flow ke through.
