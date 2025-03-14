
import { UserContextProvider } from './context/UserContext.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import './styles/Global.scss'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
        <UserContextProvider>
            <App />
        </UserContextProvider>
  </StrictMode>,
)


