const mongoose=require('mongoose');

const areaSchema=new mongoose.Schema({
    name: {type: String, required: true},
    number_of_blocks: { type: Number, required: true},
})

const Area=mongoose.model('Area',areaSchema)

module.exports=Area;