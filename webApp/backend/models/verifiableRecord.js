const mongoose = require("mongoose")

const schema = mongoose.Schema({
	ownerAddress: String,
	txid: String,
    url: String,
    cnic: String,
    
    //status: string
})

module.exports = mongoose.model("verifiableRecords", schema)

