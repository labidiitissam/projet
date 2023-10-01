
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import EventPlaceAddForm from './pages/EventPlaceForm/EventPlaceAddForm';
import EventDetailsPage from './pages/EventDetailsPage/EventDetailsPage';
import EventListTable from './pages/EventListTable/EventListTable';
import Reservation from './pages/Reservation/Reservation';
import ProtectedRoute from './components/ProtectedRoute';
import OwnerPlaces from './pages/ownerPlaces/OwnerPlaces';
import Home from './pages/Home/Home';
import Contact from './pages/contact/Contact'
import "./App.css"
import { useEffect, useState } from 'react';
import axios from "axios"
import PlaceContext from './PlaceContext'

function App() {

  const [events, setEvents] = useState([]);
  const [mystate, setState] = useState(false)


  useEffect(() => {
    // Define an asynchronous function to fetch the data
    const fetchData = async () => {
      try {
        // Make a GET request to fetch the list of places
        const response = await axios.get('http://localhost:5000/api/place/list');

        // Filter places where the owner's email matches the stored email
        const filteredPlaces = response.data.places.filter((place) => place.Availability === true);

        // Update the events state with the data from the API
        await setEvents(filteredPlaces);


      } catch (error) {
        // Handle errors here
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetchData function
    fetchData();
  },[mystate]); // Empty dependency array to run the effect only once


  return (
    <PlaceContext.Provider value={{mystate,setState}}>

    <Router>
      <div className="app-container">
        <Navbar />
        <div className="content-container">
          <Routes>
            <Route exact path="/" element={<Home events={events} />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/place/add" element={<ProtectedRoute><EventPlaceAddForm /></ProtectedRoute>} />
            <Route exact path="/event/:eventId" element={<EventDetailsPage events={events} />} />
            <Route exact path="/event/reservation/list" element={<ProtectedRoute><EventListTable /></ProtectedRoute>} />
            <Route exact path="/event/list" element={<ProtectedRoute><OwnerPlaces /></ProtectedRoute>} />
            <Route exact path="/reservations" element={<ProtectedRoute><Reservation /></ProtectedRoute>} />
            <Route exact path="/contact" element={<Contact />} />
          </Routes>
        </div>
        <footer className="footer">
          CopyRight 2023
        </footer>
      </div>
    </Router>
   </PlaceContext.Provider> 
  )

}

export default App;
