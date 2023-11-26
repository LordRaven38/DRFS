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
    Tooltip,
    Collapse,
    IconButton,
    Alert,
    AlertTitle,
    ListItem,
    ListItemButton,
    ListItemText,
    List,
    Checkbox,
    ListSubheader,
    ListItemIcon
  } from '@mui/material';

import {appCallReadOnlyFunction, issueNFT, transferNFT} from '../../functions/contractCall'
import { uintCV } from '@stacks/transactions';
import CloseIcon from '@mui/icons-material/Close'
import axios from 'axios'
import { useState, useEffect } from 'react';
import $ from 'jquery'
import MoveDownIcon from '@mui/icons-material/MoveDown';
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend';
import { myStxAddress } from '../../functions/auth';

function TransferBlock() {

    const [isError, setError]=useState(false)
    const [errorMessage, setErrorMessage]=useState('')
    const [isSuccess, setSuccess]=useState(false)
    const [successMessage, setSuccessMessage]=useState('')
    const [requestArray, setRequestArray]=useState([])
    const [checked, setChecked]=useState([])

    const fetchRequests=async ()=>{
        axios.get('/utils/getunapprovedrequests').then(
            (res)=>{
                setRequestArray(res.data)
            }
        )
    }

    useEffect(()=>{
      fetchRequests()
    },[])

    const handleToggle=(objectID)=>{
      const currentIndex= checked.indexOf(objectID)
      const newChecked = [...checked]

      if (currentIndex === -1)
      {
        newChecked.push(objectID)
      } else {
        newChecked.splice(currentIndex,1)
      }

      setChecked(newChecked)
    }

    const approveRequests= async ()=>{
      if(checked.length===0)
      {
          setErrorMessage('Please select one or more request to approve.')
          setError(true)
          return;
      }
      else{
        try{
          axios.get('/utils/ping').then(
            (res)=>{
              if(res.status===200)
              {
                for(let i=0;i<checked.length;i++)
            {
              const requestID=checked[i];
              console.log()
              try {
                axios.get('/utils/getTokenByRequestID', {params: {
                  id: requestID
                }}).then(
                  async (res)=>{
                    const obj=res.data.tokenID
                    const token=JSON.parse(obj)
                    const tokenID=uintCV(parseInt(token.value)+1)

                    try {
                      const response=await transferNFT(tokenID, myStxAddress())
                      if(response.status===200)
                      {
                        axios.get('/utils/approveTransferRequest', {params: {
                          approver_address: myStxAddress(),
                          requestID: requestID
                        }}).then(
                          (res)=>{
                            if(res.status!==200){
                              setErrorMessage(res.data)
                              setError(true)
                            }
                            else {
                              fetchRequests()
                            }
                          }
                        )
                      }
                    } catch (error) {
                      setErrorMessage(error.message)
                      setError(true)
                    }

                  }
                ).catch((error)=>{
                  setErrorMessage(error.message)
                  setError(true)
                })
              } catch (error) {
                setErrorMessage(error.message)
                setError(true)
              }
            }
            
              }
            }
          ).catch((error)=>{
            setErrorMessage(error.message)
            setError(true)
          })
            
          }catch (error){
            setErrorMessage(error.message)
            setError(true)
        }
        
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
                        <Typography sx={{color: '#fff', fontWeight: 'bold' }} variant='h5'> <MoveDownIcon /> TRANSFER</Typography>
                      </Box >
                    </Box>
                  </Box>
                  
                  <Box mt={3} display='flex' alignItems='center' flexDirection='column' sx={{ height: '80%', width: '80%',}}>
                  
                  {/* <Box display='flex' flexDirection='row' sx={{height: '9%', width: '100%'}} justifyContent='center' >
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
                    
                  </Box> */}
                
                  <Box display='flex' flexDirection='row' alignItems='center' sx={{height: '100%', width: '100%',}}>
                    <Box display='flex' justifyContent='center' alignItems='center' sx={{height: '80%', width: '50%', objectFit: 'contain'}}>
                        <img src={require('../../media/illustrations/transfer.jpg')} style={{height: '100%'}} alt='mint property as a NFT'></img>
                    </Box>
                    <Box display='flex' flexDirection='column' mr={1} alignItems='center' justifyContent='center' sx={{height: '80%', width: '50%',}}>
                        <Box display='flex' mt={2} flexDirection='column' alignItems='center'
                        sx={{height: '100%', width: '100%',}}>
                            <Box display='flex'  sx={{maxHeight: '100%', height: '100%', width: '100%', borderRadius: '10px',
                  boxShadow: '5px 5px 9px rgba(255,255,255,0.45), 5px 5px 9px rgba(94,104,121,0.3)'}}>
                                <List subheader={<ListSubheader sx={{textAlign: 'center', fontWeight: 'bold'}}>Pending Transfer Requests</ListSubheader>} dense sx={{width: '100%', bgcolor: 'background.paper'}}>
                                {
                                    requestArray.map((item)=>{
                                      const labelId = `checkbox-list-secondary-label-${item}`
                                        return(
                                            <ListItem dense key={item._id} sx={{position: 'relative', overflow: 'auto'}}
                                            secondaryAction={
                                              <Checkbox edge='end' onChange={()=>handleToggle(item._id)}
                                              checked={checked.indexOf(item._id)!== -1}
                                              inputProps={{'aria-labelledby': labelId}}
                                              >
                                              </Checkbox>
                                            }
                                            >    
                                                <ListItemButton>
                                                <ListItemIcon>
                                                  <ScheduleSendIcon />
                                                </ListItemIcon>
                                                    <ListItemText id={labelId} primary={`Sender: ${item.sender}`} />
                                                </ListItemButton>
                                            </ListItem>
                                        )
                                    })
                                }
                                </List>

                            </Box>
                            <Box display='flex' mt={3} flexDirection='row' sx={{width: '100%'}} justifyContent='center'>
                                
                                <Button sx={{width: '50%'}} variant='contained' onClick={()=>{approveRequests()}}>Proceed</Button>
                            </Box>
                            
                        </Box>
                    </Box>
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
                <Box justifyContent='center' mb={5} display='flex' sx={{width: '100%', position: 'absolute'}}>
                  <Collapse in={isSuccess}>
                    <Alert severity='success' 
                    action={
                        <IconButton
                        aria-label="close"
                        color="#fff"
                        size="large"
                        onClick={() => {
                        setSuccess(false);
                        setSuccessMessage('')
                        $('#owner-wallet').val('')
                        $('#owner-cnic').val('')
                        //fetchRequests()
                        }}
                        >
                        <CloseIcon fontSize='inherit'></CloseIcon>
                        </IconButton>
                    }
                    >
                      <AlertTitle>Success</AlertTitle>
                      {successMessage}
                    </Alert>
                  </Collapse>
                </Box>
                </Box>
  )
}

export default TransferBlock