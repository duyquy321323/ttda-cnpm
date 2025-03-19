require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");

const { setupWebSocket } = require("./controllers/environmentController");


const environmentRoutes = require("./routes/environmentRoute");
const controlRoutes = require("./routes/controlRoute"); 
const ledRoutes = require("./routes/ledRoute"); 

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());


app.use("/environment", environmentRoutes);
app.use("/fan-relay-servo", controlRoutes);
app.use("/light-rbg", ledRoutes);

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
