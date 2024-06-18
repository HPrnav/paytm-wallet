const express =require("express")
const userroute =require('./user')
const accroute =require('./account')
const router =express.Router()

const app=express()
router.use('/user',userroute);
router.use('/account',accroute);

module.exports= router