import React, { useEffect } from 'react'
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
    List,
    ListItem,
    ListItemText,
    ListItemButton,
    ListItemIcon,
    CardContent,
    Drawer
  } from '@mui/material';

import axios from 'axios'
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import HardwareIcon from '@mui/icons-material/Hardware';
import VerifiedIcon from '@mui/icons-material/Verified';
import MoveDownIcon from '@mui/icons-material/MoveDown';
import { useNavigate } from 'react-router';
import { myStxAddress } from '../../functions/auth';



const Navbar=()=>{
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

    useEffect(()=>{
      setTimeout(()=>{
        logout()
      },55*60*1000) 
    },[])
    
    if(userObject.role==='admin')
    {
    return(
        <Grid item display='flex' xs={2} md={2} lg={2} sx={{backgroundColor: '#333', height: '100vh', position: 'relative'}}>
                    <Box alignItems='center' display='flex' flexDirection='column' sx={{width: '100%', backgroundColor: '#3a7bd5', background: 'linear-gradient(to right, #3a7bd5, #3a6073)' }}>
                      <Box mt={2}></Box>
                      <Box  sx={{height: '25%', width: '80%', backgroundColor: 'transparent',}}>
                      <CardMedia
                      sx ={{
                        height:'100%',
                        width: '100%',
                        objectFit: 'contain'
                      }}
                      image={require('../../media/syslogo-White.png')}
                      >

                      </CardMedia>
                      </Box>
                      <Box display='flex' alignItems='center' justifyContent='center'  sx={{height: '40%', width: '80%'}}>
                        <Box display='flex' flexDirection='column' alignItems='center' justifyContent='space-between' sx={{height: '85%', width: '80%' }} >
                        <Button onClick={()=>{navigate('/upload')}} sx={{background: 'linear-gradient(to right, #00d2ff, #928dab)'}} fullWidth variant='contained' startIcon={<DriveFolderUploadIcon />}>Upload</Button>
                        <Button onClick={()=>{navigate('/retrieve')}} sx={{background: 'linear-gradient(to right, #00d2ff, #928dab)'}} fullWidth variant='contained' startIcon={<SystemUpdateAltIcon />}>Retrieve</Button>
                        <Button onClick={()=>{navigate('/mint')}} sx={{background: 'linear-gradient(to right, #00d2ff, #928dab)'}} fullWidth variant='contained' startIcon={<HardwareIcon />}>Mint NFT</Button>
                        <Button onClick={()=>{navigate('/verify')}} sx={{background: 'linear-gradient(to right, #00d2ff, #928dab)'}} fullWidth variant='contained' startIcon={<VerifiedIcon />}>Verify </Button>
                        <Button onClick={()=>{navigate('/transfer')}} sx={{background: 'linear-gradient(to right, #00d2ff, #928dab)'}} fullWidth variant='contained' startIcon={<MoveDownIcon />}>Transfer </Button>
                        <Button onClick={()=>{navigate('/generate-request')}} sx={{background: 'linear-gradient(to right, #00d2ff, #928dab)'}} fullWidth variant='contained' startIcon={<MoveDownIcon />}>Request </Button>
                        </Box>
                      </Box>
                      <Box sx={{height: '33%', width: '80%', backgroundColor: '#fff', borderRadius: '5px',}}>
                      <Box display='flex'  alignItems='center' flexDirection='column'  sx={{height: '100%', width: '100%',}}>
                            <Box display='flex' sx={{ objectFit: 'contain', height: '40%', width: '50%',}}>
                            <img src={require('../../media/profile-default.png')} />
                            </Box>
                            <Box display='flex' mt={2} sx= {{width:'100%'}}>
                            <Typography ml={2}>Name: {`${userObject.username}`}<br />Role: {`${userObject.role}`} <br />Wallet: <Link onClick={()=>{navigator.clipboard.writeText(myStxAddress())}}>Copy</Link></Typography>
                            </Box>
                            <Box mt={1}></Box>
                            <Button variant='outlined' onClick={()=>logout()}>Log Out</Button>
                            
                      </Box>
                      </Box>
                      <Box mb={1}></Box>
                    </Box>
            </Grid>
    )}
    return (
      <Grid item display='flex' xs={2} md={2} lg={2} sx={{backgroundColor: '#333', height: '100vh', position: 'relative'}}>
                    <Box alignItems='center' display='flex' flexDirection='column' sx={{width: '100%', backgroundColor: '#3a7bd5', background: 'linear-gradient(to right, #3a7bd5, #3a6073)' }}>
                      <Box mt={2}></Box>
                      <Box  sx={{height: '25%', width: '80%', backgroundColor: 'transparent',}}>
                      <CardMedia
                      sx ={{
                        height:'100%',
                        width: '100%',
                        objectFit: 'contain'
                      }}
                      image={require('../../media/syslogo-White.png')}
                      >

                      </CardMedia>
                      </Box>
                      <Box display='flex' alignItems='center' justifyContent='center'  sx={{height: '20%', width: '80%'}}>
                        <Box display='flex' flexDirection='column' alignItems='center' justifyContent='space-between' sx={{height: '85%', width: '80%' }} >
                        
                        <Button onClick={()=>{navigate('/retrieve')}} sx={{background: 'linear-gradient(to right, #00d2ff, #928dab)'}} fullWidth variant='contained' startIcon={<SystemUpdateAltIcon />}>Retrieve</Button>
                        <Button onClick={()=>{navigate('/verify')}} sx={{background: 'linear-gradient(to right, #00d2ff, #928dab)'}} fullWidth variant='contained' startIcon={<VerifiedIcon />}>Verify </Button>
                        <Button onClick={()=>{navigate('/generate-request')}} sx={{background: 'linear-gradient(to right, #00d2ff, #928dab)'}} fullWidth variant='contained' startIcon={<MoveDownIcon />}>Request </Button>
                        </Box>
                      </Box>
                      <Box mt={15} sx={{height: '33%', width: '80%', backgroundColor: '#fff', borderRadius: '5px',}}>
                      <Box display='flex'  alignItems='center' flexDirection='column'  sx={{height: '100%', width: '100%',}}>
                            <Box display='flex' sx={{ objectFit: 'contain', height: '40%', width: '50%',}}>
                            <img src={require('../../media/profile-default.png')} />
                            </Box>
                            <Box display='flex' mt={2} sx= {{width:'100%'}}>
                            <Typography ml={2}>Name: {`${userObject.username}`}<br />Role: {`${userObject.role}`} <br />Wallet: <Link onClick={()=>{navigator.clipboard.writeText(myStxAddress())}}>Copy</Link></Typography>
                            </Box>
                            <Box mt={1}></Box>
                            <Button variant='outlined' onClick={()=>logout()}>Log Out</Button>
                            
                      </Box>
                      </Box>
                      <Box mb={1}></Box>
                    </Box>
            </Grid>
    )
}

export default Navbar;