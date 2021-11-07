import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import React, { useContext } from 'react'
import AuthContext from './context/userContext.jsx'


import './App.css';
import Login from './auth/Login';
import SignUp from './auth/SignUp';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import  Dashboard from './pages/Dashboard'

function App() {
  const {loggedIn} = useContext(AuthContext)
  return (
    <Router>
    
    <div className="App">
      <Navbar/>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        {!loggedIn ? (
          <>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/login' element={<Login/>}/>
          </>
        ): (
        
        <Route path='/dashboard' element={<Dashboard/>}/>

        )}
      </Routes>
      
    </div>
    </Router>
  );
}

export default App;
