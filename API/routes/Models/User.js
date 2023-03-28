import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: "true"
  },
  email: {
    type: String,
    required: "true",
    unique: true,
    sparse: true
  },
  password: {
    type: String,
    required: "true"
    
  },
  publicKey:{
    type:String
  },
privateKey:{
  type:String
},

  date: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("User",UserSchema)
