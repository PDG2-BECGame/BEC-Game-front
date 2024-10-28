import React from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';  // Ruta de Home
import Login from './pages/Auth/Login';  // Ruta de Login
import './App.css';

function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 p-4">
          <Routes>
            {/* Ruta principal asignada a Home */}
            <Route path="/" element={<Home />} />
            {/* Ruta secundaria para el Login */}
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;