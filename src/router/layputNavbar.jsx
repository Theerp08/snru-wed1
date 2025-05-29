import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from '..//Navbar.jsx'
import HomePage from '../HomePage.jsx'
import AssessmentTable from '../assessmentItems.jsx';
import InternalControlForm from '../InternalControlForm.jsx'
import ControlEnvironmentForm from '../components/ControlEnvironmentForm.jsx';

const LayputNavbar = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path='/assessmentTable' element={<AssessmentTable/>} />
                <Route path='/internalControlForm' element={<InternalControlForm/>} />
                <Route path='/controlEnvironmentForm' element={<ControlEnvironmentForm/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default LayputNavbar