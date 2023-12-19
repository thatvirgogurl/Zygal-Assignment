const express=require('express')
const app=express()   
const body_parser=require('body-parser');
app.use(body_parser.json());
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const { default: mongoose } = require('mongoose');

const route=require('./routers/router')

const Port=process.env.PORT||3000

mongoose.connect(
  "mongodb+srv://Monalisamishra:MDYlL3MKtGxQa59a@cluster0.7zrfpkj.mongodb.net/monalisaMishra_db"
).then(()=>console.log('mongoDb is connected'))

app.use('/',route)

app.listen(Port,()=>console.log(`App is listen ${Port}`))
