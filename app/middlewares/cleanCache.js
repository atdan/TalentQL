const {clearHash} = require('../services/cache')
// dump cache only after the request is run

async (req, res, key, next) => {

    await next()

    clearHash(key)
}
