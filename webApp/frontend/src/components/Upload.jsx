import React, { useEffect } from 'react'
import './particle.css'
import $ from 'jquery'
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
    AlertTitle,
    Alert,
    Collapse,
    IconButton
} from '@mui/material';

import Navbar from './utils/Navbar';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { useState } from 'react';
import Particle from './Particle'
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close'
import UploadBlock from './utils/UploadBlock';


  const darkTheme = createTheme({
    palette: {
      mode: 'light',
    },
  });


  const Upload= ()=> {
    

    return(
        <ThemeProvider theme={darkTheme}>
            <Grid maxHeight='100vh' container display='flex' direction='row'>
                <Navbar />
                <Grid item display='flex' alignItems='center' justifyContent='center' xs={10} md={10} lg={10}
                sx={{maxHeight: '100vh', position: 'relative'}}
                >
               
                <Particle />
                <UploadBlock />
                </Grid>
                
            </Grid>
        </ThemeProvider>
    )
  }

  export default Upload