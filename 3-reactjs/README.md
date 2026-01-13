
## 📘 Lecture 03: Introduction to Vite – Complete Explanation (Simple Hinglish)

---

## 1️⃣ npm (Node Package Manager)

### 🔹 npm kya hota hai?

npm ek **package manager** hai JavaScript ke liye.

Iske **2 main parts** hote hain:

1. **Registry (npmjs.com)**
   👉 Ye ek online server hai jahan **lakho JavaScript packages** store hote hain.

2. **CLI Tool (Command Line Tool)**
   👉 Terminal me use hota hai packages install / manage karne ke liye.

---

### 🔹 npm kya karta hai? (Example)

```bash
npm install react
```

Ye command kya-kya karti hai:

* npmjs.com se connect hota hai
* `react` package download karta hai
* `node_modules/` folder me save karta hai
* `package.json` me entry add karta hai

---

### 🔹 Common npm Commands

| Command                    | Kya karta hai                                  |
| -------------------------- | ---------------------------------------------- |
| `npm init -y`              | `package.json` banata hai                      |
| `npm install <package>`    | Package install karta hai                      |
| `npm install`              | package.json ke sab packages install karta hai |
| `npm install -D <package>` | Dev dependency install karta hai               |
| `npm run dev`              | Dev server start karta hai                     |
| `npm run build`            | Production build banata hai                    |

---

## 2️⃣ React + Vite Setup

---

## ✅ Quick Setup (Automatic Way)

```bash
npm create vite@latest
# Select: React
# Select: JavaScript
cd project-name
npm install
npm run dev
```

👉 Ye fastest aur recommended way hai.

---

## 🛠️ Manual Setup (From Scratch)

### Step 1: Folder aur npm init

```bash
mkdir react-app
cd react-app
npm init -y
```

---

### Step 2: Dependencies Install

#### Runtime Dependencies (App chalane ke liye)

```bash
npm install react react-dom
```

#### Dev Dependencies (Tools ke liye)

```bash
npm install -D vite @vitejs/plugin-react
```

---

### Step 3: `vite.config.js`

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()]
})
```

👉 Ye batata hai ki Vite ko React + JSX kaise handle karna hai.

---

### Step 4: Folder Structure

```bash
mkdir src
```

---

### Step 5: `index.html` (Root Folder me)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>React App</title>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
</html>
```

👉 React isi `#root` div ke andar render hota hai.

---

### Step 6: `src/main.jsx`

```jsx
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(<App />)
```

👉 Ye React app ka **entry point** hai.

---

### Step 7: `src/App.jsx`

```jsx
function App() {
  return <h1>Hello from React!</h1>
}

export default App
```

---

### Step 8: `package.json` Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

---

### Step 9: Run App

```bash
npm run dev
```

---

## 3️⃣ Build Tools Problem & Solution

### 🔹 Problem:

Agar project me 10 files hain:

* Browser ko 10 network requests karni padti hain
* Page slow load hota hai

---

### 🔹 Bundler Solution:

Bundler sab files ko **ek ya kuch files** me merge kar deta hai.

```text
dist/
 ├── index.html
 └── assets/
     └── index-a1b2c3.js
```

👉 Browser sirf **1 request** karta hai → FAST 🚀

---

## 4️⃣ Vite Kya Kya Karta Hai?

| Feature        | Kaam                  |
| -------------- | --------------------- |
| Dev Server     | localhost:5173        |
| JSX Transform  | JSX → JS              |
| HMR            | Instant update        |
| CSS Handling   | CSS inject            |
| Asset Handling | Images, fonts         |
| Minification   | Code compress         |
| Code Splitting | Required code hi load |

---

## 5️⃣ CDN vs Vite

| CDN                  | Vite             |
| -------------------- | ---------------- |
| Single file          | Multiple files   |
| Browser JSX          | Build-time JSX   |
| Slow                 | Fast             |
| No HMR               | Instant HMR      |
| Not production ready | Production ready |

---

## 6️⃣ Advanced Vite Config

```js
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'build',
    sourcemap: true
  },
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components'
    }
  }
})
```

---

## 7️⃣ Plugins Samjho Simple Example se

📱 Mobile Example:

* Phone default → Call, SMS
* Zomato install → Food order

⚙️ Vite:

* Default → JS, CSS
* React plugin → JSX support

---

### `@vitejs/plugin-react` kya karta hai?

1️⃣ JSX ke liye automatic React import
2️⃣ Fast Refresh enable karta hai
3️⃣ React specific optimizations

---

## 8️⃣ Import / Export System

### Named Export

```js
// math.js
export const PI = 3.14
export function add(a, b) {
  return a + b
}
```

```js
import { PI, add } from './math.js'
```

---

### Default Export

```jsx
// Calculator.jsx
function Calculator() {
  return <div>Calculator</div>
}

export default Calculator
```

```js
import Calculator from './Calculator.jsx'
```

---

### Rename Import

```js
import { PI as myPI, add as sum } from './math.js'
```

---

## 9️⃣ package.json Explained

```json
{
  "name": "my-react-app",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "vite": "^6.0.0",
    "@vitejs/plugin-react": "^4.0.0"
  }
}
```

---

### dependencies vs devDependencies

| Type            | Use               |
| --------------- | ----------------- |
| dependencies    | App run ke liye   |
| devDependencies | Development tools |

---

### Version Symbols

| Symbol    | Meaning              |
| --------- | -------------------- |
| `^19.0.0` | Minor + patch update |
| `~19.0.0` | Sirf patch           |
| `19.0.0`  | Exact version        |

---

## 🔟 JSX Extension Rule

❌ Wrong

```js
// App.js
return <h1>Hello</h1>
```

✅ Correct

```jsx
// App.jsx
return <h1>Hello</h1>
```

---

## 1️⃣1️⃣ esbuild vs Babel

| Tool    | Kaam            |
| ------- | --------------- |
| esbuild | JSX → JS (fast) |
| Babel   | Fast Refresh    |

---

## 1️⃣2️⃣ HMR & Fast Refresh

### Without HMR

* Page reload
* State lost

### With Fast Refresh

* Component update
* State preserved

---

## 1️⃣3️⃣ ESLint

Bug detect karta hai bina code run kiye.

```js
'no-unused-vars': 'warn',
'no-undef': 'error',
'eqeqeq': 'error'
```

---

## 1️⃣4️⃣ StrictMode

```jsx
import { StrictMode } from 'react'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
```

👉 Development me component **2 baar render** hota hai bugs pakadne ke liye.

---

## 1️⃣5️⃣ Final Folder Structure

```text
my-react-app/
 ├── node_modules/
 ├── src/
 │   ├── main.jsx
 │   ├── App.jsx
 │   └── App.css
 ├── index.html
 ├── package.json
 ├── vite.config.js
 ├── eslint.config.js
 └── .gitignore
```

---

## ✅ Final Takeaways

* npm = package manager
* Vite = fast dev server + bundler
* Plugin = extra power
* JSX → `.jsx` file
* Fast Refresh = state safe reload
* StrictMode = bug finder
* ESLint = code quality tool



