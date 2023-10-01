
import React, { useState,useContext } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Paper } from '@mui/material';
import { useNavigate } from "react-router-dom"
import { notify } from "../../utils/notif"
import axios from "axios"
import PlaceContext from '../../PlaceContext'
import CircularProgress from '@mui/material/CircularProgress';



const EventPlaceAddForm = () => {

  const myplace = useContext(PlaceContext)
  const navigate = useNavigate()

 
  const [loading, setLoading] = useState(false);
  const [myformData, setFormData] = useState({
    eventPlaceName: '',
    eventPlaceAdress: '',
    ownerPhoneNumber: '',
    Description: '',
    price: '',
    eventPlaceImage:''
  });

const handleImageChange =async(e) =>     {
  const instance = axios.create()
  const file = e.target.files[0];
  const data = new FormData()
  data.append("file", file);
  data.append("upload_preset", "d3lx62dc");
  data.append("cloud_name", "dmymshl4d");
  try {
    await setLoading(true)
    const res = await instance.post(
      "https://api.cloudinary.com/v1_1/dmymshl4d/image/upload/", 
      data
    )
  
    await setFormData({
      ...myformData,
      eventPlaceImage: res.data.secure_url,
    });
   
   await setLoading(false)
  } catch (error) {
    console.error('Error uploading image: ', error);
  }  
}
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...myformData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    
    
    const API_URL = "http://localhost:5000/api/place/create"
    let user = localStorage.getItem("user");
    //  add event
      const config = {
        headers: {
          token: JSON.parse(user).token,
        },
      };
      try {
       const response = await axios.post(API_URL,myformData,config)
       myplace.setState(!myplace.mystate)
       navigate('/')
      } catch (err) {
        notify(err.response.data.message,true)
      } 
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '80vh' }}>
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Nom du lieu d'événement"
              name="eventPlaceName"
              variant="outlined"
              fullWidth
              margin="normal"
              value={myformData.eventPlaceName}
              onChange={handleChange}
              required
            />
            <TextField
              label="Adresse du lieu d'événement"
              name="eventPlaceAdress"
              variant="outlined"
              fullWidth
              margin="normal"
              value={myformData.eventPlaceAddress}
              onChange={handleChange}
              required
            />
            <TextField
              label="Numéro de téléphone du propriétaire"
              name="ownerPhoneNumber"
              variant="outlined"
              fullWidth
              margin="normal"
              value={myformData.ownerPhoneNumber}
              onChange={handleChange}
              required
              inputProps={{
                maxLength: 8, // Limit to a maximum of 8 digits
                pattern: '[0-9]*', // Only allow numeric input
              }}
            />
            <TextField
              label="Description"
              name="Description"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              margin="normal"
              value={myformData.Description}
              onChange={handleChange}
              placeholder="Entrez une description..."
              InputProps={{
                style: { minHeight: '100px' }, // Adjust the height as needed
              }}
            />
  <input
  type="file"
  accept="image/*"
  name="eventPlaceImage"
  onChange={handleImageChange}
/> {loading && <CircularProgress size={24}/>}
            <TextField
              label="Prix"
              name="price"
              variant="outlined"
              fullWidth
              margin="normal"
              value={myformData.price}
              onChange={handleChange}
              required
            />
            <br /><br />
            <Button  type="submit" variant="contained" style={{ backgroundColor: '#333' }} fullWidth>
              Ajouter un lieu d'événement
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default EventPlaceAddForm;