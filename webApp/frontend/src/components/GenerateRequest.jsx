import React from 'react'
import './particle.css'
import {
    TextField,
    Button,
    Typography,
    createTheme,
    ThemeProvider,
    Grid,
    Box,
    Autocomplete,
    Tooltip,
    Collapse,
    IconButton,
    Alert,
    AlertTitle
  } from '@mui/material';

import Navbar from './utils/Navbar';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import CloseIcon from '@mui/icons-material/Close'
import Particle from './Particle'
import axios from 'axios'
import { useState, useEffect } from 'react';
import GenerateRequestBlock from './utils/GenerateRequestBlock';

  const darkTheme = createTheme({
    palette: {
      mode: 'light',
    },
  });

  const GenerateRequest= ()=> {
    


    return(
        <ThemeProvider theme={darkTheme}>
            <Grid maxHeight='100vh' container display='flex' direction='row'>
                <Navbar />
                <Grid item display='flex' alignItems='center' justifyContent='center' xs={10} md={10} lg={10}
                sx={{maxHeight: '100vh', position: 'relative'}}
                >
               
                <Particle />
                <GenerateRequestBlock />
                </Grid>
            </Grid>
            
            
        </ThemeProvider>
    )
  }

  export default GenerateRequest