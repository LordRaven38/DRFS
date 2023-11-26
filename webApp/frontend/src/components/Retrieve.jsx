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
    Tooltip, Modal,
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
import RetrieveBlock from './utils/RetrieveBlock';

  const darkTheme = createTheme({
    palette: {
      mode: 'light',
    },
  });

  const Retrieve= ()=> {
    const [showDocument, setShowDocument]=useState(false);
    const [file, setFile]=useState('')

    const displayDocument=(fileval)=>{
      setFile(fileval)
      setShowDocument(true)
    }

    return(
        <ThemeProvider theme={darkTheme}>
            <Grid maxHeight='100vh' container display='flex' direction='row'>
                <Navbar />
                <Grid item display='flex' alignItems='center' justifyContent='center' xs={10} md={10} lg={10}
                sx={{maxHeight: '100vh', position: 'relative'}}
                >
               
                <Particle />
                <RetrieveBlock onChange={displayDocument}/>
                
                </Grid>
                <Modal
                sx={{
                        display: 'flex',
                        p: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    open={showDocument} onClose={()=>{setShowDocument(false)}}>
                    
                    <iframe title='Document' src={'https://'+file.doc_cid+'.ipfs.w3s.link/'+file.name} style={{height: '100%', width:'80%'}}></iframe>
                </Modal>
            </Grid>
            
            
        </ThemeProvider>
    )
  }

  export default Retrieve