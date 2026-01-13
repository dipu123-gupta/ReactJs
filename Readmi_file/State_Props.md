# Props & State in React 

## 1. Props Concept (Props ki Samajh)

### Definition
**Props** (properties ka short form) wo read-only data hai jo parent components se child components ko pass hota hai. Yeh components ko reusable banane mein help karta hai.

### Key Points:
- **Sirf padhne wala**: Child components apne props ko modify nahi kar sakte
- **Ek taraf flow**: Data parent se child ki taraf flow hota hai
- **Koi bhi type ho sakta hai**: Strings, numbers, arrays, objects, functions

### Example:
```jsx
// Parent Component
function App() {
  const userName = "Rahul Sharma";
  const userAge = 28;
  
  return (
    <div>
      <UserProfile name={userName} age={userAge} />
    </div>
  );
}

// Child Component
function UserProfile(props) {
  return (
    <div>
      <h2>Name: {props.name}</h2>
      <p>Age: {props.age}</p>
    </div>
  );
}
```

## 2. Data Pass Karna Components ke Bech

### Parent se Child (Sabse Common)
```jsx
// Parent
function ProductList() {
  const products = [
    { id: 1, name: "Laptop", price: 50000 },
    { id: 2, name: "Phone", price: 20000 }
  ];
  
  return (
    <div>
      {products.map(product => (
        <ProductItem 
          key={product.id}
          name={product.name}
          price={product.price}
        />
      ))}
    </div>
  );
}

// Child
function ProductItem(props) {
  return (
    <div className="product">
      <h3>{props.name}</h3>
      <p>₹{props.price}</p>
    </div>
  );
}
```

### Functions ko Props ke Roop mein Pass Karna (Child se Parent Baat Cheet)
```jsx
function ParentComponent() {
  const handleChildClick = (message) => {
    console.log(`Child ne kaha: ${message}`);
  };
  
  return <ChildComponent onButtonClick={handleChildClick} />;
}

function ChildComponent(props) {
  const handleClick = () => {
    props.onButtonClick("Hello from Child!");
  };
  
  return <button onClick={handleClick}>Click Karo</button>;
}
```

## 3. Props Destructuring (Props ko Simple Banana)

### Definition
Function ke parameters mein directly specific props nikalna cleaner code ke liye.

### Example:
```jsx
// Destructuring ke bina
function UserCard(props) {
  return (
    <div>
      <h2>{props.name}</h2>
      <p>{props.email}</p>
      <p>{props.role}</p>
    </div>
  );
}

// Parameters mein destructuring ke saath
function UserCard({ name, email, role }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>{email}</p>
      <p>{role}</p>
    </div>
  );
}

// Function body mein destructuring
function UserCard(props) {
  const { name, email, role } = props;
  
  return (
    <div>
      <h2>{name}</h2>
      <p>{email}</p>
      <p>{role}</p>
    </div>
  );
}
```

## 4. Default Props (Default Values)

### Definition
Jab parent component props provide nahi karta, tab default values.

### Example:
```jsx
// Default parameters ka use
function WelcomeMessage({ username = "Guest", messageCount = 0 }) {
  return (
    <div>
      <h2>Welcome, {username}!</h2>
      <p>Aapke paas {messageCount} naye messages hain</p>
    </div>
  );
}

// Usage
<WelcomeMessage /> // Dikhayega: "Welcome, Guest! Aapke paas 0 naye messages hain"
<WelcomeMessage username="Alia" /> // Dikhayega: "Welcome, Alia! Aapke paas 0 naye messages hain"
```

## 5. State Concept (State ki Samajh)

### Definition
**State** wo data hai jo time ke saath change hota hai. Props ke opposite, state component ke andar manage hota hai aur update kiya ja sakta hai.

### Key Points:
- **Change kar sakte hain**: Setter functions ka use karke change kiya ja sakta hai
- **Component ke liye local**: Har component apna state manage karta hai
- **Re-render trigger karta hai**: State change karne par component phir se render hota hai

## 6. useState Hook (UseState ka Use)

### Definition
`useState` ek React Hook hai jo functional components mein state add karne deta hai.

### Syntax:
```javascript
const [stateVariable, setStateFunction] = useState(initialValue);
```

### Example:
```jsx
import React, { useState } from 'react';

function Counter() {
  // State variable 'count' declare karo initial value 0 ke saath
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Aapne {count} baar click kiya</p>
      <button onClick={() => setCount(count + 1)}>
        Mujhe Click Karo
      </button>
    </div>
  );
}

// Multiple state variables
function UserForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(0);
  
  return (
    <form>
      <input 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Naam"
      />
      <input 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input 
        type="number"
        value={age}
        onChange={(e) => setAge(Number(e.target.value))}
        placeholder="Age"
      />
    </form>
  );
}
```

## 7. State ko Sahi Tarike se Update Karna

### Common Galatiyan aur Solutions:

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  
  // ❌ Galat: Direct change karna
  const incrementWrong = () => {
    count = count + 1; // Yeh re-render trigger nahi karega
  };
  
  // ❌ Galat: Multiple updates current state ka use karke
  const incrementTwiceWrong = () => {
    setCount(count + 1);
    setCount(count + 1); // Dono same 'count' value ka use karte hain
  };
  
  // ✅ Sahi: Functional update jab state previous state par depend karti hai
  const incrementTwiceCorrect = () => {
    setCount(prevCount => prevCount + 1);
    setCount(prevCount => prevCount + 1); // Updated value ka use karta hai
  };
  
  // ✅ Sahi: Objects/arrays ke liye, naya reference banana
  const [user, setUser] = useState({ name: 'John', age: 25 });
  
  const updateAge = () => {
    // ❌ Galat: Direct change
    // user.age = 26;
    
    // ✅ Sahi: Naya object banana
    setUser(prevUser => ({
      ...prevUser,
      age: 26
    }));
  };
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={incrementTwiceCorrect}>
        Do Baar Badhao
      </button>
    </div>
  );
}
```

## 8. Lifting State Up (State ko Upar Leke Jana)

### Definition
State ko child component se uske parent component mein leke jana taki multiple children ke beech state share ki ja sake.

### Example:
```jsx
// Without lifting state (problem)
function TemperatureInput() {
  const [temperature, setTemperature] = useState('');
  
  return (
    <input 
      value={temperature}
      onChange={(e) => setTemperature(e.target.value)}
    />
  );
}

// Problem: Do inputs ek dusre ke saath sync nahi kar sakte

// With lifted state (solution)
function TemperatureConverter() {
  // State parent mein le gaye
  const [celsius, setCelsius] = useState('');
  
  const handleCelsiusChange = (value) => {
    setCelsius(value);
  };
  
  const fahrenheit = celsius !== '' ? (celsius * 9/5) + 32 : '';
  
  return (
    <div>
      <CelsiusInput 
        celsius={celsius}
        onCelsiusChange={handleCelsiusChange}
      />
      <FahrenheitDisplay fahrenheit={fahrenheit} />
    </div>
  );
}

function CelsiusInput({ celsius, onCelsiusChange }) {
  return (
    <input 
      value={celsius}
      onChange={(e) => onCelsiusChange(e.target.value)}
      placeholder="Celsius"
    />
  );
}

function FahrenheitDisplay({ fahrenheit }) {
  return <p>Fahrenheit: {fahrenheit}</p>;
}
```

## 9. One-Way Data Flow (Ek Taraf Data Flow)

### Definition
React mein data ek hi taraf flow karta hai: parent components se child components ki taraf props ke through.

### Visual:
```
Parent Component
    ↓ (props)
Child Component A
    ↓ (props)
Grandchild Component
    ↓ (props)
...aur aage
```

### Example:
```jsx
// Data neeche flow hota hai props ke through
function App() {
  const [theme, setTheme] = useState('light');
  
  return (
    <div className={`App ${theme}`}>
      <Header theme={theme} />
      <MainContent theme={theme} />
      <Footer theme={theme} />
    </div>
  );
}

function Header({ theme }) {
  return (
    <header className={theme}>
      <Navigation theme={theme} />
    </header>
  );
}

function Navigation({ theme }) {
  return <nav className={theme}>Menu</nav>;
}

function MainContent({ theme }) {
  return <main className={theme}>Content</main>;
}

function Footer({ theme }) {
  return <footer className={theme}>Footer</footer>;
}
```

## Complete Example: Todo App Jo Props & State Dono Use Karti Hai

```jsx
import React, { useState } from 'react';

function TodoApp() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'React Seekho', completed: true },
    { id: 2, text: 'Project Banao', completed: false },
    { id: 3, text: 'App Deploy Karo', completed: false }
  ]);
  
  const [newTodo, setNewTodo] = useState('');
  
  const addTodo = () => {
    if (newTodo.trim() === '') return;
    
    const newTodoItem = {
      id: Date.now(),
      text: newTodo,
      completed: false
    };
    
    setTodos(prevTodos => [...prevTodos, newTodoItem]);
    setNewTodo('');
  };
  
  const toggleTodo = (id) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  
  const deleteTodo = (id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };
  
  return (
    <div className="todo-app">
      <h1>Todo List</h1>
      
      <TodoInput 
        newTodo={newTodo}
        setNewTodo={setNewTodo}
        addTodo={addTodo}
      />
      
      <TodoList 
        todos={todos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
      />
      
      <TodoStats todos={todos} />
    </div>
  );
}

function TodoInput({ newTodo, setNewTodo, addTodo }) {
  return (
    <div className="todo-input">
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Naya todo add karo"
        onKeyPress={(e) => e.key === 'Enter' && addTodo()}
      />
      <button onClick={addTodo}>Add</button>
    </div>
  );
}

function TodoList({ todos, toggleTodo, deleteTodo }) {
  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </ul>
  );
}

function TodoItem({ todo, toggleTodo, deleteTodo }) {
  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
      />
      <span>{todo.text}</span>
      <button onClick={() => deleteTodo(todo.id)}>Delete</button>
    </li>
  );
}

function TodoStats({ todos }) {
  const total = todos.length;
  const completed = todos.filter(todo => todo.completed).length;
  const pending = total - completed;
  
  return (
    <div className="todo-stats">
      <p>Total: {total}</p>
      <p>Completed: {completed}</p>
      <p>Pending: {pending}</p>
    </div>
  );
}

export default TodoApp;
```

## Key Differences Summary

| Aspect | Props | State |
|--------|-------|-------|
| **Change kar sakte hain** | Nahi (sirf padh sakte hain) | Haan (setter functions ke through) |
| **Kaun control karta hai** | Parent component | Component khud |
| **Purpose** | Parent se child ko data dena | Component ka internal data manage karna |
| **Updates** | Parent component control karta hai | Component khud control karta hai |
| **Initial Value** | Parent set karta hai | Component ke andar `useState` se |

## Best Practices (Achchi Practices)

1. **State ko jitna niche ho sake rakho** component tree mein
2. **State ko upar le jao** jab multiple components ko same state chahiye
3. **Functional updates use karo** jab naya state previous state par depend karta hai
4. **Kabhi bhi directly state ko change mat karo** - hamesha setter functions use karo
5. **Props minimal rakho** - sirf wahi pass karo jo child component ko chahiye
6. **TypeScript ya PropTypes use karo** prop type validation ke liye

## Real-World Example: Shopping Cart

```jsx
function ShoppingApp() {
  const [cart, setCart] = useState([]);
  const [products] = useState([
    { id: 1, name: 'Shirt', price: 599 },
    { id: 2, name: 'Jeans', price: 1299 },
    { id: 3, name: 'Shoes', price: 1999 }
  ]);
  
  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };
  
  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };
  
  const totalAmount = cart.reduce(
    (sum, item) => sum + (item.price * item.quantity), 
    0
  );
  
  return (
    <div className="shopping-app">
      <h1>Shopping Store</h1>
      
      <ProductList 
        products={products}
        addToCart={addToCart}
      />
      
      <ShoppingCart 
        cart={cart}
        removeFromCart={removeFromCart}
        totalAmount={totalAmount}
      />
    </div>
  );
}

function ProductList({ products, addToCart }) {
  return (
    <div className="product-list">
      <h2>Products</h2>
      {products.map(product => (
        <div key={product.id} className="product-card">
          <h3>{product.name}</h3>
          <p>Price: ₹{product.price}</p>
          <button onClick={() => addToCart(product)}>
            Cart Mein Add Karo
          </button>
        </div>
      ))}
    </div>
  );
}

function ShoppingCart({ cart, removeFromCart, totalAmount }) {
  return (
    <div className="shopping-cart">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Cart khali hai</p>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <span>{item.name} (x{item.quantity})</span>
              <span>₹{item.price * item.quantity}</span>
              <button onClick={() => removeFromCart(item.id)}>
                Remove
              </button>
            </div>
          ))}
          <div className="cart-total">
            <strong>Total: ₹{totalAmount}</strong>
          </div>
        </>
      )}
    </div>
  );
}
```

Is example mein:
- **Props**: `products`, `addToCart`, `cart`, `removeFromCart`, `totalAmount`
- **State**: `cart` (ShoppingApp mein), `products` (initial data)
- **Data Flow**: Parent (ShoppingApp) se children (ProductList, ShoppingCart) tak
- **State Update**: `addToCart` aur `removeFromCart` functions state ko update karte hain