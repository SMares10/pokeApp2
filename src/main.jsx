import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router' //added line per react router docs_DECLARATIVE MODE
import About from './pages/about.jsx'
import ContactUs from './pages/contact.jsx'
import Pokemon from './components/pokemon.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <h1>You are still in the application</h1>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/about' element={<About />} /> 
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
