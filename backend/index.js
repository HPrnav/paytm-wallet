const express = require("express");
const cors =require("cors")
const mainroute =require('./route/index')

const app=express();
app.use(cors())
app.use(express.json())

app.use('/api/v1',mainroute)

app.listen(3000);