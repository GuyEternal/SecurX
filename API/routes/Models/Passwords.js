import mongoose from "mongoose";

const PasswordSchema = new mongoose.Schema({
  websiteName: {
    type: String,
    required: "true" ,
    unique: false
  },
  websiteUsername: {
    type: String,
    required: "true",
    unique: false
  },
  websitePassword: {
    type: String,
    required: "true",
    unique: false, 
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true
  }
});

export default mongoose.model("Password",PasswordSchema)