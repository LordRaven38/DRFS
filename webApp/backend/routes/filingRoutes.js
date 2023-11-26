const router=require('express').Router()
const Area=require('../models/Area')
const Block=require('../models/Block')
const Plot=require('../models/Plot')
const Document=require('../models/Document')
const authorize=require('../middleware/authorize')

router.use(authorize)

router.get('/fetchAreas',async (req,res)=>{
    arr=await Area.find().lean()
    res.send(arr)
})

router.get('/fetchBlocks',async (req,res)=>{
    const query=req.query
    const area= await Area.findOne({name: query.Area})
    arr=await Block.find({area: area._id}).lean()
    res.send(arr)

})

router.get('/fetchPlots',async(req,res)=>{
    const query=req.query
    const area=await Area.findOne({name: query.Area})
    const block= await Block.findOne({name: query.Block, area: area._id})

    arr=await Plot.find({block: block._id, area: area._id}).lean()
    res.send(arr)
})

router.get('/uploadDocument', async(req,res)=>{
    const query=req.query
    console.log(req.query)
    const area=await Area.findOne({name: query.Area})
    const block=await Block.findOne({name: query.Block, area: area._id})
    const plot=await Plot.findOne({number: query.PlotNumber, area: area._id, block: block._id})
    const doc=Document.create({area: area._id, block: block._id, plot: plot._id, document_type: query.Document_Type, doc_cid: query.Doc_CID, name:query.Name, nft_uri: ''})
    console.log(doc)
    res.send('Data Entered Successfully')
})

router.get('/retrieveDocument',async (req,res)=>{
    const query=req.query
    const area=await Area.findOne({name: query.Area})
    const block=await Block.findOne({name: query.Block, area: area._id})
    const plot=await Plot.findOne({number: query.PlotNumber, area: area._id, block: block._id})
    const document=await Document.findOne({area: area._id, block: block._id, plot: plot._id, document_type: query.Document_Type }).lean()
    // try{
    //     const response= await api.get(document.doc_cid)
    //     const files=await response.files();
        
    //     for (const file of files) {
    //         res.json({cid: file.cid, name: file.name})
    //     }
    // }catch(error)
    // {
    //     console.log(error)
    // }
    res.json(document)
    
})

module.exports=router;