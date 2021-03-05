const express = require('express')
const morgan = require('morgan')
const mongoose =  require('mongoose');
require('dotenv').config();
const app = express();
//API logs 
app.use(morgan('dev'));
//passing body data
app.use(express.urlencoded({extended:false}));


//connect DB
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true},()=>{
    console.log('MongoDB Connected');
});

app.use("/user",require("./routes/user"));
app.use("/rent",require("./routes/rent"));

const PORT = process.env.PORT || 3000;

app.post("/test",(req,res)=>{
    res.send({status:true,message:"Server is Running.",data:req.body})
})


app.listen(PORT,()=>{
    console.log(`Server Listen on PORT ${PORT}`);
})


