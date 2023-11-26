const mongoose=require('mongoose')

const transferRequestSchema=new mongoose.Schema({
    sender: { type: String, required: true},
    reciever: {type: String, required: true},
    tokenID: {type:String, required: true},
    isApproved: {type: Boolean, default: false},
    approvedBy: {type: String}
})

const TransferRequest=mongoose.model('TransferRequest',transferRequestSchema);
module.exports=TransferRequest;