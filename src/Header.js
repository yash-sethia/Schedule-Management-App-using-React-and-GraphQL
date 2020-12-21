import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav } from 'react-bootstrap'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


function Header() {
  const classes = useStyles();
    return (
      <div className={classes.root}>
        <Navbar expand="lg" variant="light" bg="primary" sticky="top">
            <Container>
                <Navbar.Brand href="/" style={{color: 'white', fontWeight: 500}}>Schedule Management App</Navbar.Brand>
                <Nav className="justify-content-end" href='/NewSchedulePageOne'>
                  <IconButton aria-label="add" style={{color: "white", display: 'inline', fontSize: "50px"}} onClick={() => window.location.href = '/NewSchedulePageOne'} >
                    <AddCircleOutlineIcon style={{fontSize: '2rem'}} />
                  </IconButton>
                </Nav>
            </Container>
        </Navbar> 

      </div>
    );
}

export default Header;
