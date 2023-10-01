import React,{useEffect,useState} from 'react'
import TableReservationUser from '../../components/TableRservationUser'
import axios from "axios"

const Reservation = () => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    // Define an asynchronous function to fetch the data
    let user = localStorage.getItem("user");
    const fetchData = async () => {
      try {
        // Make a GET request to fetch the list of reservations
        const response = await axios.get('http://localhost:5000/api/reservation', {
          headers: {
            token: JSON.parse(user).token
          },
        });
  
        // Extract the place objects from the reservations
        const places = response.data.reservations.map((reservation) => reservation.place);
  
        // Update the events state with the place objects
        await setEvents(places);
  
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
          title:"Nom du lieu d'événement",
          field: "eventPlaceName",
        },
        {
          title:"Adresse du lieu d'événement ",
          field: "eventPlaceAdress",
        },
      ];
  return (
    <div className='table_style'>
         <TableReservationUser columns={columns} data={events} title={"Réservations"} />
    </div>
  )
}

export default Reservation