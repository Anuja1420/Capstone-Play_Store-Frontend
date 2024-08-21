import { useFormik } from "formik";
import * as Yup from 'yup';
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import axios from 'axios';

const Login = () => {
    const { login } = useContext(AuthContext);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            username: '',
            password: '',
            role: 'user'
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Username is required'),
            password: Yup.string().required('Password is required'),
        }),
        onSubmit: (values, { setSubmitting, setStatus }) => {
            axios.post('http://localhost:2001/users/login', values)
                .then(response => {
                    if (!response.data) {
                        alert("Enter valid credentials");
                    } else {
                        setStatus('success');
                        login(response.data); // Ensure this handles setting auth state
                        alert("User Logged in Successfully");
                    }
                })
                .catch(error => {
                    setStatus("error");
                    alert("An error occurred");
                })
                .finally(() => {
                    setSubmitting(false); // Reset submitting state
                });
        }
    });

    return (
        <div className="container" style={{ marginTop: 100 }}>
            <main className="form-signin w-50 m-auto">
                <form onSubmit={formik.handleSubmit}>
                    <h1 className="h3 mb-3 fw-normal">Sign in</h1>
                    <div className="form-floating">
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            name="username"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.username}
                            placeholder="User Name"
                        />
                        <label htmlFor="username">User Name</label>
                        {formik.touched.username && formik.errors.username && (
                            <div className='text-danger'>{formik.errors.username}</div>
                        )}
                    </div>
                    <div className="form-floating">
                        <input
                            type="password"
                            className="form-control"
                            id="floatingPassword"
                            name="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            placeholder="Password"
                        />
                        <label htmlFor="floatingPassword">Password</label>
                        {formik.touched.password && formik.errors.password && (
                            <div className='text-danger'>{formik.errors.password}</div>
                        )}
                    </div>
                    <button
                        className="btn btn-primary w-100 py-2"
                        type="submit"
                        disabled={formik.isSubmitting}
                        style={{ marginTop: 50 }}
                    >
                        Sign in
                    </button>
                    {formik.status === 'success' && (
                        <div className="alert alert-success mt-3">Login successful!</div>
                    )}
                    {formik.status === 'error' && (
                        <div className="alert alert-danger mt-3">Invalid Credentials</div>
                    )}
                </form>
            </main>
        </div>
    );
}

export default Login;



// import { useFormik } from "formik";
// import * as Yup from 'yup';
// import { authContext } from "./context/authContext";
// import axios from 'axios';
// // import { useNavigate } from "react-router-dom";
// import { useContext } from "react";

// const Login=()=>{

//     //const navigate=useNavigate();
//     const{login} = useContext(authContext);

//     const formik=useFormik({
//         enableReinitialize:true,
//         initialValues:{
//             username:'',
//             password:'',
//             role:'user'
//         },
//         validationSchema:Yup.object({
//             username:Yup.string().required('Username is required'),
//             password:Yup.string().required('Password is required'),
//         }),
      
//         onSubmit: (values, { setSubmitting, setStatus}) => {
//             axios.post('http://localhost:2001/users/login', values)
//                 .then(response => {
//                     if (!response.data) {
//                         alert("Enter valid credentials")
//                     }
//                     else {
//                         setStatus('success');
//                         login(response.data);
//                         alert("Loggedin successfully")
//                         // navigate('/');
//                     }
//                 })
//                 .catch(error => {
//                     setStatus("error", error);
//                     alert("An error occurred"); // Show error alert
//                 })
//                 .finally(() => {
//                     setSubmitting(true);
//                 })
//         }

//     });

//     return(
//         <div className="container" style={{"marginTop":100}}>
//             <main class="form-signin w-50 m-auto">
//                 <form onSubmit={formik.handleSubmit}>
//                 {/* <img class="mb-4" src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"/> */}
//                 <h1 class="h3 mb-3 fw-normal">Sign in</h1>
            
//                 <div class="form-floating">
//                 <input type="text" class="form-control" id="username" name="username" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.username} placeholder="User Name"/>
//                 <label for="username">User Name</label>
//                 {
//                     formik.touched.username && formik.errors.username ? (<div className='text-danger'>{formik.errors.username}</div>): null
//                 }
//                 </div>
            
//                 <div class="form-floating">
//                 <input type="password" class="form-control" id="floatingPassword" name="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} placeholder="Password"/>
//                 <label for="floatingPassword">Password</label>
//                 {
//                     formik.touched.password && formik.errors.password ? (<div className='text-danger'>{formik.errors.password}</div>): null
//                 }
//                 </div>
            
//                 <button class="btn btn-primary w-100 py-2" type="submit" disabled={formik.isSubmitted} style={{"marginTop":50}}>Sign in</button>
//                 {formik.status === 'success' && <div className="alert alert-success mt-3">Login successful!</div>}
//                 {formik.status === 'error' && <div className="alert alert-danger mt-3">Invalid Credentials</div>}
//                 </form>
//             </main>
//         </div>
//     )
// }

// export default Login;


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
