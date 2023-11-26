const mongoose=require('mongoose');

const blockSchema=new mongoose.Schema({
    name: {type: String, required: true},
    number_of_plots: {type: Number, required: true},
    area: {type: mongoose.Schema.Types.ObjectId, ref: 'Area'}
})


const Block=mongoose.model('Block', blockSchema);
module.exports=Block