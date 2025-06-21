import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './pages/welcome'
import Login from './pages/Login';
import Dashboard from './pages/dashboard';
import Notes from './pages/Notes';
function App() {
  return (
   <Router>
  <Routes>
    <Route path='/' element={<Welcome/>}/>
    <Route path='/login' element ={<Login/>}/>
    <Route path='/dashboard'element={<Dashboard/>}/>
        <Route path='/Notes'element={<Notes/>}/>
  </Routes>
   </Router>
  );
}

export default App;
