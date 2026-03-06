import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Usuarios from './Usuarios.jsx'
import Accenture from './Accenture.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Accenture />
  </StrictMode>,
)
