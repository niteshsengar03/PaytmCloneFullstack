const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://niteshsengar9831:oPNhUMViFEWtLWfV@cluster0.dtw65.mongodb.net/paytm');

const UserSchema =  new mongoose.Schema({
    username: {
        type: String,
        required: true, //This means that the name field is mandatory. A user cannot be created without a name.
        unique: true,
        trim: true,
        //The trim: true option in Mongoose schema is used to automatically remove whitespace from the beginning and end of a string before saving it to the database.
        lowercase: true,
        //will be converted to lowercase. This is useful for avoiding duplicate names with different cases.

        minLenght: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required:true,
        minLenght: 6
    },
    firstName: {
        type:String,
        required:true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});

const accountSchema = new mongoose.Schema({
    userId: {
        type:mongoose.Types.ObjectId,
        ref:'User', // this will make sure that i can not put anythin in account table that does not have a correspondance user in User table
        required: true
    },
    balance: {
        type:Number,
        required: true
    }
})

const User = mongoose.model('User',UserSchema);
const Account = mongoose.model('Account',accountSchema);

module.exports  = {
   User,
   Account
};