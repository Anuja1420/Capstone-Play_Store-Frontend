import { useFormik } from "formik";
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; //For navigation

const Register = () => {
    const navigate = useNavigate(); // Initialize useNavigate hook

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            username: '',
            password: '',
            role: ''
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Username is required'),
            password: Yup.string().required('Password is required'),
            role: Yup.string().required('Role is required'),
        }),
        onSubmit: async (values, { setSubmitting, resetForm, setStatus }) => {
            try {
                await axios.post('http://localhost:2001/users/register', values);
                setStatus('success');
                resetForm();
                alert("Registered Successfully.");
                navigate('/login'); // Navigate to the login page
            } catch (error) {
                setStatus("error");
                console.error('Registration error:', error.response?.data?.message || error.message);
                alert(`Registration failed: ${error.response?.data?.message || 'An unknown error occurred'}`);
            } finally {
                setSubmitting(false);
            }
        }
    });

    return (
        <div className="container" style={{ marginTop: 100 }}>
            <main className="form-signin w-50 m-auto">
                <form onSubmit={formik.handleSubmit}>
                    <h1 className="h3 mb-3 fw-normal">Register</h1>

                    <div className="form-group">
                        <label htmlFor="username">Username: </label>
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
                        {formik.touched.username && formik.errors.username ? (
                            <div className='text-danger'>{formik.errors.username}</div>
                        ) : null}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password: </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            placeholder="Password"
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <div className='text-danger'>{formik.errors.password}</div>
                        ) : null}
                    </div>

                    <div className="form-group">
                        <label htmlFor="role">Role: </label>
                        <select
                            className="form-select"
                            id="role"
                            {...formik.getFieldProps('role')}
                        >
                            <option value="" disabled>Select any one</option>
                            <option value='admin'>Admin</option>
                            <option value='user'>User</option>
                        </select>
                        {formik.touched.role && formik.errors.role ? (
                            <div className='text-danger'>{formik.errors.role}</div>
                        ) : null}
                    </div>

                    <div style={{ marginBottom: 50 }}></div>
                    <button className="btn btn-primary w-100 py-2" type="submit" disabled={formik.isSubmitting}>
                        Register
                    </button>
                    {formik.status === 'success' && (
                        <div className="alert alert-success mt-3">Registration successful!</div>
                    )}
                    {formik.status === 'error' && (
                        <div className="alert alert-danger mt-3">Registration failed. Please try again.</div>
                    )}
                </form>
            </main>
        </div>
    );
}

export default Register;










