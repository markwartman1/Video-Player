const app = require('./server/routes/api');
const debug = require('debug')("node-angular");
const http = require('http');

const normalizePort = val => {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    else if (port >= 0) {
        return port;
    }

    return false;
};

const onError = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privleges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
};

const onListening = () => {
    const addr = server.address();
    const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
    debug("Listening on " + bind);
};

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);


// #############################################
// original below

// const express = require('express');
// const bodyParser = require('body-parser');
// const path = require('path');

// const api = require('./server/routes/api');

// const port = 3000;

// const app = express();

// //app.use(express.static(path.join(__dirname, 'server')));

// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());

// //app.use('/api', api);

// // app.get('*', (req, res) =>{
// //     res.sendFile(path.join(__dirname, 'server/index.html'));
// // });

// app.listen(port, function() {
//     console.log('Server running on localhost:' + port);
// });