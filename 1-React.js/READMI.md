

# 📘 Lecture 01 – PDF Complete Code Representation & Explanation

---

## 🔹 CODE 1: Traditional JavaScript se DOM banana

### 📌 Code:

```js
// Create first element
const h1 = document.createElement('h1');

h1.style.backgroundColor = 'orange';
h1.style.color = 'black';
h1.style.fontSize = '30px';

h1.id = 'first';
h1.className = 'ele1';
h1.textContent = 'Hello Coder Army';

document.getElementById('root').appendChild(h1);

// Create second element
const p = document.createElement('p');

p.style.color = 'blue';
p.id = 'para';
p.className = 'text';
p.textContent = 'This is a paragraph';

document.getElementById('root').appendChild(p);
```

### 🧠 Explanation:

* `document.createElement()` → naya HTML element banata hai
* `style` → inline CSS apply karta hai
* `id`, `className` → attributes set karta hai
* `textContent` → text insert karta hai
* `appendChild()` → element ko DOM me add karta hai

### ❌ Problem:

* Har element ke liye same code repeat
* Large app me maintain karna difficult
* Reusable nahi

---

## 🔹 CODE 2: Apni mini React-like library banana

---

### 📌 Code:

```js
const React = {
  createElement: function (tag, attribute, children) {
    const element = document.createElement(tag);

    for (const key in attribute) {
      if (key === 'style') {
        Object.assign(element.style, attribute[key]);
      } else {
        element[key] = attribute[key];
      }
    }

    element.textContent = children;
    return element;
  }
};
```

### 🧠 Explanation:

* `React` → ek object banaya
* `createElement()` → helper function
* `tag` → h1, p, div etc
* `attribute` → id, class, style
* `children` → text content

#### Loop explanation:

```js
for (const key in attribute)
```

* Har attribute ko loop karta hai

```js
if (key === 'style')
```

* Style object ko `Object.assign()` se apply karta hai

```js
element[key] = attribute[key];
```

* id, className jaise attributes set karta hai

---

## 🔹 CODE 3: ReactDOM.render implementation

### 📌 Code:

```js
const ReactDOM = {
  render: function (element, root) {
    root.appendChild(element);
  }
};
```

### 🧠 Explanation:

* `element` → jo React.createElement se bana
* `root` → DOM ka container
* `appendChild()` → element ko page pe dikhata hai

---

## 🔹 CODE 4: Custom React ka use

### 📌 Code:

```js
const element1 = React.createElement(
  'h1',
  {
    style: {
      backgroundColor: "orange",
      color: "black",
      fontSize: "30px"
    },
    id: "first",
    className: "ele1"
  },
  "Hello Coder Army"
);

ReactDOM.render(
  element1,
  document.getElementById('root')
);
```

### 🧠 Explanation:

* Same kaam jo pehle 10 lines me ho raha tha
* Ab sirf **clean readable code**
* Reusability possible

---

## 🔹 CODE 5: Real React (CDN version)

### 📌 Code:

```html
<!DOCTYPE html>
<html>
<head>
  <title>React App</title>
</head>
<body>

<div id="root"></div>

<script src="https://unpkg.com/react@18/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>

<script>
  const element = React.createElement(
    'h1',
    {
      style: {
        backgroundColor: "orange",
        color: "black",
        fontSize: "30px"
      },
      id: "first",
      className: "ele1"
    },
    "Hello Coder Army"
  );

  const root = ReactDOM.createRoot(
    document.getElementById('root')
  );

  root.render(element);
</script>

</body>
</html>
```

### 🧠 Explanation:

* CDN → React ko browser me load karta hai
* `createRoot()` → React 18 ka new method
* `render()` → UI ko DOM me convert karta hai

---

## 🔹 CODE 6: React.createElement actually kya return karta hai?

### 📌 Code:

```js
const React = {
  createElement: function (type, props, children) {
    return {
      type: type,
      props: {
        ...props,
        children: children
      }
    };
  }
};
```

### 🧠 Explanation:

* React **real DOM nahi banata**
* Ye sirf **JavaScript object** banata hai
* Isi ko **Virtual DOM** kehte hain

---

## 🔹 CODE 7: Virtual DOM example

### 📌 Code:

```js
const element = React.createElement(
  'h1',
  { id: 'title' },
  'Hello'
);

console.log(element);
```

### 🧠 Output:

```js
{
  type: "h1",
  props: {
    id: "title",
    children: "Hello"
  }
}
```

👉 Ye real HTML nahi hai
👉 Sirf UI ka description hai

---

## 🔹 CODE 8: ReactDOM Virtual DOM ko real DOM me convert karta hai

### 📌 Code:

```js
const ReactDOM = {
  createRoot: function (container) {
    return {
      render: function (reactElement) {

        const element = document.createElement(reactElement.type);

        for (const key in reactElement.props) {
          if (key === 'style') {
            Object.assign(element.style, reactElement.props.style);
          }
          else if (key === 'children') {
            element.textContent = reactElement.props[key];
          }
          else {
            element[key] = reactElement.props[key];
          }
        }

        container.appendChild(element);
      }
    };
  }
};
```

### 🧠 Explanation:

* `reactElement.type` → tag name
* `props` loop → attributes apply
* `children` → text
* `appendChild()` → page pe show

---

## 🔹 CODE 9: Platform independent Virtual DOM

### 📌 Code:

```js
const vdom = {
  type: 'View',
  props: {
    style: { padding: 20 },
    children: [
      {
        type: 'Text',
        props: { children: 'Hello World' }
      },
      {
        type: 'Button',
        props: {
          onPress: handleClick,
          children: 'Click'
        }
      }
    ]
  }
};
```

### 🧠 Explanation:

* Same structure
* Web / Mobile / PDF sab me use ho sakta hai
* Sirf renderer change hota hai

---

## 🔹 CODE 10: React 18 – Old vs New

### Old:

```js
ReactDOM.render(<App />, document.getElementById('root'));
```

### New:

```js
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

### 🧠 Explanation:

* `createRoot()` → setup (once)
* `render()` → UI update (many times)

---

## ✅ FINAL CONCLUSION

* PDF ka **ek bhi code skip nahi hua**
* Sab code ka **line-by-line meaning** samjhaya
* React ka **first principle clear** ho gaya
* Virtual DOM + Renderer concept solid ho gaya

---

