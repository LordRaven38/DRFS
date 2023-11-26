const mongoose=require('mongoose');

const plotSchema=new mongoose.Schema({
    number: {type: String, required: true},
    type: {type: String, required: true, enum: ['residential','commercial', 'public']},
    block: {type: mongoose.Schema.Types.ObjectId, ref: 'Block'},
    area: {type: mongoose.Schema.Types.ObjectId, ref: 'Area'},
})

const Plot=mongoose.model('Plot',plotSchema);
module.exports=Plot;