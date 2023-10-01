import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const ContactUsCard = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          Contactez Nous
        </Typography>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '1rem' }}>
          <EmailIcon style={{ marginRight: '0.5rem' }} />
          <Typography variant="body1">
            Email: reservi@gmail.com
          </Typography>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '0.5rem' }}>
          <PhoneIcon style={{ marginRight: '0.5rem' }} />
          <Typography variant="body1">
            Phone: +58754241
          </Typography>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '0.5rem' }}>
          <LocationOnIcon style={{ marginRight: '0.5rem' }} />
          <Typography variant="body1">
            Address: Tunis
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactUsCard;
