const express = require("express");
const app=express();
const cookieParser=require("cookie-parser")
const path=require('path')
const cors=require('cors')

const errorMiddleware= require("./middlewares/Error")

if(process.env.NODE_ENV!=="PRODUCTION"){
require("dotenv").config({path:"config/config.env"})
}


//Routes imports
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser())

app.use(cors({
  origin: [
    "http://localhost:5173",                // local React dev
    "https://buylit-ecommerce.onrender.com"    // deployed frontend
  ],
  credentials: true,
}));

const product= require("./routes/productRoute")
const user= require("./routes/userRoute")
const order= require("./routes/orderRoute")
const payment= require("./routes/paymentRoute")

app.use("/api/v1",product)
app.use("/api/v1",user)
app.use("/api/v1",order)
app.use("/api/v1",payment)

app.use(express.static(path.join(__dirname,"../frontend/dist")))
app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"../frontend/dist/index.html"))
})

//middleware for error
app.use(errorMiddleware)

module.exports=app
