import React from 'react';
import { AuthProvider } from './context/authContext';
//import Login from './Components/login';
import Register from './Components/register';
//import Logout from './Components/logout';

const App = () => {
  return (
    <AuthProvider>
      <div>
        <h1>Welcome to Login/Registration Page</h1>
        
        <Register />
        {/* <Login />
        <Logout /> */}
      </div>
    </AuthProvider>
  );
};

export default App;


