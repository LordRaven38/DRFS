const dotenv=require('dotenv')
dotenv.config()
const jwt=require('jsonwebtoken')
function authorize(req,res,next){
    const token=req.cookies.access_token
    console.log(token)
    if(token===null) {
        return res.sendStatus(403)
    }

    try {
        const data=jwt.verify(token, process.env.JWT_SECRET)
        return next();
    } catch (error){
        console.log(error)
        return res.sendStatus(403)
    }
}
module.exports= authorize