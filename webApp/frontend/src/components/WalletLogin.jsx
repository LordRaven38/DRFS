import React from 'react';
//import { makeStyles } from '@mui/styles';
import {
  Button,
  Typography,
  createTheme,
  ThemeProvider,
  Grid,
  Box,
} from '@mui/material';
import { showConnect } from '@stacks/connect';
import { Navigate, useNavigate } from 'react-router';
import { myStxAddress } from '../functions/auth';
import axios from 'axios'
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

const WalletLogin = () => {
  const classes = styles;
  const navigate=useNavigate();
  const userObject=JSON.parse(localStorage.getItem('user_object'))

  const logout =async()=>{
    axios.get('user/logout',{withCredentials: true}).then(
      (res)=>{
        console.log(res.data)
        localStorage.removeItem('user_object')
        navigate('/login')
      }
    ).catch(
      (err)=>{
        console.log(err.message)
      }
    )
    }

  const login= async ()=>{
    try{
      showConnect({
        appDetails: {
          name: "Urbane",
          icon: "https://www.svgrepo.com/show/217623/contract.svg"
        },
        onFinish: ()=>{
          if(myStxAddress()===userObject.wallet_address)
          {
            navigate('/retrieve')
          }
          else logout()
          
        }
      })
    } catch(err){
      console.log(err)
    }
      
    }

  return (
    <ThemeProvider theme={darkTheme}>
    <Grid container direction='row' display='flex'>

      <Grid item alignItems='center' justifyContent='center' display='flex' minHeight={'100vh'} xs={6} md={6} lg={6}
        >
          <Box component='img'
          src={require('../media/illustrations/wallet.jpg')}
          sx={{objectFit: 'contain', maxWidth: '50vw', maxHeight: '70vh'}}/>
      </Grid>

      <Grid item  alignItems='center' justifyContent='center' display='flex' minHeight={'100vh'} xs={6} md={6} lg={6}
      sx={{ width: '100pc'}}
      >
        <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' sx={{
          width: '50%', 
          minHeight: '50%',
          }}>

          <Box display='flex'  justifyContent='center'>
            <Typography sx={{background: "-webkit-linear-gradient(45deg, #3a7bd5 30%, #3a6073 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"}}
            variant='h2'>One more step...</Typography>
          </Box>

          <Box mt={5} display='flex' alignItems='center' justifyContent='center' sx={{width:'100%', maxHeight: '100%',}}>
            <Box display='flex' justifyContent='center' sx={{width: '50%', minHeight: '20%',}}>
              <Button sx={{width: '100%', height:'100%', background: 'linear-gradient(to right, #00d2ff, #928dab)', color: '#fff'}} variant='contained' onClick={()=>login()}>Connect Wallet</Button>
            </Box>
          </Box>
          

        </Box>
      </Grid>
      
    </Grid>
      {/*  */}
    {/* </Container> */}
    </ThemeProvider>
  );
};

export default WalletLogin;
