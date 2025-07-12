import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from "./context/AuthContext.jsx";
import { OpenProvider } from './context/OpenContext'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <OpenProvider>
        <App/>
      </OpenProvider>
    </AuthProvider>
  </StrictMode>,
)
