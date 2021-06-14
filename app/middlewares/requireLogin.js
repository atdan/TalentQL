const apiResponse = require('../helpers/apiResponse');

module.exports = (req, res, next) => {
  if (!req.user) {
    return apiResponse.unauthorizedResponse(res, "You must log in")
  }

  next();
};
