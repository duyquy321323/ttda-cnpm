const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const http = require("http");
require("dotenv").config();

const { setupWebSocket } = require("./controllers/environmentController");

const app = express();
const PORT = process.env.PORT;

const route = require("./routes/index.js");
const errorHandlingMiddleware = require("./middleware/errorHandlingMiddleware.js");
const corsOption = require("./config/cors.js");


const START_SERVER = () => {

    // Cors
    app.use(cors(corsOption));

    // Fix Cache from disk from ExpressJS
    app.use((req, res, next) => {
        res.set('Cache-Control', 'no-store')
        next()
    });

    // Use Cookie
    app.use(cookieParser())

    // Enable req.body json data
    app.use(express.json())

    // Route
    route(app);

    // ErrorHandling Middleware
    app.use(errorHandlingMiddleware)

}

(async () => {
    try {
        // Start Back-end Server
        console.log('Starting Server...')
        START_SERVER()
    } catch (error) {
    }
})()

const server = http.createServer(app);

setupWebSocket(server);

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


process.on("SIGINT", () => {
    server.close(() => {
        console.log("Server closed.");
        process.exit();
    });
});