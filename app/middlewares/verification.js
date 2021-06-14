const User = require('../models/User')
const consola = require('consola');
const apiResponse = require('../helpers/apiResponse')

// helper function to check if a user already exists
const userExists = async (req, res, next) => {
    try{
        const {email} = req.body

        let user = await User.findOne({email})

        if(!user){
            next()
        }
        else throw new Error("User already exists");


    }catch(e){
        consola.error("User verification", e.toString())
        return apiResponse.errorResponse(res, e.toString())
    }
}


module.exports = userExists

