const router=require('express').Router()
const Area=require('../models/Area')
const Block=require('../models/Block')
const Plot=require('../models/Plot')
const Document=require('../models/Document')
const User=require('../models/User')
const TransferRequest=require('../models/TransferRequest.js')
const authorize=require('../middleware/authorize')

router.use(authorize)
router.get('/getProperty', async (req,res)=>{
    const query=req.query
    const area=await Area.findOne({name: query.Area})
    const block=await Block.findOne({name: query.Block, area: area._id})
    const plot=await Plot.findOne({number: query.PlotNumber, area: area._id, block: block._id}).lean()
    try {
        const document=await Document.findOne({area: area._id, block: block._id, plot: plot._id, document_type: query.Document_Type }).lean()
        if(document===null)
        {
            res.send(null)
        }
        else{

            res.json({
            plot: plot,
            document: document
            })
        }
        
    } catch (error) {
        res.status(500).send()
    }
    
    

})

router.get('/addNFTtoken', async (req,res)=>{
    const data= req.query
    const token=data['token']
    console.log(token)
    
    try {
        const document=await Document.findOneAndUpdate({_id: data['document']._id}, {nft_uri: token})
        console.log(document)
        
    } catch (error) {
        console.log(error)
    }
    
})


router.get('/getuserbywallet', async(req,res)=>{
    const data=req.query['wallet']
    console.log(data)
    try {
        const user=await User.findOne({wallet_address: data}).lean()
        console.log(user)
        res.send(user)
    } catch (error) {
        console.log(error)
    }
    
})

router.get('/getwalletbycnic', async(req,res)=>{
    const data=req.query['cnic']
    console.log(data)
    try {
        const user=await User.findOne({cnic: data}).lean()
        console.log(user)
        res.send(user)
    } catch (error) {
        console.log(error)
    }
})

router.get('/getunapprovedrequests', async(req,res)=>{
    const unapprovedRequests=await TransferRequest.find({isApproved: false}).lean()
    res.send(unapprovedRequests)
})

router.get('/addTransferRequest', async(req,res)=>{
    const data=req.query
    try {
        const sender=data['sender']
        const reciever=data['reciever']
        const request=await TransferRequest.create({tokenID: data['tokenID'], isApproved: false, sender: sender, reciever: reciever})
        res.send(request)
    } catch (error) {
        console.log(error)
        res.send(error.message)
    }
})

router.get('/approveTransferRequest', async(req,res)=>{
        const approver=req.query['approver_address']
        const requestID=req.query['requestID']
    try {
        
        const req=await TransferRequest.findOneAndUpdate({_id: requestID}, {approvedBy: approver, isApproved: true})
        console.log(req)
        res.status(200).send(req)
    } catch (error) { 
        res.status(500).send(error.message)
    }
    
})

router.get('/getTokenByRequestID', async (req,res)=>{
    try {
        const data=req.query['id']
        const ticket=await TransferRequest.findOne({_id: data}).lean()
        res.send(ticket)
    } catch (error) {
        console.log(error)
    }
})

router.get('/ping', async (req,res)=>{
    res.status(200).send('Working')
})

module.exports=router;