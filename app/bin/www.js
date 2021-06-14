#!/usr/bin/env node
/**
 *  Created by Atuma Daniel on 10/06/2021.
 */

/**
 * Module dependencies.
 */
let index = require("../server");
let debug = require("debug")("tql:server");
let http = require("http");
let config = require("../config/index");
const { success, error } = require("consola");

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(config.PORT || "3310");
var application = index.application;
success("Port:", port);
application.set("port", port);

/**
 * Create HTTP server.
 */

var server = http.createServer(application);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(process.env.PORT || port);
server.on("error", onError);
server.on("listening", onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== "listen") {
        throw error;
    }

    var bind = typeof port === "string"
        ? "Pipe " + port
        : "Port " + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === "string"
        ? "pipe " + addr
        : "port " + addr.port;
    debug("Listening on " + bind);
    success({
        message: `Server started on ${bind}`,
        badge: true
    });
}