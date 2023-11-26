const router=require('express').Router()
const User=require('../models/User')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const authorize=require('../middleware/authorize')
const { json } = require('body-parser')
const res = require('express/lib/response')
const dayjs=require('dayjs')
require('dotenv').config();
//User Schema for reference
//======================================================
// const userSchema=new mongoose.Schema({
//     name: { type:String, required: true},
//     age: Number,
//     password: {type: String, required: true},
//     role: {type: String, required: true, enum: ['admin', 'applicant']},
//     cnic: {type: String, required: true,},
//     wallet_address: {type: String, required: true}
// })
//

router.get('/register',async (req,res)=>{
    const data=req.query
    console.log(data)
   try {
    
    const hash = await bcrypt.hash(data['password'], 10);
    const user = await User.create({name: data['name'], email: data['email'], age: data['age'],
    password: hash, role:"applicant", cnic: data['cnic'],wallet_address: data['wallet_address']})
    console.log(user)
    const result=user.toJSON();
    const token=jwt.sign(result,process.env.JWT_SECRET);

    res.cookie('access_token', token, {
        httpOnly: true,
        secure: false,
        maxAge: 60*60*1000,
        sameSite: 'none'
    }).send(
        {
            profile: {
                username: user.name,
                role: user.role,
                wallet_address: user.wallet_address
            }
        }
    )
   } catch (error) {
    console.log(error)
    res.send(null);
   }
    
})

router.get('/login', async (req,res)=>{
    const data=req.query;
    //console.log(data['password'])
    try {
        
        const password=data['password']
        const user = await User.findOne({email: data['username']}).lean()
        if(bcrypt.compareSync(password,user.password)){
                const token=jwt.sign(user,process.env.JWT_SECRET)
                res.cookie('access_token', token, {
                    httpOnly: true,
                    secure: false,
                    maxAge: 60*60*1000,
                    sameSite: 'none'
                }).send({ profile: {
                    username: user.name,
                    role: user.role,
                    wallet_address: user.wallet_address
                }})
        }

        else res.status(404).send('Account not found')

        
        
    

    } catch (error) {
        console.log(error)
        res.status(500).send('Internal server error');
    }
})

router.get('/logout', (req,res)=>{
    return res.clearCookie('access_token').status(200).send('Logged out successfully')
} )
module.exports=router;