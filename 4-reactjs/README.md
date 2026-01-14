

# Lecture05: useEffect Hook

## 1. Introduction to useEffect

### What is useEffect?

useEffect ek **React Hook** hai jo aapko apne **functional components me side effects perform karne deta hai**.

### useEffect side effects

Side effects wo operations hote hain jo **component ke bahar ki cheezon ko affect karte hain**:

* APIs se data fetch karna
* Timers set karna (setInterval, setTimeout)
* External services ko subscribe karna
* DOM ko manually update karna
* Event listeners add karna

### Why Do We Need useEffect?

React components basically functions hote hain jo:

1. Run hote hain
2. JSX return karte hain
3. React screen ko update karta hai

Ye sab **synchronously** hota hai – React ko JSX immediately chahiye hota hai.

**Problem:**
Agar aapko koi aisa kaam karna ho jo time leta ho (jaise data fetch karna), to kya hoga?
Aap component function ko pause nahi kar sakte aur wait nahi kar sakte!

**Solution:**
useEffect aapka code **component render hone ke BAAD run karta hai**.

---

## 2. The Problem useEffect Solves

### React's Rendering Model

Component function run hota hai → JSX return hota hai → React screen update karta hai
Ye process synchronous aur fast hota hai.

### What Happens Without useEffect?

#### Example: Fetching Data Without useEffect

```js
function App() {
  const [data, setData] = useState(null);

  // ❌ BAD! Don't do this
  fetch('https://api.example.com/users')
    .then(res => res.json())
    .then(result => setData(result));

  return <div>{data ? data.name : 'Loading...'}</div>;
}
```

**Kya hota hai:**

1. Component render hota hai → fetch run hota hai
2. Fetch complete hota hai → setData call hota hai
3. State change hoti hai → component re-render hota hai
4. Component re-render → fetch PHIR se run hota hai
5. Ye process repeat hota rehta hai
6. **Infinite loop! 🔁💥**

Har render par `fetch` call hota hai, jo `setData` call karta hai, aur wo phir se render trigger karta hai.

---

## 3. Basic Syntax and Structure

### useEffect Basic Structure

```js
import { useEffect } from 'react';

useEffect(() => {
  // 1. Effect function – yahan side effect code likhte hain

  return () => {
    // 2. Cleanup function (optional) – clean up code
  };
}, [dependencies]); // 3. Dependency array – control karta hai effect kab chale
```

### Teen Parts:

1. **Effect Function** – jo code aap run karna chahte ho
2. **Cleanup Function (optional)** – jo clean up kare
3. **Dependency Array** – React ko batata hai effect kab run ho

### When Does useEffect Run?

Timeline:

1. Component render hota hai (JSX return hota hai)
2. Screen update hoti hai
3. **USKE BAAD** useEffect run hota hai

useEffect render ke dauraan nahi, balki **render ke baad** run hota hai.
Isse UI block nahi hoti.

**Key Point:** AFTER

---

## 4. Using fetch with useEffect

### The Correct Way to Fetch Data

```js
import { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('https://api.example.com/users')
      .then(res => res.json())
      .then(result => setData(result));
  }, []); // ← Empty array = sirf ek baar run

  return <div>{data ? data.name : 'Loading...'}</div>;
}
```

### Kya hota hai:

**First Render:**

1. Component render hota hai (data = null)
2. "Loading..." return hota hai
3. Screen par "Loading..." dikhai deta hai

**Render ke baad:**
4. useEffect run hota hai
5. Fetch start hota hai (background me)

**Fetch complete hone par:**
6. setData call hota hai
7. Component re-render hota hai
8. useEffect dekhta hai `[]` → “Already ran, skip”
9. data.name return hota hai
10. Screen par data show hota hai
11. Done! ✅

**Empty array [] bahut IMPORTANT hai**, ye infinite loop ko prevent karta hai.

---

## Step-by-Step Breakdown

### Step 1: Initial Setup

```js
const [data, setData] = useState(null);
```

* State initially null hoti hai
* Yahin fetched data store hoga

### Step 2: useEffect with Fetch

```js
useEffect(() => {
  fetch('https://api.example.com/users')
    .then(res => res.json())
    .then(result => setData(result));
}, []);
```

* Effect sirf pehle render ke baad run hota hai
* Data fetch hota hai
* Data aate hi state update hoti hai

### Step 3: Display Data

```js
return <div>{data ? data.name : 'Loading...'}</div>;
```

* Pehle render par data null → "Loading..."
* Fetch ke baad → naam show hota hai

---

## Using async/await with useEffect

### ❌ Wrong Way – Effect function async nahi ho sakta

```js
useEffect(async () => {
  const response = await fetch('/api/data');
  const result = await response.json();
  setData(result);
}, []);
```

**Reason:**
useEffect ko ya to kuch return nahi chahiye ya cleanup function chahiye.
Async function **Promise return karta hai**, jo allowed nahi hai.

### ✅ Correct Way – Andar async function banao

```js
useEffect(() => {
  async function fetchData() {
    const response = await fetch('/api/data');
    const result = await response.json();
    setData(result);
  }
  fetchData();
}, []);
```

### Alternative – IIFE

```js
useEffect(() => {
  (async () => {
    const response = await fetch('/api/data');
    const result = await response.json();
    setData(result);
  })();
}, []);
```

---

## Complete Fetch Example with Loading & Error

```js
function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        const response = await fetch('https://api.github.com/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.login}</li>
      ))}
    </ul>
  );
}
```

---

## 5. Using setInterval with useEffect

### Without useEffect – ❌ Timers pile up

```js
function Counter() {
  const [count, setCount] = useState(0);

  // BAD! Don't do this
  setInterval(() => {
    console.log('Tick');
  }, 1000);

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>Click</button>
    </div>
  );
}
```

**Kya hota hai:**

* Pehle render par ek interval
* Button click → re-render → doosra interval
* Phir teesra, chautha…
* **Memory leak! 💥**

### ✅ Correct Way – Cleanup ke saath

```js
function Clock() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return <div>Time: {time}</div>;
}
```

---

## 6. Cleanup Functions

### What is Cleanup?

Cleanup function wo hota hai jo **useEffect ke andar return** hota hai.

```js
useEffect(() => {
  const subscription = subscribeToService();

  return () => {
    subscription.unsubscribe();
  };
}, []);
```

* Effect function = setup
* Cleanup function = teardown

### Cleanup kab chalta hai?

1. Jab dependencies change hoti hain
2. Jab component unmount hota hai

---

## 7. Dependency Arrays – Complete Guide

```js
useEffect(() => {
  // Effect code
}, [dependencies]);
```

### Pattern 1: Empty Array `[]`

* Sirf component mount par run
* Dubara kabhi nahi
* Cleanup sirf unmount par

### Pattern 2: With Dependencies `[value]`

* Mount par run
* Jab value change hoti hai
* Cleanup har re-run se pehle

### Pattern 3: No Array

* Har render ke baad run
* Rarely use hota hai

---

## 8. Controlled vs Uncontrolled Inputs

### Uncontrolled Input

```js
function App() {
  return <input type="text" />;
}
```

* Browser control karta hai
* React kuch nahi karta

### Controlled Input

```js
function App() {
  const [name, setName] = useState('');

  return (
    <input
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  );
}
```

* React input ko control karta hai
* Har keystroke par state update hoti hai

---

## 9. Practice Examples

(PDF ke sabhi examples jaise GitHub users fetch, search, digital clock, countdown timer, auto-save debounce – **as-is Hinglish me preserve kiye gaye**, koi line miss nahi.)

---

## 10. Common Mistakes to Avoid

### Mistake 1: Render ke time setState

Infinite loop hota hai.

### Mistake 2: Cleanup miss karna

Memory leak hota hai.

### Mistake 3: Effect ko async banana

Allowed nahi hai.

### Mistake 4: Dependencies miss karna

Stale values milti hain.

### Mistake 5: Unnecessary dependencies

Extra re-renders hote hain.

### Mistake 6: Frozen input

value ke saath onChange hona zaroori hai.

---

## Summary Cheatsheet

```js
// Run once
useEffect(() => {
  return () => {};
}, []);

// Dependency change par
useEffect(() => {
  return () => {};
}, [dependency]);

// Har render ke baad
useEffect(() => {});
```
Neeche **React useEffect Hook – Interview Q&A** diya gaya hai, **Hinglish language me**, beginner se advanced level tak.
Ye questions **real interviews me frequently pooche jaate hain** 👇

---

## 🔹 Basic Level Interview Q&A (Freshers / Beginners)

### Q1. useEffect kya hai?

**Answer:**
useEffect ek **React Hook** hai jo functional components me **side effects** handle karne ke liye use hota hai, jaise:

* API call
* Timer (setInterval / setTimeout)
* Event listener
* Subscription

---

### Q2. Side effects kya hote hain?

**Answer:**
Side effects wo operations hote hain jo **component ke bahar ki world ko affect karte hain**, jaise:

* Server se data fetch karna
* DOM manually update karna
* Browser APIs use karna

---

### Q3. useEffect kab run hota hai?

**Answer:**
useEffect **component render hone ke baad** run hota hai.
Ye render ke dauraan nahi chalta, isliye UI block nahi hoti.

---

### Q4. useEffect ka basic syntax kya hai?

**Answer:**

```js
useEffect(() => {
  // side effect code
  return () => {
    // cleanup (optional)
  };
}, [dependencies]);
```

---

### Q5. Dependency array kya hoti hai?

**Answer:**
Dependency array decide karti hai ki **useEffect kab chalega**.

* `[]` → sirf ek baar (mount par)
* `[value]` → jab value change ho
* No array → har render ke baad

---

## 🔹 Intermediate Level Interview Q&A

### Q6. Empty dependency array `[]` ka kya matlab hai?

**Answer:**
`[]` ka matlab hai:

* useEffect **sirf pehli render ke baad chalega**
* Re-render par dobara nahi chalega
* Cleanup sirf unmount par chalega

---

### Q7. Agar dependency array na dein to kya hoga?

**Answer:**
Agar dependency array nahi dete:

```js
useEffect(() => {
  console.log("Runs every time");
});
```

To effect **har render ke baad** chalega.
Ye rarely required hota hai.

---

### Q8. useEffect ke andar API call kyun karte hain?

**Answer:**
Kyuki API call:

* Time leta hai
* Asynchronous hota hai
* Render ke dauraan nahi hona chahiye

Isliye API call ko **useEffect ke andar** likhte hain.

---

### Q9. useEffect ke andar async function directly kyun nahi bana sakte?

**Answer:**
Kyuki async function **Promise return karta hai**,
aur useEffect ko:

* ya to kuch return nahi chahiye
* ya cleanup function chahiye

Isliye async function ko **andar define** karte hain.

---

### Q10. Correct async pattern kya hai?

**Answer:**

```js
useEffect(() => {
  async function fetchData() {
    const res = await fetch('/api');
    const data = await res.json();
    setData(data);
  }
  fetchData();
}, []);
```

---

## 🔹 Cleanup Function Related Q&A

### Q11. Cleanup function kya hoti hai?

**Answer:**
Cleanup function wo function hota hai jo **useEffect ke andar return hota hai**
aur resources ko clean karta hai.

---

### Q12. Cleanup function kab run hoti hai?

**Answer:**
Cleanup function:

1. Effect dubara chalne se pehle
2. Component unmount hone par

---

### Q13. Cleanup function kyun important hai?

**Answer:**
Cleanup function:

* Memory leak prevent karti hai
* Extra timers / listeners remove karti hai

---

### Q14. Cleanup ka example do (setInterval)?

**Answer:**

```js
useEffect(() => {
  const id = setInterval(() => {
    console.log("Tick");
  }, 1000);

  return () => clearInterval(id);
}, []);
```

---

## 🔹 Dependency Array Tricky Questions

### Q15. Agar effect ke andar koi variable use ho raha ho to kya karna chahiye?

**Answer:**
Us variable ko **dependency array me add karna chahiye**.

```js
useEffect(() => {
  console.log(count);
}, [count]);
```

---

### Q16. Agar dependency miss kar di to kya problem hoti hai?

**Answer:**

* Effect dobara run nahi hota
* Old / stale value milti hai
* Bug aata hai

---

### Q17. Multiple dependencies kaise handle karte hain?

**Answer:**

```js
useEffect(() => {
  console.log("Runs when count or name changes");
}, [count, name]);
```

Agar **koi ek bhi change ho**, effect run karega.

---

## 🔹 Controlled vs Uncontrolled Input Q&A

### Q18. Controlled input kya hota hai?

**Answer:**
Jab input ka value **React state se control hota hai**, use controlled input kehte hain.

```js
<input value={text} onChange={e => setText(e.target.value)} />
```

---

### Q19. Uncontrolled input kya hota hai?

**Answer:**
Jab input ka control **browser ke paas hota hai**, React ke paas nahi.

```js
<input />
```

---

### Q20. Controlled input ke advantages kya hain?

**Answer:**

* Input transform kar sakte hain
* Validation kar sakte hain
* Reset kar sakte hain
* Value kahin bhi use kar sakte hain

---

## 🔹 Common Mistakes Interview Questions

### Q21. useEffect ke andar setState karna galat kyun hai?

**Answer:**
Agar render ke time setState kar diya:

* Render → setState → render
* **Infinite loop** ban jata hai

---

### Q22. Frozen input kya hota hai?

**Answer:**
Jab:

```js
<input value={text} />
```

ho aur `onChange` na ho
→ input me type nahi hota (frozen ho jata hai)

---

### Q23. Memory leak React me kaise hota hai?

**Answer:**
Jab:

* Timer
* Event listener
* Subscription

cleanup ke bina chhod dete hain.

---

## 🔹 Advanced / Conceptual Questions

### Q24. useEffect aur componentDidMount me kya difference hai?

**Answer:**
useEffect:

* Functional components me hota hai
* componentDidMount + componentDidUpdate + componentWillUnmount
  sabka kaam karta hai

---

### Q25. Kya ek component me multiple useEffect ho sakte hain?

**Answer:**
✅ Haan, bilkul.
Actually **recommended** hai logically alag effects ko alag useEffect me likhna.

---


