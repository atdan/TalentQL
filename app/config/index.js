require("dotenv").config();

let DB_URL
if(process.env.NODE_ENV === 'prod'){
    DB_URL= process.env.MONGODB_ATLAS_CONN_STR;
}else{
    DB_URL = process.env.MONGODB_URL
}

module.exports = {
    DB_URL,
    USER_SECRET = process.env.USER_SECRET,
    CLOUDINARY_NAME = process.env.CLOUDINARY_NAME,
    CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET = process.env.CLOUDINARY_SECRET,
    EMAIL = process.env.EMAIL,
}