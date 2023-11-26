const mongoose=require('mongoose');

const documentSchema=new mongoose.Schema({
    area: {type: mongoose.Schema.Types.ObjectId, ref: 'Area', required: true},
    block: {type: mongoose.Schema.Types.ObjectId, ref: 'Block', required: true},
    plot: {type: mongoose.Schema.Types.ObjectId, ref: 'Plot', required: true},
    document_type: {type: String, required: true, enum: ['fardnama','registry','noc', 'construction plan']},
    name: {type: String, required: true},
    doc_cid: {type: String, default: 'none'},
    nft_uri: {type: String, default: ''}
})

const Document=mongoose.model('Document',documentSchema);
module.exports=Document;