const express =require("express")
const userroute =require('./user')
const accroute =require('./account')
const splitroutes=require('./group')
const router =express.Router()

const app=express()
router.use('/user',userroute);
router.use('/account',accroute);
router.use('/group',splitroutes);
  
module.exports=router;