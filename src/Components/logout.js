// import React from 'react';
// import axios from 'axios';
// // import { AuthContext } from '../context/authContext';

// const Logout = () => {
//   // const { logout } = useContext(AuthContext);

//   const handleLogout = async () => {

//     try {

//       // Assuming you have a way to get the user's token, e.g., from local storage

//       const token = JSON.parse(localStorage.getItem('user'))?.token;



//       await axios.post('http://localhost:2001/api/users/logout', {}, {

//         headers: {

//           Authorization: `Bearer ${token}`,

//         },

//       });



//       // Clear user data from local storage and update state

//       localStorage.removeItem('user');

//       window.location.reload(); // Optional: reload the page or redirect to login page

//     } catch (error) {

//       console.error('Logout error:', error);

//     }

//   };



//   return <button onClick={handleLogout}>Logout</button>;
// };

// export default Logout;
