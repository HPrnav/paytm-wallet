const express = require('express');
const { group } = require('../db');
const { auth_middleware } = require('./middleware');  // Assuming you have this middleware for user authentication
const { mongoose } = require('mongoose')
const { account } = require('../db');
const router = express.Router();


router.post('/create', auth_middleware, async (req, res) => {

  const { name, members } = req.body;
  if (!name) {
    return res.status(400).json({ msg: 'Group name is required' });
  }

  try {
    const existingGroup = await group.findOne({ name, createdBy: req.userid });    // Check if the user has already created a group with the same name

    if (existingGroup) {
      return res.status(400).json({ msg: 'You have already created a group with this name' });
    }

    const newGroup = new group({   // Create the group
      name,
      createdBy: req.userid,  // req.userid is set by auth_middleware
      members: [...members] // Add creator to the group along with provided members
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




router.get('/group_list', auth_middleware, async (req, res) => {
  try {

    const group_list = await group.find({})
    if (group_list) {
      res.status(200).json({
        msg: "got group_list",
        group_list
      })
    }
  }
  catch (error) {
    res.status(500).json({ error: error })
  }
}
);

router.get('/get_user/:id', async (req, res) => {
  try {
    const got_id = req.params.id
    const response = await group.findById(got_id)
    // console.log(response)
    if (response) {
      res.status(200).json({
        msg: "get user sucessfully",
        response
      })

    }
    else {
      res.status(500).json({
        msg: "error in get_user",
        response
      })
    }
  } catch (error) {
    res.status(400).json({
      msg: "error in get user",
      error
    })
  }

})


// Create a new group expense (without deducting any balance)
router.post('/:id/expense', async (req, res) => {
  try {
    const { id } = req.params;
    const { description, amount, paidBy, splitAmong } = req.body;

    const group_get = await group.findById(id);
    if (!group_get) return res.status(404).json({ msg: 'Group not found' });

    const individualShare = (amount) / (splitAmong.length + 1);
    // Add a new expense to the group (not yet settled)
    group_get.expenses.push({
      description,
      amount,
      paidBy,
      splitAmong,
      individualShare: Number(individualShare),
      settledMembers: [], // Track who has paid their share
      settled: false
    });

    await group_get.save();
    res.json({ msg: 'Expense added to the group', group_get });
  } catch (error) {
    console.log(error)
    res.status(400).json({
      msg: "error while splitting",
      error
    })
  }
});

router.post('/settle/:groupId', auth_middleware, async (req, res) => {
  try {
    const { groupId } = req.params
    const { expenseId } = req.body
    console.log(1)
    const group_get = await group.findById(groupId);
    if (!group_get) return res.status(404).json({ msg: 'Group not found' });

    const expense = group_get.expenses.id(expenseId);
    console.log(2)
    if (!expense) {
      return res.status(400).json({ msg: 'Expense not found' });
    }

    // Check if the user has already settled their share
    if (expense.settledMembers.includes(req.userid)) {
      return res.status(400).json({ msg: 'You have already settled your share of this expense' });
    }
    // console.log("expense.individualShare")
    // console.log(expense.individualShare)
    // console.log("expense.individualShare")

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Deduct only the user's individual share from their balance
      await account.updateOne(
        { userid: req.userid },//req.userid
        { $inc: { balance: -expense.individualShare } }
      ).session(session);

      await account.updateOne(
        { userid: expense.paidBy },
        { $inc: { balance: expense.individualShare } }
      ).session(session);


      // Mark the user as having settled their share
      expense.settledMembers.push(req.userid);

      // If all members have settled, mark the expense as fully settled
      if (expense.settledMembers.length === expense.splitAmong.length) {
        expense.settled = true;
      }

      await group_get.save();
      await session.commitTransaction();

      res.json({ msg: 'Your share has been settled' });
    }
    catch (error) {
      await session.abortTransaction();
      console.log(error)
      res.status(500).json({ msg: 'Transaction failed', error });
    } finally {
      session.endSession();
    }



  } catch (error) {
    res.status(400).json({
      msg: "error while settling transaction in / settle",
      error


    })
  }
})


module.exports = router