import React, { useEffect, useState } from 'react'
import Table from '../../components/Table'
import axios from "axios"
import './style.css'

const EventListTable = () => {

  const [events, setEvents] = useState([]);

  
  useEffect(() => {
    // Define an asynchronous function to fetch the data
    let user = localStorage.getItem("user");
    const fetchData = async () => {
      try {
        // Make a GET request to fetch the list of reservations
        const response = await axios.get('http://localhost:5000/api/reservation/owner', {
          headers: {
            token: JSON.parse(user).token
          },
        });
  
        // Filter reservations where isCancled is false
        const reservationsWithUserDataInPlace = response.data.publisherReservations
          .filter((reservation) => !reservation.isCancled)
          .map((reservation) => {
            const { _id, user, date, ...placeData } = reservation;
              // Convert the date string to a JavaScript Date object
              const formattedDate = new Date(date);
              // Format the date to "YYYY-MM-DD" (e.g., "2023-09-16")
              const formattedDateYYYYMMDD = formattedDate.toISOString().split('T')[0];
              // Format the date to "DD-MM-YYYY" (e.g., "16-09-2023")
              const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
              const formattedDateDDMMYYYY = formattedDate.toLocaleDateString('fr-FR', options);
            return {
              ...placeData.place,
              _id: _id, // Use the reservation's _id as the id
              phoneNumber: user.phoneNumber,
              firstname: user.firstname,
              date: formattedDateDDMMYYYY,
            };
          });
  
        // Update the events state with the filtered data
        await setEvents(reservationsWithUserDataInPlace);
  
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
      title: "Nom du Client",
      field: "firstname",
    },
    {
      title: "Numéro du Telephone  Client",
      field: "phoneNumber",
    },
    {
      title: "Date de Réservation",
      field: "date",
    },
    
  ];
  return (
    <div className='table_style'>
      <Table columns={columns} title={"Liste des réservations"} data={events} />
    </div>
  )
}

export default EventListTable