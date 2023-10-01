import React, { useEffect, useState } from 'react'
import OwnerPlacesTable from "../../components/OwnerPlacesTable"
import axios from "axios"


const OwnerPlaces = () => {

  const [places, setPlaces] = useState([]);

  useEffect(() => {
    // Define an asynchronous function to fetch the data
    let user = localStorage.getItem("user");
    const userEmail = JSON.parse(user).email;
    const fetchData = async () => {
      try {
        // Make a GET request to fetch the list of reservations
        const response = await axios.get('http://localhost:5000/api/place/list', {
          headers: {
            token: JSON.parse(user).token
          },
        });
        
        
        // Filter places where the owner's email matches the stored email
      const filteredPlaces = response.data.places.filter((place) => place.ownerId.email === userEmail);
      // Filter available places where the owner's email matches the stored email
      const filteredAvailablePlaces = filteredPlaces.filter((place) => place.Availability === true);
  
        // Update the events state with the filtered data
        await setPlaces(filteredAvailablePlaces);
  
      } catch (error) {
        // Handle errors here
        console.error('Error fetching data:', error);
      }
    };
  
    // Call the fetchData function
    fetchData();
  }, []);
  
  const columns = [
    {
      title: "Nom du lieu d'événement",
      field: "eventPlaceName",
    },
    {
      title: "Adresse du lieu d'événement ",
      field: "eventPlaceAdress",
    },
    {
        title: "Description",
        field: "Description",
    },

  
    
  ];
  return (
    <div className='table_style'>
      <OwnerPlacesTable columns={columns} title={"Liste des salles"} data={places} />
    </div>
  )
}

export default OwnerPlaces