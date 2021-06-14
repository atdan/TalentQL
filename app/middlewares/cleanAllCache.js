const {clearHash} = require('../services/cache')
const constants = require('../constants/index')
// dump cache only after the request is run
module.exports = async (req, res, next) => {

    await next()

    clearHash(constants.ALL)
}
