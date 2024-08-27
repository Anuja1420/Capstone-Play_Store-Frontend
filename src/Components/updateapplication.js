import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';

function UpdateApplication() {
    const { id } = useParams(); // Get the application ID from the URL
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [application, setInitialValues] = useState({
        name: '',
        description: '',
        releaseDate: '',
        version: '',
        ratings: 0,
        genre: '',
        category: '',
        visibility: true,
        imageUrl: ''
    });

    useEffect(() => {
        axios.get(`http://localhost:2001/application/getappbyappid/${id}`, { //Get prewritten data from app
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
        .then(response => {
            setInitialValues(response.data);
        })
        .catch(error => {
            console.error("There was an error fetching the application data!", error);
        });
    }, [id, user.token]);


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: application?.name || "",
            description: application?.description || "",
            imageUrl: application?.imageUrl || '',
            category: application?.category || "",
            releaseDate: application?.releaseDate || '',
            version: application?.version || '',
            ratings: application?.ratings || 0,
            genre: application?.genre || '',
            visibility: application?.visibility || true,
        },
    
        validationSchema: Yup.object({
            name: Yup.string().required("Name is required"),
            description: Yup.string().required('Description is required'),
            version: Yup.string().required('Version is required'),
            // imageUrl: Yup.string().url('Invalid URL format'),
            // category: Yup.string().required('Category is required'),
            // releaseDate: Yup.date().required('Release Date is required'),
            // ratings: Yup.number().min(0).max(5).required('Ratings are required'),
            // genre: Yup.string().required('Genre is required'),
            
        }),
        onSubmit: (values, { setSubmitting, resetForm, setStatus }) => {
            axios.put(`http://localhost:2001/application/updateapp/appId/${id}`, values, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            })

            .then(() => {
                // Notify all users about the update
                axios.post('http://localhost:2001/notification/notifications',
                 {
                    title: 'Application Updated',
                    recipient: user._id, // You might need to modify this to handle multiple users
                    application: id,
                    message: `The application with name ${application.name} has been updated.`
                },
                
                )
                .then(() => {
                    setStatus("success");
                    resetForm();
                    navigate('/applications'); // Navigate to the list of applications
                })
                .catch(error => {
                    setStatus("error");
                    console.error("Error occurred while notifying users", error);
                });
            })
            .catch((error) => {
                setStatus("error");
                console.error("There was an error updating the application!", error);
            })
            .finally(() => {
                setSubmitting(false);
            });
        }
    });
    //         .then(() => {
    //             setStatus("success");
    //             resetForm();
    //             navigate('/applications'); // Navigate to the list of applications
    //         })
    //         .catch((error) => {
    //             setStatus("error");
    //             console.error("There was an error updating the application!", error);
    //         })
    //         .finally(() => {
    //             setSubmitting(false);
    //         });
    //     }
    // });
    


    return (
        <div className="container">
            <h2 className="border-bottom pb-2 mb-4" style={{ fontWeight: 600, fontFamily: "monospace", marginTop: 40 }}>Update Application</h2>
            <form onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        className="form-control"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                    />
                    {formik.touched.name && formik.errors.name ? <div className="text-danger">{formik.errors.name}</div> : null}
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        className="form-control"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.description}
                    />
                    {formik.touched.description && formik.errors.description ? <div className="text-danger">{formik.errors.description}</div> : null}
                </div>
                <div className="mb-3">
                    <label htmlFor="releaseDate" className="form-label">Release Date</label>
                    <input
                        id="releaseDate"
                        name="releaseDate"
                        type="date"
                        className="form-control"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.releaseDate}
                    />
                    {formik.touched.releaseDate && formik.errors.releaseDate ? <div className="text-danger">{formik.errors.releaseDate}</div> : null}
                </div>
                <div className="mb-3">
                    <label htmlFor="version" className="form-label">Version</label>
                    <input
                        id="version"
                        name="version"
                        type="text"
                        className="form-control"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.version}
                    />
                    {formik.touched.version && formik.errors.version ? <div className="text-danger">{formik.errors.version}</div> : null}
                </div>
                <div className="mb-3">
                    <label htmlFor="ratings" className="form-label">Ratings</label>
                    <input
                        id="ratings"
                        name="ratings"
                        type="number"
                        className="form-control"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.ratings}
                        min="0"
                        max="5"
                    />
                    {formik.touched.ratings && formik.errors.ratings ? <div className="text-danger">{formik.errors.ratings}</div> : null}
                </div>
                <div className="mb-3">
                    <label htmlFor="genre" className="form-label">Genre</label>
                    <input
                        id="genre"
                        name="genre"
                        type="text"
                        className="form-control"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.genre}
                    />
                    {formik.touched.genre && formik.errors.genre ? <div className="text-danger">{formik.errors.genre}</div> : null}
                </div>
                <div className="mb-3">
                    <label htmlFor="category" className="form-label">Category</label>
                    <input
                        id="category"
                        name="category"
                        type="text"
                        className="form-control"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.category}
                    />
                    {formik.touched.category && formik.errors.category ? <div className="text-danger">{formik.errors.category}</div> : null}
                </div>
                <div className="mb-3">
                    <label htmlFor="imageUrl" className="form-label">Image URL</label>
                    <input
                        id="imageUrl"
                        name="imageUrl"
                        type="text"
                        className="form-control"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.imageUrl}
                    />
                    {formik.touched.imageUrl && formik.errors.imageUrl ? <div className="text-danger">{formik.errors.imageUrl}</div> : null}
                    {formik.values.imageUrl && (
                        <div className="mt-3">
                            <img src={formik.values.imageUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                        </div>
                    )}
                </div>
                <div className="form-check mb-3">
                    <input
                        id="visibility"
                        name="visibility"
                        type="checkbox"
                        className="form-check-input"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        checked={formik.values.visibility}
                    />
                    <label htmlFor="visibility" className="form-check-label">Visibility</label>
                </div>
                <button type="submit" className="btn btn-primary" disabled={formik.isSubmitting}>
                    Update Application
                </button>
                {formik.status === 'success' && <div className="text-success">Update successful!</div>}
                {formik.status === 'error' && <div className="text-danger">Update failed!</div>}
            </form>
        </div>
    );
}

export default UpdateApplication;





// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useContext } from 'react';
// import { AuthContext } from '../context/authContext';

// function UpdateApplication() {
//     const { id } = useParams(); // Get the application ID from the URL
//     const navigate = useNavigate();
//     const { user } = useContext(AuthContext);

//     const [application, setInitialValues] = useState({
//         name: '',
//         description: '',
//         releaseDate: '',
//         version: '',
//         ratings: 0,
//         genre: '',
//         category: '',
//         visibility: true,
//         imageUrl: ''
//     });

//     useEffect(() => {
//         axios.get(`http://localhost:2001/application/getappbyappid/${id}`, { //Get prewritten data from app
//             headers: {
//                 Authorization: `Bearer ${user.token}`
//             }
//         })
//         .then(response => {
//             setInitialValues(response.data);
//         })
//         .catch(error => {
//             console.error("There was an error fetching the application data!", error);
//         });
//     }, [id, user.token]);


//     const formik = useFormik({
//         enableReinitialize: true,
//         initialValues: {
//             name: application?.name || "",
//             description: application?.description || "",
//             imageUrl: application?.imageUrl || '',
//             category: application?.category || "",
//             releaseDate: application?.releaseDate || '',
//             version: application?.version || '',
//             ratings: application?.ratings || 0,
//             genre: application?.genre || '',
//             visibility: application?.visibility || true,
//         },
    
//         validationSchema: Yup.object({
//             name: Yup.string().required("Name is required"),
//             description: Yup.string().required('Description is required'),
//             // imageUrl: Yup.string().url('Invalid URL format'),
//             // category: Yup.string().required('Category is required'),
//             // releaseDate: Yup.date().required('Release Date is required'),
//             // version: Yup.string().required('Version is required'),
//             // ratings: Yup.number().min(0).max(5).required('Ratings are required'),
//             // genre: Yup.string().required('Genre is required'),
//         }),
//         onSubmit: (values, { setSubmitting, resetForm, setStatus }) => {
//             axios.put(`http://localhost:2001/application/updateapp/appId/${id}`, values, {
//                 headers: {
//                     Authorization: `Bearer ${user.token}`
//                 }
//             })
//             .then(() => {
//                 setStatus("success");
//                 resetForm();
//                 navigate('/applications'); // Navigate to the list of applications
//             })
//             .catch((error) => {
//                 setStatus("error");
//                 console.error("There was an error updating the application!", error);
//             })
//             .finally(() => {
//                 setSubmitting(false);
//             });
//         }
//     });
    


//     return (
//         <div className="container">
//             <h2 className="border-bottom pb-2 mb-4" style={{ fontWeight: 600, fontFamily: "monospace", marginTop: 40 }}>Update Application</h2>
//             <form onSubmit={formik.handleSubmit}>
//                 <div className="mb-3">
//                     <label htmlFor="name" className="form-label">Name</label>
//                     <input
//                         id="name"
//                         name="name"
//                         type="text"
//                         className="form-control"
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         value={formik.values.name}
//                     />
//                     {formik.touched.name && formik.errors.name ? <div className="text-danger">{formik.errors.name}</div> : null}
//                 </div>
//                 <div className="mb-3">
//                     <label htmlFor="description" className="form-label">Description</label>
//                     <textarea
//                         id="description"
//                         name="description"
//                         className="form-control"
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         value={formik.values.description}
//                     />
//                     {formik.touched.description && formik.errors.description ? <div className="text-danger">{formik.errors.description}</div> : null}
//                 </div>
//                 <div className="mb-3">
//                     <label htmlFor="releaseDate" className="form-label">Release Date</label>
//                     <input
//                         id="releaseDate"
//                         name="releaseDate"
//                         type="date"
//                         className="form-control"
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         value={formik.values.releaseDate}
//                     />
//                     {formik.touched.releaseDate && formik.errors.releaseDate ? <div className="text-danger">{formik.errors.releaseDate}</div> : null}
//                 </div>
//                 <div className="mb-3">
//                     <label htmlFor="version" className="form-label">Version</label>
//                     <input
//                         id="version"
//                         name="version"
//                         type="text"
//                         className="form-control"
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         value={formik.values.version}
//                     />
//                     {formik.touched.version && formik.errors.version ? <div className="text-danger">{formik.errors.version}</div> : null}
//                 </div>
//                 <div className="mb-3">
//                     <label htmlFor="ratings" className="form-label">Ratings</label>
//                     <input
//                         id="ratings"
//                         name="ratings"
//                         type="number"
//                         className="form-control"
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         value={formik.values.ratings}
//                         min="0"
//                         max="5"
//                     />
//                     {formik.touched.ratings && formik.errors.ratings ? <div className="text-danger">{formik.errors.ratings}</div> : null}
//                 </div>
//                 <div className="mb-3">
//                     <label htmlFor="genre" className="form-label">Genre</label>
//                     <input
//                         id="genre"
//                         name="genre"
//                         type="text"
//                         className="form-control"
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         value={formik.values.genre}
//                     />
//                     {formik.touched.genre && formik.errors.genre ? <div className="text-danger">{formik.errors.genre}</div> : null}
//                 </div>
//                 <div className="mb-3">
//                     <label htmlFor="category" className="form-label">Category</label>
//                     <input
//                         id="category"
//                         name="category"
//                         type="text"
//                         className="form-control"
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         value={formik.values.category}
//                     />
//                     {formik.touched.category && formik.errors.category ? <div className="text-danger">{formik.errors.category}</div> : null}
//                 </div>
//                 <div className="mb-3">
//                     <label htmlFor="imageUrl" className="form-label">Image URL</label>
//                     <input
//                         id="imageUrl"
//                         name="imageUrl"
//                         type="text"
//                         className="form-control"
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         value={formik.values.imageUrl}
//                     />
//                     {formik.touched.imageUrl && formik.errors.imageUrl ? <div className="text-danger">{formik.errors.imageUrl}</div> : null}
//                     {formik.values.imageUrl && (
//                         <div className="mt-3">
//                             <img src={formik.values.imageUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
//                         </div>
//                     )}
//                 </div>
//                 <div className="form-check mb-3">
//                     <input
//                         id="visibility"
//                         name="visibility"
//                         type="checkbox"
//                         className="form-check-input"
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         checked={formik.values.visibility}
//                     />
//                     <label htmlFor="visibility" className="form-check-label">Visibility</label>
//                 </div>
//                 <button type="submit" className="btn btn-primary" disabled={formik.isSubmitting}>
//                     Update Application
//                 </button>
//                 {formik.status === 'success' && <div className="text-success">Update successful!</div>}
//                 {formik.status === 'error' && <div className="text-danger">Update failed!</div>}
//             </form>
//         </div>
//     );
// }

// export default UpdateApplication;


