import React, { useState,useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useNavigate } from "react-router-dom"
import { useDispatch,useSelector } from "react-redux";
import { login,reset } from "../../features/loginSlice"
import { notify } from '../../utils/notif';
import LockIcon from '@material-ui/icons/Lock';
import {Paper} from '@mui/material';


const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if(isError) {
      notify(message.Message,true)
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleSubmit =  (e) => {
    e.preventDefault();
    const formData = {
      email: email,
      password: password
    }
    dispatch(login(formData)).
    then(res=>res.meta.requestStatus==="fulfilled" ? navigate('/'):"")
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '80vh' }}>
      <Grid item xs={12} sm={6} md={4}>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <LockIcon  style={{ fontSize: 48 }} />
        </div>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br /><br />
          <Button variant="contained" type="submit" style={{ backgroundColor: '#333' }} fullWidth>
            Login
          </Button>
        </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Login;
