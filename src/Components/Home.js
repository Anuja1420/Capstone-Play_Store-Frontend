import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
//import { AuthContext } from './context/authContext';

function Home() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:2001/application/category');
      const questions = response.data;

      const uniqueCategories = [
        ...new Set(questions.map((application) => application.category)),
      ];

      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching categories', error);
    }
  };

  return (
    <>
      <header style={{
        position: 'relative',
        padding: '20px 0',
        background: 'linear-gradient(90deg, rgba(13, 100, 200, 5) 0%, rgba(237, 144, 250, 1) 100%)',
        color: '#fff',
        textAlign: 'center',
        fontSize: '10px',
        fontWeight: 'bold',
        fontFamily: 'Arial, sans-serif',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}>
        <h1>Get Your Everyday App</h1>
      </header>

      <div className="container my-5">
        <div className="row">
          {categories.map((category) => (
            <div className="col-md-4 mb-4" key={category}>
              <div className="card" onClick={() => navigate(`/listquestions/${category}`)} style={{ cursor: 'pointer' }}>
                <div className="card-body">
                  <h5 className="card-title" style={{
                    background: 'linear-gradient(90deg, rgba(136, 45, 179, 1) 0%, rgba(237, 144, 250, 1) 100%)',
                    color: '#fff',
                    textAlign: 'center',
                    padding: '20px 0',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    fontFamily: 'Arial, sans-serif',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  }}>
                    {category}
                  </h5>
                  <p className="card-text">Explore applications related to {category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
// // import './Home.css';

// function Home() {
//   return (
//     <>
//       <div className="container my-5">
//         <div className="row text-center">
//           <div className="col">
//             <h1>PlayStore</h1>
//             <p></p>
//           </div>
//         </div>
//       </div>

//       <div className="container my-5">
//         <h2 className="text-center mb-4">Explore Applications</h2>
//         <div className="row">
//           {/* Image cards */}
//           <div className="col-md-4">
//             <div className="card">
//               <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScqSMeESXghp0ZGhZqzkadGeQnrfNMgVir-A&s" className="card-img-top" alt="App 1" />
//             </div>
//           </div>
//           <div className="col-md-4">
//             <div className="card">
//               <img src="https://www.spaceo.ca/wp-content/uploads/2020/05/best-health-apps.jpg" className="card-img-top" alt="App 2" />
//             </div>
//           </div>
//           <div className="col-md-4">
//             <div className="card">
//               <img src="https://res.cloudinary.com/madimages/image/fetch/e_sharpen:100,q_auto:eco,fl_progressive:semi,h_253,w_400/https://s3.amazonaws.com/mobileappdaily/mad/uploads/img_best_clothing_apps.webp" className="card-img-top" alt="App 3" />
//             </div>
//           </div>
//           <div className="col-md-4">
//             <div className="card">
//               <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJoKZ4ZdXblx2ZI5yDOmE-I7kGBDPAkLij4Q&s" className="card-img-top" alt="App 4" />
//             </div>
//           </div>
//           <div className="col-md-4">
//             <div className="card">
//               <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWL1KgKVlZSCuAxV7yDpjaSKEDfjQl_ke4rg&s" className="card-img-top" alt="App 5" />
//             </div>
//           </div>
//           <div className="col-md-4">
//             <div className="card">
//               <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9JjstrMtUNAAbD25YoM60S3zmgYoeM0Dm8HJhZTRIoLVz07H95qGXkZu2Vh91Sry1J-0&usqp=CAU" className="card-img-top" alt="App 6" />
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="container my-5">
//         <h2 className="text-center mb-4">Our Specialization</h2>
//         <div className="row our-services">
//           <div className="col-md-4 text-center">
//             <h4>A Decade of Trust</h4>
//             <p>We discover Quality Apps with Confidence!</p>
//           </div>
//           <div className="col-md-4 text-center">
//             <h4>More Than Just Apps</h4>
//             <p>Find Your Perfect App in a Safe and Trusted Environment!




// </p>
//           </div>
//           <div className="col-md-4 text-center">
//             <h4>Setting the Standard</h4>
//             <p>Over 10 Years of Curated Excellence in Apps.</p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Home;