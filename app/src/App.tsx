import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard.tsx'
import Login from './pages/Login.tsx'
import './index.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default App