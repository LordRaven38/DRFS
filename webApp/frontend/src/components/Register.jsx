import React, {useState} from 'react';
//import { makeStyles } from '@mui/styles';
import {
  TextField,
  Button,
  Typography,
  Link,
  ThemeProvider,
  Grid,
  Box,
} from '@mui/material';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import axios from 'axios';
import { useNavigate } from 'react-router';



const Register = () => {
    const navigate=useNavigate();
    const [name, setName]=useState('')
    const [email, setEmail]=useState('')
    const [password, setPassword]=useState('')
    const [age, setAge]=useState('')
    const [cnic, setCNIC]=useState('')
    const [walletAddress, setWalletAddress]=useState('')

  const handleSubmit = async (event) => {
    axios.get('user/register', {params: {
      name: name,
      email: email,
      password: password,
      cnic: cnic,
      wallet_address: walletAddress,
      age: age
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
    
    <Grid container direction='row' display='flex'>

      <Grid item alignItems='center' justifyContent='center' display='flex' minHeight={'100vh'} xs={6} md={6} lg={6}
        >
          <Box component='img'
          src={require('../media/illustrations/register.jpg')}
          sx={{objectFit: 'contain', maxWidth: '50vw', maxHeight: '70vh'}}/>
      </Grid>

      <Grid item  alignItems='center' justifyContent='center' display='flex' minHeight={'100vh'} xs={6} md={6} lg={6}
      sx={{ width: '100pc',}}
      >
        <Box display='flex' flexDirection='column' sx={{width: '80%',height: '80%',}}>
        <Typography sx={{background: "-webkit-linear-gradient(45deg, #3a7bd5 30%, #3a6073 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"}} variant='h2'>Create account</Typography>
            
            <Box mt={5} display='flex' flexDirection='row'>
                <Box sx={{width: '50%'}}>
                    <TextField variant='filled' onChange={(e)=>{setName(e.target.value)}} id='name' label='Name' fullWidth></TextField>
                </Box>
                <Box ml={1} sx={{width: '50%'}}>
                    <TextField variant='filled' onChange={(e)=>{setEmail(e.target.value)}} id='email' label='Email' fullWidth></TextField>
                </Box>
            </Box>
            <Box mt={5} display='flex' flexDirection='row'>
                <Box sx={{width: '50%'}}>
                    <TextField variant='filled' type='password' onChange={(e)=>{setPassword(e.target.value)}} id='password' label='Password' fullWidth></TextField>
                </Box>
                <Box ml={1} sx={{width: '50%'}}>
                    <TextField variant='filled' onChange={(e)=>{setWalletAddress(e.target.value)}} id= 'wallet-address'label='Wallet Address' fullWidth></TextField>
                </Box>
                
            </Box>
            <Box mt={5} display='flex' flexDirection='row'>
                <Box sx={{width: '50%'}}>
                    <TextField variant='filled' onChange={(e)=>setCNIC(e.target.value)} id='cnic' label='CNIC' fullWidth></TextField>
                </Box>
                <Box ml={1} sx={{width: '50%'}}>
                    <TextField variant='filled' onChange={(e)=>{setAge(e.target.value)}} id='age' label='Age' fullWidth></TextField>
                </Box>
            </Box>
            <Box mt={3} display='flex' alignSelf='center' sx={{width:'80%'}}>
                <Button variant='contained' onClick={()=>{handleSubmit()}} fullWidth startIcon={<HowToRegIcon />}>Register</Button>
            </Box>
            <Box mt={1} display='flex' sx={{width: '50%'}}>
            <Link onClick={()=>{navigate('/login')}}>Already registered? Login.</Link>
            </Box>
        </Box>
      </Grid>
      
    </Grid>
    
  );
};

export default Register;
