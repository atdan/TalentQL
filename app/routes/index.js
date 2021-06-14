var express = require("express");
var router = express.Router();
var fs = require("fs");
var marked = require("marked");

/* GET home page. */
router.get("/", function(req, res) {

    var path = __dirname + '/mk/README.md';
    var file = fs.readFileSync(path, 'utf8');

    res.send(marked(file.toString()));

});

module.exports = router;
