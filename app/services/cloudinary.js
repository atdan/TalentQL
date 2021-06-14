/* eslint-disable camelcase */
const cloudinary = require('cloudinary').v2;
const config = require('../config/index')

async function uploadImage (image){

  // cloudinary configuration
  cloudinary.config({
    cloud_name: config.CLOUDINARY_NAME,
    api_key: config.CLOUDINARY_API_KEY,
    api_secret: config.CLOUDINARY_API_SECRET,
  });
  try {
    const { secure_url } = await cloudinary.uploader.upload(image);

    return secure_url;
  } catch (error) {
    throw error;
  }
};

module.exports = uploadImage;
