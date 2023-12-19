const mongoose=require('mongoose')

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    trim: true,
    lowercase: true,
    required: "email address is required",
    unique: true
  },
  password: {
    type: String,
    require: true,
    trim: true,
  },
},
{ timestamps: true });
module.exports = mongoose.model("NewUserZygal",UserSchema);