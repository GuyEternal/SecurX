import mongoose from "mongoose";

const PasswordSchema = new mongoose.Schema({
  websiteName: {
    type: String,
    required: "true" ,
    unique: true
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
    unique: false
  }
});

export default mongoose.model("Password",PasswordSchema)