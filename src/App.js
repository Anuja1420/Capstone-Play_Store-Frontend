import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import Menu from './Components/menu';
import Login from './Components/login';
import Register from './Components/register';
import Footer from './Components/Footer';
import Home from './Components/Home';
import ApplicationList from './Components/listapplication';
import WriteReview from './Components/writereview';
import CreateApplication from './Components/createapplication';
import UpdateApplication from './Components/updateapplication';

import SearchedItemsByName from "./Components/searchitembyname";
import SearchedItemsByRating from "./Components/searchitembyrating";
import SearchedItemsByCategory from './Components/searchitembycategory';
import FetchUser from './Components/fetchuser';
import ShowReviews from './Components/showreviews';
import Notification from './Components/notification';

const App = () => {
  return (
    <AuthProvider>
      <Router>
      <div>
        <Menu/>
                
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/applications" element={<ApplicationList />}/>
            <Route path="/writereview/:appId" element={<WriteReview />} />
            <Route path='/createapplication' element={<CreateApplication/>}/>
            <Route path='/updateapplication/:id' element={<UpdateApplication/>}/>
            <Route path="/register" element={<Register />} />

            <Route path="/login" element={<Login />} />

            <Route path="/searchitembyname" element={<SearchedItemsByName />} />
            <Route path="/searcheditemsbyrating" element={<SearchedItemsByRating />} />
            <Route path="/searchitembycategory" element={<SearchedItemsByCategory />} />
            <Route path="/fetchusers" element={<FetchUser />} />
            <Route path="/showreviews/:appId" element={<ShowReviews />} />
            <Route path="/notification" element={<Notification />} />

            

          </Routes>
          <Footer/>
      </div>
      </Router>
    </AuthProvider>
  );
};

export default App;


