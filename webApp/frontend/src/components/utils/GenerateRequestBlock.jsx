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
    AlertTitle
  } from '@mui/material';

import {appCallReadOnlyFunction, generateTransferRequest} from '../../functions/contractCall'
import { uintCV } from '@stacks/transactions';
import CloseIcon from '@mui/icons-material/Close'
import axios from 'axios'
import { useState, useEffect } from 'react';
import $ from 'jquery'
import MoveDownIcon from '@mui/icons-material/MoveDown';

import { myStxAddress } from '../../functions/auth';

function MintBlock() {
    const [area, setArea]=useState('');
    const [block, setBlock]=useState('');
    const [plot, setPlot]=useState('');
    const [areaArray, setAreaArray]=useState([]);
    const [blockArray, setBlockArray]=useState([]);
    const [plotArray, setPlotArray]=useState([]);
    const [recipientCNIC, setRecipientCNIC]=useState('')
    const [recipientAddress, setRecipientAddress]=useState('')
    const [isError, setError]=useState(false)
    const [errorMessage, setErrorMessage]=useState('')
    const [isSuccess, setSuccess]=useState(false)
    const [successMessage, setSuccessMessage]=useState('')
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
      ).catch(
            (err)=>{
            setErrorMessage(err.message)
            setError(true)
      })
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
          }
        ).catch(
          (err)=>{
            setErrorMessage(err.message)
            setError(true)
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
      }
      else{
        setPlotArray([])
        setPlot('')
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
            setErrorMessage(err.message)
            setError(true)
        })
      }
    }

    const handlePlotChange= async (value)=>{
      if(value===''){
        setPlot('')
      }
      else{
        setPlot(value)
      }
    }
    
    const transferOwnership = async ()=>{
        if (area==='' || block==='' || plot ==='' || recipientCNIC === '' || recipientAddress === '') {
            setErrorMessage('Input fields are missing.')
            setError(true)
        } else {
            try {
                axios.get('/utils/getProperty', { params: {
                    Area: area,
                    Block: block,
                    PlotNumber: plot,
                    Document_Type: 'fardnama'
                }}).then(
                    async (res)=>{
                        const document=res.data['document']
                        const token=JSON.parse(document.nft_uri)
                        const tokenID=uintCV(parseInt(token.value)+1)

                        try {
                           //check if generator is owner
                           try {
                            const response=await appCallReadOnlyFunction({
                                contractAddress: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
                                contractName: 'NFTMinter',
                                functionName: "get-owner",
                                functionArgs: [
                                    tokenID
                                ]
                            })
                            const retrievedWallet=response.value.value.value
                            if(myStxAddress()===retrievedWallet)
                            {
                                const response=await generateTransferRequest(tokenID, myStxAddress(),recipientAddress)
                                console.log(response)
                                if(response.status===200)
                                {
                                    axios.get('/utils/addTransferRequest', {params: {
                                        sender: myStxAddress(),
                                        reciever: recipientAddress,
                                        tokenID: JSON.stringify(token)
                                    }}).then(
                                        (res)=>{
                                            setSuccessMessage('Request generated successfully.')
                                            setSuccess(true)
                                        }
                                    ).catch((err)=>{
                                        setErrorMessage(err.message)
                                        setError(true)
                                    })
                                }
                            }
                            else {
                                setErrorMessage('Given wallet address is not the owner of the selected property')
                                setError(true)
                            }
                           } catch (error) {
                            setErrorMessage(error.message)
                            setError(true)
                           }
                        } catch (error) {
                            setErrorMessage(error.message)
                            setError(true)
                        }
                    }
                )

            } catch (error) {
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
                    <Box  display='flex' sx={{height:'100%', width: '44%', backgroundColor: '#3a7bd5', background: 'linear-gradient(to right, #3a7bd5, #3a6073)', clipPath: 'polygon(0% 0%, 100% 0%, calc(100% - 20px) 50%, 100% 100%, 0% 100%)'}}>
                      <Box display='flex' justifyContent='center' alignItems='center' sx={{width: '80%'}} flexDirection='row'>
                        <Typography sx={{color: '#fff', fontWeight: 'bold' }} variant='h5'> <MoveDownIcon /> Request Ownership Transfer</Typography>
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
                    
                  </Box>
                
                  <Box mt={2} display='flex' flexDirection='row' alignItems='center' sx={{height: '80%', width: '80%',}}>
                    <Box display='flex' justifyContent='center' alignItems='center' sx={{height: '80%', width: '50%', objectFit: 'contain'}}>
                        <img src={require('../../media/illustrations/generate-request.jpg')} style={{height: '100%'}} alt='mint property as a NFT'></img>
                    </Box>
                    <Box display='flex' flexDirection='column' mr={1} alignItems='center' justifyContent='center' sx={{height: 'auto', width: '100%',}}>
                        <Box display='flex' justifyContent='center' sx={{width: '100%'}}>
                            <Box display='flex'>
                            <Typography variant='h4' sx={{textAlign: 'center'}}>Enter Recipient Info...</Typography>
                            </Box>
                        </Box>
                        <Box display='flex' mt={2} flexDirection='column' alignItems='center'
                        sx={{height: '70%', width: '100%'}}>
                            <Box display='flex' flexDirection='row' sx={{width: '100%'}}>
                                <Box display='flex' sx={{width: '50%'}} mr={1}>
                                <Tooltip>
                                    <TextField id="owner-wallet" label="Recipient's Wallet" variant="filled" onChange={(e)=>{setRecipientAddress(e.target.value)}} fullWidth/>
                                </Tooltip>
                                </Box>

                                <Box display='flex' sx={{width: '50%'}}>
                                <Tooltip>
                                    <TextField id="owner-cnic" label="Recipient's CNIC" variant="filled" onChange={(e)=>setRecipientCNIC(e.target.value)} fullWidth/>
                                </Tooltip>
                                </Box>

                            </Box>
                            <Box display='flex' mt={3} flexDirection='row' sx={{width: '100%'}} justifyContent='center'>
                                
                                <Button sx={{width: '50%'}} variant='contained' onClick={()=>{transferOwnership()}}>Proceed</Button>
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

export default MintBlock