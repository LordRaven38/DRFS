import React from 'react';
//import { makeStyles } from '@mui/styles';
import {
  Container,
  TextField,
  Button,
  Typography,
  Link,
  createTheme,
  ThemeProvider,
  Card,
  Paper,
  CardActionArea,
  CardMedia,
  Grid,
  Box,
  CardContent
} from '@mui/material';
import { light } from '@mui/material/styles/createPalette';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router';

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

const styles ={
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: darkTheme.spacing(8),
  },
  form: {
    width: '100%',
    marginTop: darkTheme.spacing(1),
  },
  submit: {
    margin: darkTheme.spacing(3, 0, 2),
  },
}

const Login = () => {
  const classes = styles;
  const navigate=useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email=event.target.email.value;
    const password=event.target.password.value;
    axios.get('user/login', {params: {
      username: email,
      password: password
    }, withCredentials: true}).then(
      (res)=>{
        localStorage.setItem('user_object', JSON.stringify(res.data['profile']))
        navigate('/walletLogin')
        //console.log(res.data)
      }
    ).catch(
      (err)=>{
        console.log(err)
      }
    )
    
  };

  return (
    <ThemeProvider theme={darkTheme}>
    <Grid container direction='row' display='flex'>

      <Grid item alignItems='center' justifyContent='center' display='flex' minHeight={'100vh'} xs={6} md={6} lg={6}
        >
          <Box component='img'
          src={require('../media/illustrations/login.jpg')}
          sx={{objectFit: 'contain', maxWidth: '50vw', maxHeight: '70vh'}}/>
      </Grid>

      <Grid item  alignItems='center' justifyContent='center' display='flex' minHeight={'100vh'} xs={6} md={6} lg={6}
      sx={{ width: '100pc'}}
      >
        <Box display='flex' sx={{
          width: '50%', 
          minHeight: '50%',
          borderRadius: '10px',
          boxShadow: '5px 5px 9px rgba(255,255,255,0.45), 5px 5px 9px rgba(94,104,121,0.3)',
          backgroundColor: '#3a7bd5',
          background: 'linear-gradient(to right, #3a7bd5, #3a6073)'
          }}>
        <Box display='flex' flexDirection='column' sx={{objectFit: 'contain'}}>
          <CardMedia component='img'
          image={require('../media/syslogo-White.png')}
          height='150'
          sx={{objectFit: "contain", marginTop: '2pc'}}
          />
          <CardContent>
          <Box display='flex' flexDirection='column'>
            <Typography sx={{color: "#fff"}} component="h1" variant="h5">
              Log In
            </Typography>
            <form  onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                id="email"
                label="Email Address"
                name="email"
                fullWidth
                autoComplete="email"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                name="password"
                label="Password"
                type="password"
                id="password"
                fullWidth
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Log In
              </Button>
              <Link href="#" variant="body2">
                Forgot Password?
              </Link>
              <Link sx={{float: 'right'}} onClick={()=>{navigate('/register')}} variant="body2">
                Register
              </Link>
            </form>
            </Box>
          </CardContent>
          </Box>
        </Box>
      </Grid>
      
    </Grid>
      {/*  */}
    {/* </Container> */}
    </ThemeProvider>
  );
};

export default Login;
