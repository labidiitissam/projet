// import React, { useState } from 'react';
// import Grid from '@mui/material/Grid';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import Paper from '@mui/material/Paper'; // Import the Paper component
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import Dialog from '@mui/material/Dialog'; // Import Dialog
// import { notify } from "../utils/notif";

// const EventDetails = ({ event }) => {
//   const [isReservationOpen, setReservationOpen] = useState(false);
//   const [selectedDate, setSelectedDate] = useState('');
//   const navigate = useNavigate();

//   const handleReservationClick = () => {
//     setReservationOpen(true);
//   };

//   const handleConfirmClick = async () => {
//     try {
//       // Make an API call to create a reservation
//       const user = localStorage.getItem("user");
//       if (user == null) {
//         navigate('/login');
//       } else {
//         try {
//           const response = await axios.post(
//             'http://localhost:5000/api/reservation/create',
//             {
//               date: selectedDate,
//               place: event._id, // Use the place id from the event
//             },
//             {
//               headers: {
//                 token: JSON.parse(user).token
//               },
//             }
//           );
//           navigate('/');
//         } catch (err) {
//           notify(err.response.data.message, true);
//         }
//       }
//     } catch (error) {
//       // Handle errors from the API call
//       console.error('Error creating reservation:', error);
//       // You can display an error message to the user or take other appropriate actions
//     }
//   };

//   return (
//     <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '60vh' }}>
//       <Grid item xs={12} sm={8} md={6} lg={4}>
//         <Paper elevation={3} className="event-details-container" style={{ padding: '20px', height: '100%' }}>
//           <Grid container spacing={3}>
//             <Grid item xs={12} sm={6}>
//               <div className="event-details-image">
//                 <img
//                   src={"https://media.abcsalles.com/images/1/salles/900h/31386/glodie-evenements-32.jpg"}
//                   alt={event.eventPlaceName}
//                   style={{ width: '100%', maxWidth: '250px', height: 'auto' }}
//                 />
//               </div>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <div className="event-details-description">
//                 <Typography variant="h4">{event.eventPlaceName}</Typography>
//                 <div className="event-details-subtitle">
//                   <Typography variant="subtitle1" style={{ color: '#888' }}><strong>Adresse:</strong></Typography>
//                   <Typography>{event.eventPlaceAdress}</Typography>
//                 </div>
//                 <div className="event-details-subtitle">
//                   <Typography variant="subtitle1" style={{ color: '#888' }}><strong>Numéro de téléphone:</strong></Typography>
//                   <Typography>{event.ownerPhoneNumber}</Typography>
//                 </div>
//                 <div className="event-details-subtitle">
//                   <Typography variant="subtitle1" style={{ color: '#888' }}><strong>Description:</strong></Typography>
//                   <Typography>{event.Description}</Typography>
//                 </div>
//                 <div className="event-details-subtitle">
//                   <Typography variant="subtitle1" style={{ color: '#888' }}><strong>Prix:</strong></Typography>
//                   <Typography>{event.price} DT</Typography>
//                 </div>
//                 <br />
//                 {!isReservationOpen ? (
//                   <Button variant="contained"  style={{ backgroundColor: '#333' }} onClick={handleReservationClick}>
//                     Réservez maintenant
//                   </Button>
//                 ) : (
//                   <div>
//                     <TextField
//                       label="Date de réservation"
//                       type="date"
//                       InputLabelProps={{
//                         shrink: true,
//                       }}
//                       variant="outlined"
//                       fullWidth
//                       value={selectedDate}
//                       onChange={(e) => setSelectedDate(e.target.value)}
//                     />
//                     <br /> <br />
//                     <Button variant="contained"  style={{ backgroundColor: '#333' }} onClick={handleConfirmClick}>
//                       Confirmer
//                     </Button>
//                   </div>
//                 )}
//               </div>
//             </Grid>
//           </Grid>
//         </Paper>
//       </Grid>
//     </Grid>
//   );
// };

// export default EventDetails;

import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { notify } from '../utils/notif';

const EventDetails = ({ event }) => {
  const [isReservationOpen, setReservationOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [isImageOpen, setImageOpen] = useState(false);
  const navigate = useNavigate();

  const handleReservationClick = () => {
    setReservationOpen(true);
  };

  const handleConfirmClick = async () => {
    try {
      const user = localStorage.getItem("user");
      if (user == null) {
        navigate('/login');
      } else {
        try {
          const response = await axios.post(
            'http://localhost:5000/api/reservation/create',
            {
              date: selectedDate,
              place: event._id,
            },
            {
              headers: {
                token: JSON.parse(user).token
              },
            }
          );
          navigate('/');
        } catch (err) {
          notify(err.response.data.message, true);
        }
      }
    } catch (error) {
      console.error('Error creating reservation:', error);
    }
  };

  const openImageModal = () => {
    setImageOpen(true);
  };

  const closeImageModal = () => {
    setImageOpen(false);
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '60vh' }}>
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Paper elevation={3} className="event-details-container" style={{ padding: '20px', height: '100%' }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <div className="event-details-image" onClick={openImageModal}>
                <img
                  src={event.eventPlaceImage}
                  alt={event.eventPlaceName}
                  style={{ width: '100%', maxWidth: '250px', height: 'auto', cursor: 'pointer' }}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div className="event-details-description">
                <Typography variant="h4">{event.eventPlaceName}</Typography>
                <div className="event-details-subtitle">
                  <Typography variant="subtitle1" style={{ color: '#888' }}>
                    <strong>Adresse:</strong>
                  </Typography>
                  <Typography>{event.eventPlaceAdress}</Typography>
                </div>
                <div className="event-details-subtitle">
                  <Typography variant="subtitle1" style={{ color: '#888' }}>
                    <strong>Numéro de téléphone:</strong>
                  </Typography>
                  <Typography>{event.ownerPhoneNumber}</Typography>
                </div>
                <div className="event-details-subtitle">
                  <Typography variant="subtitle1" style={{ color: '#888' }}>
                    <strong>Description:</strong>
                  </Typography>
                  <Typography>{event.Description}</Typography>
                </div>
                <div className="event-details-subtitle">
                  <Typography variant="subtitle1" style={{ color: '#888' }}>
                    <strong>Prix:</strong>
                  </Typography>
                  <Typography>{event.price} DT</Typography>
                </div>
                <br />
                {!isReservationOpen ? (
                  <Button
                    variant="contained"
                    style={{ backgroundColor: '#333' }}
                    onClick={handleReservationClick}
                  >
                    Réservez maintenant
                  </Button>
                ) : (
                  <div>
                    <TextField
                      label="Date de réservation"
                      type="date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                      fullWidth
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                    />
                    <br /> <br />
                    <Button
                      variant="contained"
                      style={{ backgroundColor: '#333' }}
                      onClick={handleConfirmClick}
                    >
                      Confirmer
                    </Button>
                  </div>
                )}
              </div>
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      {/* Image Modal */}
      <Dialog open={isImageOpen} onClose={closeImageModal}>
        <DialogTitle>{event.eventPlaceName}</DialogTitle>
        <img
          src={event.eventPlaceImage }
          alt={event.eventPlaceName}
          style={{ width: '100%', maxHeight: '80vh', objectFit: 'contain' }}
        />
      </Dialog>
    </Grid>
  );
};

export default EventDetails;

