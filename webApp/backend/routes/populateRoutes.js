const router=require('express').Router()
const mongoose=require('mongoose')
const Area=require('../models/Area')
const Block=require('../models/Block')
const Plot = require('../models/Plot')
const authorize=require('../middleware/authorize')
//Create Areas
router.use(authorize)
router.post('/area',async (req,res)=>{
    
    const data=req.body
    try {
        const area=await Area.create({name: data['Area Name'], number_of_blocks: data['Number of Blocks']})
        res.json(area)
    } catch (error) {
        res.send(error.message)
    }
    
})

//Schemas

//Block

// const blockSchema=new mongoose.Schema({
//     name: {type: String, required: true},
//     number_of_plots: {type: Number, required: true},
//     area: {type: mongoose.Schema.Types.ObjectId, ref: 'Area'}
// })

//Plots

// const plotSchema=new mongoose.Schema({
//     number: {type: String, required: true, unique: true},
//     type: {type: String, required: true, enum: ['residential','commercial', 'public']},
//     block: {type: mongoose.Schema.Types.ObjectId, ref: 'Block'},
//     area: {type: mongoose.Schema.Types.ObjectId, ref: 'Area'}
// })

//  logic:
//  take area name and block name, fetch the number 
//  of plots then populate them accordingly

router.post('/plot',async (req,res)=>{
    const data=req.body
    const area=await Area.findOne({name:data['area-name']}).lean()
    const block=await Block.findOne({name: data['block-name'],area: area._id}).lean()
    for(let i=1;i<=block.number_of_plots;i++)
    {
        Plot.create({number:i,type: 'residential',block: block._id, area: area._id})
    }
    console.log('Plots Added Successfully!')
})


//Create Blocks
router.post('/block', async (req, res)=>{
   
    console.log(req.body)
    const data=req.body
    const area=await Area.findOne({name: data['area-block']})
    for(let i=1;i<=data['area-block-num'];i++)
    {
        Block.create({name: data[`input-${i}`], number_of_plots: data[`input-${i}-plots`],area: area._id})
    }
    //console.log(area)
})

//Create Plots

module.exports=router;