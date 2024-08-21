// import React, { useState } from 'react';
// import axios from 'axios';

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const login = async (username, password) => {

//     try {

//       const { data } = await axios.post('http://localhost:2001/users/login', {
//         username,
//         password,
//       });

//       // Save user data to local storage and update state

//       localStorage.setItem('user', JSON.stringify(data));

//       // Optionally, redirect the user or update application state

//       window.location.href = '/'; // Redirect to home page or another page

//     } catch (error) {

//       console.error('Login error:', error.response?.data?.message || error.message);

//     }

//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     login(username, password);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         placeholder="Username"
//       />
//       <input
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="Password"
//       />
//       <button type="submit">Login</button>
//     </form>
//   );
// };

// export default Login;
