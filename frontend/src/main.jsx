import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import AppWrapper from './components/AppWrapper'
import './index.css'
import { AuthProvider } from "./components/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider> {/* Envuelve tu aplicación con AuthProvider */}
      <AppWrapper />
    </AuthProvider>
)
