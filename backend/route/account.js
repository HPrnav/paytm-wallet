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

router.post('/create',async (req, res) => {
    const { groupName, members } = req.body;
  
     if (!groupName) {
      return res.status(400).json({ msg: 'Group name is required' });
    }
  
    if (!members || !Array.isArray(members) || members.length === 0) {
      return res.status(400).json({ msg: 'Members are required to create a group' });
    }
  
    try {
      // Check if the user has already created a group with the same name
      const existingGroup = await group.findOne({ groupName, createdBy: req.userid });
      
      if (existingGroup) {
        return res.status(400).json({ msg: 'You have already created a group with this name' });
      }
  
      // Create the group
      const newGroup = new group({
        groupName,
        createdBy: req.userid,  // req.userid is set by auth_middleware
        members: [req.userid, ...members] // Add creator to the group along with provided members
      });
  
      await newGroup.save();
  
      res.json({
        msg: 'Group created successfully',
        group: newGroup
      });
  
    } catch (error) {
      res.status(500).json({ msg: 'Error creating group', error });
    }
  });
module.exports=router