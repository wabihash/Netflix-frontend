import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home.jsx'
import TVShows from './pages/TVShows/TVShows.jsx'
import Movies from './pages/Movies/Movies.jsx'
import Latest from './pages/Latest/Latest.jsx'
import MyList from './pages/MyList/MyList.jsx'
import Search from './pages/Search/Search.jsx'
import Login from './pages/Login/Login.jsx'
import Register from './pages/Login/Register.jsx'
import Layout from './pages/Layout/Layout.jsx'
import About from './pages/About/About.jsx'
import Landing from './pages/Landing/Landing.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import ComingSoon from './components/ComingSoon/ComingSoon.jsx'

function App() {
  return (
    <Router>
      <div className='App'>
        <div style={{
          backgroundColor: 'rgba(229, 9, 20, 0.9)',
          color: 'white',
          textAlign: 'center',
          padding: '12px',
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          fontWeight: 'bold',
          fontSize: '14px',
          backdropFilter: 'blur(5px)'
        }}>
          🚨 EDUCATIONAL PORTFOLIO PROJECT. This is NOT Netflix. Please do not enter real credentials. 🚨
        </div>
        <Routes>
          {/* Public Landing Page */}
          <Route path="/" element={<Landing />} />
          
          {/* Protected Main Website Wrapper */}
          <Route element={<ProtectedRoute />}>
            <Route path="/browse" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="tv-shows" element={<TVShows />} />
              <Route path="movies" element={<Movies />} />
              <Route path="latest" element={<Latest />} />
              <Route path="my-list" element={<MyList />} />
              <Route path="search" element={<Search />} />
              <Route path="about" element={<About />} />
              <Route path="coming-soon" element={<ComingSoon />} />
            </Route>
          </Route>
          
          {/* Auth Pages (Public Access) */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
