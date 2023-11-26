const express=require('express')
const mongoose=require('mongoose')
const populate=require('./routes/populateRoutes')
const filing=require('./routes/filingRoutes')
const verify = require('./routes/routes')
const utils=require('./routes/utils')
const userRoutes=require('./routes/userRoutes')
const bodyParser=require('body-parser')
const cors=require('cors')
const cookieParser=require('cookie-parser')

const app=express();
const uri='mongodb://127.0.0.1:27017/urbane'
const PORT=3001

const config={
    origin: 'http://localhost:3000',
    credentials: true,
    exposedHeaders: ['set-cookie']
}
app.use(cors(config))
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(cookieParser())

app.use(bodyParser.json())
mongoose.connect(uri,()=>{
    console.log('Connected to database')
})

app.use('/populate',populate)
app.use('/filing',filing)
app.use('/verify',verify )
app.use('/utils',utils)
app.use('/user',userRoutes)

app.listen(PORT,()=>{
    console.log(`Server listeting at port ${PORT}`)
})


// //import Web3Storage from 'web3.storage'
// require('dotenv').config()
// const express=require('express')
// const app=express();
// const port=9000;
// const bodyParser=require('body-parser')
// const multer=require('multer')
// const API=require('./dstorage.json');
// const fs=require('fs')
// const {promisify}=require('util')
// const token=API.token
// const Web3Storage=require('web3.storage')
// const decentralized_storage=new Web3Storage.Web3Storage(token);

// const unlinkAsync = promisify(fs.unlink)

// var storage = multer.diskStorage({
//     destination: function (req, file, callback) {
//         callback(null, './uploads');
//     },
//     filename: function (req, file, callback) {
//         callback(null, file.originalname);
//     }
// });

// var upload = multer({ storage: storage })
// const files=[]
// app.post('/upload', upload.single('file'), async function (req,res,next){
//     res.json(req.file.path)

//     //Storing onto the decentralized storage
//     //const pathFiles= Web3Storage.getFilesFromPath(req.file.path)

//     files.push(fileObject);
//     const cid=await decentralized_storage.put(file)
//     // await unlinkAsync(req.file.path)
//     //res.json(file)
// })

// app.listen(port, ()=>{
//     console.log(`The server has started at port 9000`)
// })