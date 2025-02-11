import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleSignOut = () => {
        setIsAuthenticated(false); 
    };

    return (
        <Router>
            <Routes>
                <Route path="/SimpleReact/signin" element={<SignIn setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/SimpleReact/home" element={isAuthenticated ? <Home onSignOut={handleSignOut} /> : <Navigate to="/signin" />} />
                <Route path="/SimpleReact/" element={<Navigate to="/signin" />} />
            </Routes>
        </Router>
    );
}

export default App;
