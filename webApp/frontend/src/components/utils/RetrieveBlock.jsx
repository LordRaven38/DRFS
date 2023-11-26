import React from 'react'
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

import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import CloseIcon from '@mui/icons-material/Close'
import axios from 'axios'
import { useState, useEffect } from 'react';

function RetrieveBlock(props) {

    const [area, setArea]=useState('');
    const [block, setBlock]=useState('');
    const [plot, setPlot]=useState('');
    const [doc, setDoc]=useState('')
    const [areaArray, setAreaArray]=useState([]);
    const [blockArray, setBlockArray]=useState([]);
    const [plotArray, setPlotArray]=useState([]);
    const [documentArray, setDocumentArray]=useState(['fardnama','registry','noc','construction plan'])
    const [isError, setError]=useState(false)
    const [errorMessage, setErrorMessage]=useState('')

    const getAreas= ()=>{
      axios.get('/filing/fetchAreas').then(
        (res)=>{
          let value=[]
          for(let i=0;i<res.data.length;i++)
          {
            value.push(res.data[i].name)
          }
          setAreaArray(value)
        }
      )
    }

    useEffect(()=>{
      getAreas()
    },[])

    const handleAreaChange= async (value)=>{
      if(value==='')
      {
        setBlockArray([])
        setPlotArray([])
        setBlock('')
        setPlot('')
        setDoc('')
        setArea('')
      }
      else{
        setBlockArray([])
        setPlotArray([])
        
        axios.get('/filing/fetchBlocks', {params: {Area: value}}).then(
          (res)=>{
            let temp=[]
            for(let i=0;i<res.data.length; i++)
            {
              temp.push(res.data[i].name)
            }
            setBlockArray(temp)
            setArea(value)
            setBlock('')
            setPlot('')
            setDoc('')
          }
        ).catch(
          (err)=>{
            console.log(err)
          }
        )
      }
    }

    const handleBlockChange= async (value)=>{
      if(value==='')
      {
        setBlock('')
        setPlotArray([])
        setPlot('')
        setDoc('')
      }
      else{
        setPlotArray([])
        setPlot('')
        setDoc('')
        setBlock(value)
        axios.get('/filing/fetchPlots',{params: {Area: area, Block: value}}).then(
          (res)=>{
            let value=[]
            for(let i=0;i<res.data.length;i++)
            {
              value.push(res.data[i].number)
            }
            value.sort(function(a,b){return a-b})
            setPlotArray(value)
          }
        ).catch((err)=>{
          console.log(err)
        })
      }
    }

    const handlePlotChange= async (value)=>{
        setPlot(value)
    }

    const handleDocumentChange= (value)=>{
      setDoc(value)
    }

    const retrieveDocument= async()=>{
      if(area!=='' && block!=='' && plot!=='' && doc !=='')
      {
        try {
        
          axios.get('/filing/retrieveDocument', {params: {Area: area, Block: block, PlotNumber: plot, Document_Type: doc}}).then(
            (res)=>{
              props.onChange(res.data)
            }
          ).catch(
            (err)=>{
              console.log(err)
            }
          )
  
          // console.log(area)
          // console.log(block)
          // console.log(plot)
          // console.log(doc)
        } catch (error) {
          setErrorMessage(error.message)
          setError(true)
        }
      }
      else{
        setErrorMessage('Input fields are missing!')
        setError(true)
      }
    }

  return (
    <Box display ='flex' flexDirection='column' justifyContent='center' alignItems='center' sx={{
        position: 'absolute',
        backgroundColor: '#fff',
        height: '80%',
        width: '80%',
        borderRadius: '10px',
        boxShadow: '5px 5px 9px rgba(255,255,255,0.45), 5px 5px 9px rgba(94,104,121,0.3)'
        }}>
        <Box flex flexDirection='row' sx={{height: '8%', width: '100%'}}>
          <Box  display='flex' sx={{height:'100%', width: '20%', backgroundColor: '#3a7bd5', background: 'linear-gradient(to right, #3a7bd5, #3a6073)', clipPath: 'polygon(0% 0%, 100% 0%, calc(100% - 20px) 50%, 100% 100%, 0% 100%)'}}>
            <Box display='flex' justifyContent='center' alignItems='center' sx={{width: '80%'}} flexDirection='row'>
              <Typography sx={{color: '#fff', fontWeight: 'bold' }} variant='h5'><SystemUpdateAltIcon /> RETRIEVE</Typography>
            </Box >
          </Box>
        </Box>
        
        <Box mt={5} display='flex' alignItems='center' flexDirection='column' sx={{ height: '80%', width: '80%', }}>
        
        <Box display='flex' flexDirection='row' sx={{height: '9%', width: '100%'}} justifyContent='center' >
          <Tooltip title='Select the area of the property' placement='top' arrow>
          <Autocomplete
              disablePortal
              id="area"
              options={areaArray}
              onInputChange={(event,value)=>{handleAreaChange(value)}}
              sx={{ width: '30%' }}
              renderInput={(params) => <TextField {...params} label="Area" />}
          />
          </Tooltip>
          <Tooltip title='Select the block of the property' placement='top' arrow>
          <Autocomplete
              disablePortal
              id="block"
              options={blockArray}
              onInputChange={(event, value)=>{handleBlockChange(value)}}
              sx={{ width: '30%' }}
              renderInput={(params) => <TextField {...params} label="Block" />}
          />
          </Tooltip>
          <Tooltip title='Select the plot number of the property' placement='top' arrow>
          <Autocomplete
              disablePortal
              id="plot"
              options={plotArray}
              onInputChange={(event, value)=>{handlePlotChange(value)}}
              sx={{ width: '30%' }}
              renderInput={(params) => <TextField {...params} label="Plot" />}
          />
          </Tooltip>
          <Tooltip title='Select the type of the document to retrieve' placement='top' arrow>
          <Autocomplete
              disablePortal
              id="block"
              options={documentArray}
              onInputChange={(event,value)=>{handleDocumentChange(value)}}
              sx={{ width: '30%' }}
              renderInput={(params) => <TextField {...params} label="Block" />}
          />
          </Tooltip>
          <Box ml={1}sx={{height: '100%'}}>
          <Button sx={{height: '100%'}} variant='contained' onClick={()=>{retrieveDocument()}}>Retrieve</Button>
          </Box>
        </Box>

        <Box mt={2} display='flex' justifyContent='center' alignItems='center' sx={{height: '80%', width: '80%', objectFit: 'contain'}}>
          <img src={require('../../media/illustrations/retrieve.jpg')} style={{height: '100%'}} alt='retrieve documents from decentralized storage'></img>
        </Box>
        </Box>
        <Box justifyContent='center' mb={5} display='flex' sx={{width: '100%', position: 'absolute'}}>
        <Collapse in={isError}>
          <Alert severity='error' 
          action={
              <IconButton
              aria-label="close"
              color="#fff"
              size="large"
              onClick={() => {
              setError(false);
              setErrorMessage('')
              }}
              >
              <CloseIcon fontSize='inherit'></CloseIcon>
              </IconButton>
          }
          >
            <AlertTitle>Error</AlertTitle>
            {errorMessage}
          </Alert>
        </Collapse>
      </Box>
      </Box>
  )
}

export default RetrieveBlock