const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://pranavhore1455:Pranav%402003@cluster0.jgvyr0h.mongodb.net/paytm-lite', {
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

module.exports = { user, account };
