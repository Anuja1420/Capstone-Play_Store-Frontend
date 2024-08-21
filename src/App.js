import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import Login from './Components/login';
import Register from './Components/register';
import Menu from './Components/menu';
//import Logout from './Components/logout';

const App = () => {
  return (
    <AuthProvider>
      <Router>
      <div>
        <Menu/>
        <h1>Welcome to Login/Registration Page</h1>
        
        <Routes>

            <Route path="/register" element={<Register />} />

            <Route path="/login" element={<Login />} />

            {/* Define other routes here */}

          </Routes>
      </div>
      </Router>
    </AuthProvider>
  );
};

export default App;


