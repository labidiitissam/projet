import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { logout } from "../features/loginSlice"
import { useDispatch } from "react-redux";


const Navbar = () => {
  const dispatch = useDispatch()
  const {user}=useSelector(state=>state.auth)
  var data=null
  if(user) {
     data = JSON.parse(user)
  }
 
  return (
    <AppBar position="static" style={{ backgroundColor: '#333' }} >
      <Toolbar>
        <div style={{ flexGrow: 1 }}>
          <Button color="inherit" component={Link} to="/">Resrvi.com</Button>
        </div>
        {
          data && data.token && data.isPublisher ? <>
          <Button color="inherit" component={Link} to="/place/add">Ajouter une nouvelle Salle</Button>
          <Button color="inherit" component={Link} to="/event/reservation/list">Liste des reservations</Button>
          <Button color="inherit" component={Link} to="/event/list">Mes salles</Button>
          <Button color="inherit" component={Link} onClick={() => dispatch(logout())} to="/">Deconnexion</Button>
        </> : data && data.token && !data.isPublisher ? <>
          <Button color="inherit" component={Link} to="/reservations">Mes Réservation</Button>
          <Button color="inherit" component={Link} onClick={() => dispatch(logout())} to="/">Deconnexion</Button>
        </> :
          <>
            <Button color="inherit" component={Link} to="/login">Connexion</Button>
            <Button color="inherit" component={Link} to="/register">Inscription</Button>
          </>
        }
      <Button color="inherit" component={Link} to="/contact">contactez nous</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
