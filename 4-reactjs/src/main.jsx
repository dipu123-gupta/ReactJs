import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
// import Clock from './Clock.jsx'
import UserList from './App.jsx'

createRoot(document.getElementById('root')).render(
    <UserList/>
)
