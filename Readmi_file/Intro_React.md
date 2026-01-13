
# 1. What is React and Why Use It

**React** ek **JavaScript library** hai jo **User Interface (UI)** banane ke liye use hoti hai.

Simple words me:
React se hum **fast, interactive aur scalable web applications** bana sakte hain.

### Why use React?

* Component-based structure (UI ko chhote parts me tod sakte hain)
* Reusable components (ek baar likho, multiple jagah use karo)
* Fast performance
* Easy to manage large applications
* Huge community & job demand

---

# 2. SPA (Single Page Application)

**SPA** ka matlab hota hai **Single Page Application**.

Isme:

* Sirf ek HTML page load hota hai
* Page reload nahi hota
* Sirf data change hota hai

Traditional websites me har click pe page reload hota hai, lekin
React SPA me **smooth aur fast experience** milta hai.

Examples:

* Gmail
* Facebook
* Instagram

---

# 3. Virtual DOM

### DOM kya hota hai?

DOM browser ka structure hota hai jo HTML elements ko represent karta hai.

### Virtual DOM kya hai?

* Virtual DOM, Real DOM ki ek copy hoti hai (memory ke andar)
* React pehle Virtual DOM update karta hai
* Phir old aur new Virtual DOM ka comparison karta hai (diffing)
* Sirf required part Real DOM me update hota hai

### Benefit:

* Fast rendering
* Better performance
* Less browser workload

Isliye React fast hota hai 🚀

---

# 4. React vs Other Frameworks

| Feature        | React     | Angular   | Vue       |
| -------------- | --------- | --------- | --------- |
| Type           | Library   | Framework | Framework |
| Learning Curve | Easy      | Hard      | Medium    |
| Flexibility    | High      | Low       | Medium    |
| Demand         | Very High | Medium    | Medium    |

React zyada flexible hai aur industry me sabse zyada use hota hai.

---

# 5. What is Vite?

**Vite** ek modern **build tool** hai jo React apps ko fast banata aur run karta hai.

Vite provide karta hai:

* Fast dev server
* Instant hot reload
* Very fast project startup

Simple words me:
**Vite = Speed + Better Developer Experience**

---

# 6. Vite vs CRA (Create React App)

| Feature    | Vite      | CRA     |
| ---------- | --------- | ------- |
| Start Time | Very Fast | Slow    |
| Hot Reload | Instant   | Slow    |
| Bundler    | ESBuild   | Webpack |
| Modern     | Yes       | No      |

Aaj ke time me most companies **Vite prefer karti hain**.

---

# 7. Installing Node.js & npm

React run karne ke liye **Node.js** required hota hai.

* Node.js → JavaScript runtime
* npm → Package manager (libraries install karne ke liye)

Check versions:

```bash
node -v
npm -v
```

Agar version show ho raha hai, to setup sahi hai ✅

---

# 8. Creating React App Using Vite

### Step 1: Project create karo

```bash
npm create vite@latest
```

### Step 2: Select options

* React
* JavaScript / JavaScript + SWC

### Step 3: Run project

```bash
cd project-name
npm install
npm run dev
```

Browser me open hoga:

```
http://localhost:5173
```

---

# 9. Project Folder Structure (Vite)

```
project/
│── node_modules/
│── public/
│── src/
│   ├── assets/
│   ├── App.jsx
│   ├── main.jsx
│── index.html
│── package.json
```

### Important files:

* `main.jsx` → React app ka entry point
* `App.jsx` → Root component
* `index.html` → Single HTML page

---

# 10. JSX Basics

**JSX = JavaScript + HTML**

```jsx
const name = "React";

return <h1>Hello {name}</h1>;
```

### JSX rules:

* Single parent element hona chahiye
* class ke jagah `className`
* JavaScript curly braces `{}` ke andar

JSX se UI likhna easy aur readable ho jata hai.

---

# 11. Functional Components

React me components **functions** hote hain.

```jsx
function Header() {
  return <h1>Welcome</h1>;
}

export default Header;
```

### Advantages:

* Simple syntax
* Hooks support
* Easy to reuse

Modern React me **functional components hi use hote hain**.

---

# 12. Component Reusability

Ek component ko multiple jagah use kar sakte ho.

```jsx
<Card />
<Card />
<Card />
```

### Benefits:

* Code repetition kam hota hai
* Easy maintenance
* Clean project structure

Component reusability React ka core concept hai.

---

# 13. Import & Export (In Detail)

### Default Export

```jsx
export default App;
```

Import:

```jsx
import App from "./App";
```

✔ Default export me import ka naam kuch bhi rakh sakte ho.

---

### Named Export

```jsx
export const Header = () => {};
```

Import:

```jsx
import { Header } from "./Header";
```

✔ Named export me same naam use karna compulsory hota hai.

---

### Mixed Export Example

```jsx
export default App;
export const Footer = () => {};
```

Import:

```jsx
import App, { Footer } from "./App";
```

---

## ✅ Summary

Is section me aapne cover kiya:

* React basics
* SPA concept
* Virtual DOM
* Vite setup
* JSX
* Functional components
* Reusability
* Import / Export

