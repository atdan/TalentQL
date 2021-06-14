const mongoose = require('mongoose')
const redis = require('redis')
const util = require('util')
const keys = require('../config/index')
// const redisUrl = 'redis://127.0.0.1:6379'

const client = redis.createClient(keys.redisUrl)
client.hget = util.promisify(client.hget)
const exec = mongoose.Query.prototype.exec;

// Use options to make it reusable
mongoose.Query.prototype.cache = function (options = {}){
    this.useCache = true;
    // Handle case if a key is  not passed
    this.hashKey = JSON.stringify(options.key || '');
    // To make sure it's chainable
    return this;
}

mongoose.Query.prototype.exec = async function () {
    if (!this.useCache){
        console.log('this.useCache = false')
        return exec.apply(this, arguments)
    }
    console.log('this.useCache = true')

    //To not modify the content of getQuery
    const key = JSON.stringify(
        Object.assign({}, this.getQuery(), {
            collection: this.mongooseCollection.name
        })
    );

    console.log('key')
    console.log(key)
    // See if we have a value for "key" in redis
    const cacheValue = await client.hget(this.hashKey, key);

    // If we do, return that
    if (cacheValue) {
        const doc = JSON.parse(cacheValue)

        console.log('Coming from cache')
        return Array.isArray(doc)
            ? doc.map(d => new this.model(d))
            : new this.model(doc)
    }

    // Otherwise, issue the query and store the result in redis
    const result = await exec.apply(this, arguments);
    client.hset(this.hashKey,key, JSON.stringify(result), 'EX', 10)
    return result;
}

module.exports = {
    // to clear cache for a user
    clearHash(hashKey) {
        client.del(JSON.stringify(hashKey));
    }
}
