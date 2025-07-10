import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import MusicPlayer from './components/MusicPlayer'
import Home from './pages/Home'
import Journey from './pages/Journey'
import Events from './pages/Events'
import Memories from './pages/Memories'
import Blessings from './pages/Blessings'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-cream">
        <Navbar />
        <MusicPlayer />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/journey" element={<Journey />} /> */}
          <Route path="/events" element={<Events />} />
          <Route path="/memories" element={<Memories />} />
          <Route path="/blessings" element={<Blessings />} />
        </Routes>
        {/* <Footer /> */}
      </div>
    </Router>
  )
}

export default App