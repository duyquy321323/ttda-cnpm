const environmentRoutes = require("./environmentRoute");
const controlRoutes = require("./controlRoute");
const ledRoutes = require("./ledRoute");
const userRoutes = require("./userRoute");
const logRoutes = require("./logRoute");
const deviceRoutes = require("./deviceRoute");

const route = (app) => {
  app.use("/environment", environmentRoutes);

  app.use("/fan-relay-servo", controlRoutes);

  app.use("/light-rbg", ledRoutes);

  app.use("/user", userRoutes);

  app.use("/log", logRoutes);

  app.use("/devices", deviceRoutes);

}

module.exports = route