import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import InternalControlForm from './InternalControlForm'
import AssessmentTable from './assessmentItems.jsx'
import Navbar from './Navbar.jsx'
import RiskNotificationPage from './RiskNotificationPage.jsx'
import LayputNavbar from '../src/router/layputNavbar.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LayputNavbar />
    {/* <App/> */}
  </StrictMode>,
)
