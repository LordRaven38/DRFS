const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    name: { type:String, required: true},
    email: { type: String, required: true},
    age: Number,
    password: {type: String, required: true},
    role: {type: String, required: true, enum: ['admin', 'applicant']},
    cnic: {type: String, required: true,},
    wallet_address: {type: String, required: true}
})

const User=mongoose.model('User',userSchema);
module.exports=User;