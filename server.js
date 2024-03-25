const express = require("express");
const eventRoutes = require("./src/routes");
const app = express();
const port = 8080;

app.use(express.json());

app.use("/api/v1/events", eventRoutes);
app.listen(port, console.log(`This app is listen at ${port}`));
