// import React from 'react';
// import { Link } from 'react-router-dom';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
// import Grid from '@mui/material/Grid';

// const EventCard = ({ event }) => {
//   return (
//     <Card style={{ width: 350,height:250 ,margin: '16px' }}>
//       <CardMedia
//         component="img"
//         height="140"
//         image={"https://as1.ftcdn.net/v2/jpg/02/48/42/64/1000_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg"}
//         alt={event.eventPlaceName}
//       />
//       <CardContent>
//         <Typography variant="h6">
//           <Link to={`/event/${event._id}`}>{event.eventPlaceName}</Link>
//         </Typography>
//         <Typography variant="body2">
//           Prix: {event.price} DT
//         </Typography>
//       </CardContent>
//     </Card>
//   );
// };

// const Home = ({ events }) => {
//   return (
//     <Grid marginLeft={20} container justifyContent="left" spacing={2}>
//       {events.map((event) => (
//         <Grid item key={event._id}>
//           <EventCard event={event} />
//         </Grid>
//       ))}
//     </Grid>
//   );
// };

// export default Home;
import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const EventCard = ({ event }) => {
  return (
    <Card style={{ maxWidth: 350, margin: '16px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
      <CardMedia
        component="img"
        height="140"
        image={event.eventPlaceImage}
        alt={event.eventPlaceName}
      />
      <CardContent>
        <Typography variant="h6">
          <Link to={`/event/${event._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            {event.eventPlaceName}
          </Link>
        </Typography>
        <Typography variant="body2">
          Prix: {event.price} DT
        </Typography>
      </CardContent>
    </Card>
  );
};

const Home = ({ events }) => {
  return (
    <Grid container spacing={2}>
      {events.map((event) => (
        <Grid item key={event._id} xs={12} sm={6} md={4} lg={3}>
          <EventCard event={event} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Home;

