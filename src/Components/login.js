
import { useFormik } from "formik";
import * as Yup from 'yup';
import {useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import axios from 'axios';
import './login.css';

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

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
                        navigate('/');
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
                    <div className="form-group">
                    <label htmlFor="username">User Name: </label>
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
                        {/* <label htmlFor="username">User Name</label> */}
                        {formik.touched.username && formik.errors.username && (
                            <div className='text-danger'>{formik.errors.username}</div>
                        )}
                    </div>
                    <div className="form-group">
                    <label htmlFor="floatingPassword">Password: </label>
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
                        {/* <label htmlFor="floatingPassword">Password</label> */}
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
// import { useNavigate } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../context/authContext";
// import axios from 'axios';
// import './login.css';

// const Login = () => {
//     const { login } = useContext(AuthContext);
//     const navigate = useNavigate();

//     const formik = useFormik({
//         enableReinitialize: true,
//         initialValues: {
//             username: '',
//             password: '',
//             role: 'user'
//         },
//         validationSchema: Yup.object({
//             username: Yup.string().required('Username is required'),
//             password: Yup.string().required('Password is required'),
//         }),
//         onSubmit: (values, { setSubmitting, setStatus }) => {
//             axios.post('http://localhost:2001/users/login', values)
//                 .then(response => {
//                     if (!response.data) {
//                         alert("Enter valid credentials");
//                     } else {
//                         setStatus('success');
//                         login(response.data); // Ensure this handles setting auth state
//                         alert("User Logged in Successfully");
//                         navigate('/');
//                     }
//                 })
//                 .catch(error => {
//                     setStatus("error");
//                     alert("An error occurred");
//                 })
//                 .finally(() => {
//                     setSubmitting(false); // Reset submitting state
//                 });
//         }
//     });

//     return (
//         <div className="container" style={{ marginTop: 100 }}>
//             <main className="form-signin w-50 m-auto">
//                 <form onSubmit={formik.handleSubmit}>
//                     <h1 className="h3 mb-3 fw-normal">Sign in</h1>
                    
//                     {/* Username Field */}
//                     <div className="form-group">
//                         <label htmlFor="username">Username:</label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             id="username"
//                             name="username"
//                             onChange={formik.handleChange}
//                             onBlur={formik.handleBlur}
//                             value={formik.values.username}
//                         />
//                         {formik.touched.username && formik.errors.username && (
//                             <div className='text-danger'>{formik.errors.username}</div>
//                         )}
//                     </div>
                    
//                     {/* Password Field */}
//                     <div className="form-group" style={{ marginTop: 20 }}>
//                         <label htmlFor="password">Password:</label>
//                         <input
//                             type="password"
//                             className="form-control"
//                             id="password"
//                             name="password"
//                             onChange={formik.handleChange}
//                             onBlur={formik.handleBlur}
//                             value={formik.values.password}
//                         />
//                         {formik.touched.password && formik.errors.password && (
//                             <div className='text-danger'>{formik.errors.password}</div>
//                         )}
//                     </div>
                    
//                     <button
//                         className="btn btn-primary w-100 py-2"
//                         type="submit"
//                         disabled={formik.isSubmitting}
//                         style={{ marginTop: 50 }}
//                     >
//                         Sign in
//                     </button>
//                     {formik.status === 'success' && (
//                         <div className="alert alert-success mt-3">Login successful!</div>
//                     )}
//                     {formik.status === 'error' && (
//                         <div className="alert alert-danger mt-3">Invalid Credentials</div>
//                     )}
//                 </form>
//             </main>
//         </div>
//     );
// }

// export default Login;



