const express=require('express')
const {account, user}=require('../db')
const {auth_middleware}=require('./middleware')
const { mongoose } = require('mongoose')

const router=express.Router()

router.get('/balance',auth_middleware,async(req,res)=>{
const Account=await account.findOne({userid:req.userid})
 return res.json({
    balance:Account.balance 
})
})

router.post('/transfer',auth_middleware,async (req,res)=>{
    const newsession =await mongoose.startSession()
    newsession.startTransaction();
    
    const fromaccount= await account.findOne({userid:req.userid }).session(newsession)
    
    if(!fromaccount || fromaccount.balance < 0){
        await newsession.abortTransaction()
        return res.status(400).json({
            msg: "error  in  senders account"
            })
            }
            
    const {to,amount}=req.body;
    const toaccount= await account.findOne({userid:to}).session(newsession)

    if(!toaccount){
        await newsession.abortTransaction();
        return res.status(200).json({
            msg: " error in  receiver amount"
        })
    }
    await account.updateOne({userid:req.userid},{ $inc: { balance:-amount } }).session(newsession)
    await account.updateOne({userid:to},{ $inc: { balance: amount } }).session(newsession)
    
    await  newsession.commitTransaction()
    res.json({
        msg:"transaction successful"
    })
    
})
module.exports=router