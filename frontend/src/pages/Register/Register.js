import React, { useState,useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import { useNavigate } from "react-router-dom"
import { useDispatch,useSelector } from "react-redux";
import {addClientSlice,reset} from "../../features/RegisterSlice"
import { notify } from '../../utils/notif';
import {Paper} from '@mui/material';

const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phoneNumber: '',
    password: '',
    isPublisher: false,
  });

  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.client
  );

  useEffect(() => {
    if(isError) {
      notify(message.error,true)
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(addClientSlice(formData)).
    then(res=>res.meta.requestStatus==="fulfilled" ? navigate('/login'):"")
    // Reload the current page
   
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '80vh' }}>
      <Grid item xs={12} sm={8} md={6} lg={4}>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Prénom"
            name="firstname"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.firstname}
            onChange={handleChange}
            required
          />
          <TextField
            label="Nom"
            name="lastname"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.lastname}
            onChange={handleChange}
            required
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            label="Numéro de téléphone"
            name="phoneNumber"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            inputProps={{
              maxLength: 8, // Limit to a maximum of 8 digits
              pattern: '[0-9]*', // Only allow numeric input
            }}
          />
          <TextField
            label="Mot de passe"
            name="password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            required
            inputProps={{
                maxLength: 16, // Limit to a maximum of 8 digits
              }}
          />
          <FormControlLabel
            control={
              <Checkbox
                name="isPublisher"
                checked={formData.isPublisher}
                onChange={handleChange}
                color="primary"
              />
            }
            label="Propriétaire de salle "
          />
          <br/> <br/>
          <Button type="submit" variant="contained" style={{ backgroundColor: '#333' }} fullWidth>
            S'inscrire
          </Button>
        </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Register;
