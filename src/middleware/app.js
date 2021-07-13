const express = require('express');
const app = express();
const morgan = require("morgan");
const cors = require('cors');
const { database } = require("../config/default");
const indexRouter = require("../routes/index");
const multer = require('multer');
const path = require('path')



//midlewares
app.use(cors());
app.use(express.json());


//Configuration
app.use(morgan('dev'));
app.set("port", process.env.PORT || 4200);
app.use("/", indexRouter);
app.use(express.urlencoded({extended : true}))

//Configuration Multer



app.get('/', (req,res,next) =>{
    res.send("Backend is working");
} )



module.exports = app;