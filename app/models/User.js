const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const validator = require('validator');
const config = require('../config/index');
const constants = require('../constants/index');
const apiResponse = require('../helpers/apiResponse');


const Schema = mongoose.Schema;

const userSchema = new Schema({
    
    email: {
        type: String,
        required: [[true, "Email is required"]],
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is not valid')
            }
        }
    }, 
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: 5,
        trim: true
    },
    resetPassword: {
        type: Boolean,
        required: true,
        default: false,
    },
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: constants.POST,
        }
    ],
    tokens: [{
        token: {
            type: String
        }
       }]
}, {
    timestamps: true
});


userSchema.methods.toJSON = function (){
    const user = this
    
    const userObject = user.toObject();

    delete userObject.password
    delete userObject.tokens

    // delete studentObject.avatar
    
    return userObject
}

userSchema.methods.generateAuthToken = async function (){

    const user = this

    const token = jwt.sign(
        {_id: user._id.toString(),
        login: 'yes'},
        config.USER_SECRET, 
        {expiresIn: '1d'}
    );

    user.tokens = user.tokens.concat({token})
    await user.save()

    return token
}

userSchema.statics.findByCredentials = async (res, email, password) => {
    try {
     
        const user = await User.findOne({email: email})

        if(!user){
            throw new Error('Invalid email or password')
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            throw new Error('Invalid email or password')
        }

        return user

    } catch (error) {
        return apiResponse.validationError(res, `${error}`)
    }
}


userSchema.pre('save', async function(next) {
    const user = this

    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 12)
    }

    next()
})


const User = mongoose.model(constants.USER, userSchema)

module.exports = User
