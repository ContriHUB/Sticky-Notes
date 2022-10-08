const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

//method to check email duplication
UserSchema.statics.emailAlreadyInUse = async function(email){
  if(!email) throw new Error('Invalid Email')
   try {
   const user = await this.findOne({email})
   if(user)return false
   return true;
  } catch (error) {
   console.log('Error: emailAlreadyInUse method', error.message)
   return false
  }
 }

const User = mongoose.model("user", UserSchema);
// User.createIndexes();

module.exports = User;
