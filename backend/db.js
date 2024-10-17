require('dotenv').config();
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(process.env.temp_db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
 }).then(() => {
  console.log("Connected to MongoDB");
}).catch(err => {
  console.error("Failed to connect to MongoDB", err);
});

const { Schema } = mongoose;

// Define the user schema
const userSchema = new Schema({
  username: {
    type: String,
     trim: true,
    required: true
  },
  password: {
    type: String,
     trim: true,
    required: true
  },
  firstname: {
    type: String,
     trim: true,
    required: true
  },
  lastname: {
    type: String,
     trim: true,
    required: true
  }
});

// Define the user model
const user = mongoose.model('User', userSchema);

// Define the account schema
const accountSchema = new Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  balance: {
    type: Number,
    required: true
  }
});
// Define the account model
const account = mongoose.model('Account', accountSchema);



const groupSchema = new Schema({
  name: { type: String, required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
  createdBy:{type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  expenses: [{
    description: String,
    amount: Number,
    paidBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    splitAmong: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    settledMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    individualShare:{type:Number},
    settled: { type: Boolean, default: false }
  }]
});

const group = mongoose.model('Group', groupSchema);

module.exports = { user, account ,group};
