const cors = require("cors");
const exp = require("express");
const bp = require("body-parser");
const { connect } = require("mongoose");
const { success, error } = require("consola");

// Import the app constants
const { DB_URL } = require("./config/index");
var apiResponse = require("./helpers/apiResponse");
var indexRouter = require("./routes/index");
var apiRouter = require("./routes/api");

// Initalize application
const application = new exp();
// Middlewares
application.use(cors());
application.use(bp.json());
application.use(bp.urlencoded({extended: true}))
application.use(exp.json());

// Route Prefixes
application.use("/", indexRouter)
application.use("/api", apiRouter)

// throw 404 if URL not found
application.all("*", function(req, res) {
    return apiResponse.notFoundResponse(res, "Page not found");
});
application.use((err, req, res) => {
    if(err.name == "UnauthorizedError"){
        return apiResponse.unauthorizedResponse(res, err.message);
    }
});

// setup mongodb
async function dbConnection(){
    try{
        let mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true ,    useCreateIndex: true,
            useFindAndModify: true}
        await connect(DB_URL, mongoOptions)
        success({
            message: `Connected to the DB successfuly`,
            badge: true
        })
    }catch(e){
        error({
            message: `Cannot connect to the db ${e}`,
            badge: true
        });
        process.exit(1)
    }
}

dbConnection()


module.exports = {
    application
}