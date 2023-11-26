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

import {appCallReadOnlyFunction, issueNFT} from '../../functions/contractCall'
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import CloseIcon from '@mui/icons-material/Close'
import axios from 'axios'
import { useState, useEffect } from 'react';
import bcrypt from 'bcryptjs'
import $ from 'jquery'
import HardwareIcon from '@mui/icons-material/Hardware';


function MintBlock() {
    const [area, setArea]=useState('');
    const [block, setBlock]=useState('');
    const [plot, setPlot]=useState('');
    const [areaArray, setAreaArray]=useState([]);
    const [blockArray, setBlockArray]=useState([]);
    const [plotArray, setPlotArray]=useState([]);
    const [ownerCNIC, setOwnerCNIC]=useState('')
    const [ownerAddress, setOwnerAddress]=useState('')
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

    const mintNFT= async ()=>{
      var propertyRecord={}
      var doc_cid='';

      if(area==='' || block==='' || plot==='' || ownerAddress==='' || ownerCNIC==='')
      {
        setErrorMessage('Required input fields are missing.')
        setError(true)
      }

      else{
        axios.get('/utils/getProperty', { params: {
          Area: area,
          Block: block,
          PlotNumber: plot,
          Document_Type: 'fardnama'
        }}).then(
          async (res)=>{
            propertyRecord=res.data['document']
            console.log(propertyRecord)
            doc_cid=propertyRecord.doc_cid

            
           if(propertyRecord.nft_uri!=='')
            {
              setErrorMessage('NFT already minted')
              setError(true)
              return
            }
            try {
              const token= await appCallReadOnlyFunction({
                contractAddress: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
                contractName: 'NFTMinter',
                functionName: 'get-last-token-id',
                functionArgs: [

                ],
              });

              const resp=await issueNFT(ownerAddress, bcrypt.hashSync(doc_cid, 10), ownerCNIC, doc_cid)

              if(resp.status === 200) {
                axios.get('utils/addNFTtoken', {
                  params: {
                    token: JSON.stringify(token['value']),
                    document: propertyRecord
                  }
                  
                }).then(()=>{
                  setSuccessMessage('NFT minted successfully')
                  setSuccess(true)
                }).catch((err)=>{
                  setErrorMessage(err.message)
                  setError(true)
                })
              }

            } catch (error) {
              setErrorMessage(error.message)
              setError(true)
              
            }

          }
        ).catch(
          (err)=>{
            setErrorMessage(err.message)
            setError(true)
          }
        )
      }
    }
    
    // const mintNFT=()=>{
    //   setSuccessMessage('NFT minted successfully!')
    //   setSuccess(true)
    // }

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
                        <Typography sx={{color: '#fff', fontWeight: 'bold' }} variant='h5'><HardwareIcon /> MINT</Typography>
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
                        <img src={require('../../media/illustrations/mint-nft.jpg')} style={{height: '100%'}} alt='mint property as a NFT'></img>
                    </Box>
                    <Box display='flex' flexDirection='column' mr={1} alignItems='center' justifyContent='center' sx={{height: 'auto', width: '100%',}}>
                        <Box display='flex' justifyContent='center' sx={{width: '100%'}}>
                            <Box display='flex'>
                            <Typography variant='h4' sx={{textAlign: 'center'}}>Enter Owner Info...</Typography>
                            </Box>
                        </Box>
                        <Box display='flex' mt={2} flexDirection='column' alignItems='center'
                        sx={{height: '70%', width: '100%'}}>
                            <Box display='flex' flexDirection='row' sx={{width: '100%'}}>
                                <Box display='flex' sx={{width: '50%'}} mr={1}>
                                <Tooltip>
                                    <TextField id="owner-wallet" label="Wallet Address" variant="filled" onChange={(e)=>{setOwnerAddress(e.target.value)}} fullWidth/>
                                </Tooltip>
                                </Box>

                                <Box display='flex' sx={{width: '50%'}}>
                                <Tooltip>
                                    <TextField id="owner-cnic" label="CNIC Number" variant="filled" onChange={(e)=>setOwnerCNIC(e.target.value)} fullWidth/>
                                </Tooltip>
                                </Box>

                            </Box>
                            <Box display='flex' mt={3} flexDirection='row' sx={{width: '100%'}} justifyContent='center'>
                                
                                <Button sx={{width: '50%'}} variant='contained' onClick={()=>{mintNFT()}}>Proceed</Button>
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