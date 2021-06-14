const apiResponse = require('../helpers/apiResponse');
const moment = require('moment')
const User = require("../models/User");
const consola = require('consola')
const config = require('../config/index')
async function sendEmail(req, res)
/**
 * @DESC Register new user
 */
async function registerUser(req, res) {
    let user = req.body;

    try {

        const mailOptions = (email, subject, name) => {
            return {
                from: config.EMAIL, // sender address
                to: email, // receiver address
                subject: `${subject} - [TalentQL]`, // Subject line
                html: `<p>Welcome to talentQL application ${name}.<p>`, // plain text body
            };
        };
        const {
            email
        } = user;
        const newUser = new User({
            ...user
        })
        await newUser.save()

        await sendEmail(
            mailOptions(
                email,
                'Welcome to TalentQL Application',
                user.name
            ));

        return apiResponse.createdResponse(
            res,
            "User created Successfully"
        )
    } catch (error) {
        consola.error("Register User", error.toString());

        return apiResponse.errorResponse(res, `${error}`);
    }
}

/**
 * @DESC Login User
 */
async function loginUser(req, res) {

    try {
        const user = await User.findByCredentials(res, req.body.email, req.body.password);

        const token = await user.generateAuthToken();

        const accessToken = `Bearer ${token}`

        return apiResponse.successResponseWithData(res, "Login Successfull", {
            token: accessToken,
            expiresIn: "1 day"
        });

    } catch (e) {
        consola.error("Login User", e.toString());

        return apiResponse.errorResponse(res, e.toString());
    }
}

async function logoutUser(req, res) {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })

        await req.user.save()

        return apiResponse.successResponse(res, "Logged Out")

    } catch (e) {
        consola.error("Logout User", e.toString());

        return apiResponse.errorResponse(res, e.toString());
    }
}

/**
 * @DESC Reset Password
 */
async function resetPassword(req, res) {
    try {
        let user = req.user;

        user.resetPassword = true;
        await user.save()

        return apiResponse.successResponse(res, "You can now change your password")
    } catch (error) {
        consola.error("Reset User Password", e.toString());

        return apiResponse.errorResponse(res, e.toString());
    }
}

/**
 * @DESC Change Password
 */
async function changePassword(req, res) {
    try {
        const {
            password
        } = req.body;
        const user = req.user;

        if (!user.resetPassword) {
            return apiResponse.unauthorizedResponse(res, "Reset password first")
        }

        user.resetPassword = false;
        user.password = password;

        await user.save();
        return apiResponse.successResponse(res, "Password changed successfully")

    } catch (error) {
        consola.error("Change Password", e.toString());

        return apiResponse.errorResponse(res, e.toString());
    }
}
module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    resetPassword,
    changePassword

}