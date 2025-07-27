import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Welcome from './pages/welcome'
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Notes from './pages/Notes';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Welcome/>}/>
          <Route path='/login' element ={<Login/>}/>
          <Route path='/dashboard'element={<Dashboard/>}/>
          <Route path='/Notes'element={<Notes/>}/>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
