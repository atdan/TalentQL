const jwt = require('jsonwebtoken')

const apiResponse = require('../helpers/apiResponse');
const User = require("../models/User");
const config = require('../config/index');

const auth = async (req, res, next) => {

    try {
        if (!req.headers.authorization){
            return apiResponse.forbiddenResponse(res, 'Authorization details are required');
        }
        const token = req.headers.authorization.split(" ")[1];

        if (token === 'null') {
            return apiResponse.forbiddenResponse(res, 'Authorization details are required');
        }
        
        const decoded = jwt.verify(token, config.USER_SECRET.toString());
        const user = await User.findOne({ _id: decoded._id});

        if (!user) {
            return apiResponse.notFoundResponse(res, "User not found");
        }

        req.token = token;
        req.user = user;
        next();
    } catch (e) {
        console.log("User auth", e);
        return apiResponse.errorResponse(res, e.toString());
    }
}

module.exports = auth