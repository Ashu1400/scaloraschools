import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import JoinEcosystem from './pages/JoinEcosystem'
import Legal from './pages/Legal'
import LoadingScreen from './components/LoadingScreen'
import './index.css'

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // 2.5 seconds loading screen

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <LoadingScreen isLoading={isLoading} />
      <div style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.8s ease-in' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/join" element={<JoinEcosystem />} />
          <Route path="/legal" element={<Legal />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
