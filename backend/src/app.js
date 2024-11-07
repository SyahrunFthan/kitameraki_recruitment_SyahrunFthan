const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const db = require("./configs/Database");
const dotenv = require("dotenv");
const RouteTask = require("./routers/RouteTask");
dotenv.config(); // load env variable

db();

const PORT = process.env.PORT_APP || 5001; // Get port in  .env file or default to 5001

const app = express(); // Connect to express

// Middleware
app.use(express.json()); // Set server  to accept json data
app.use(cookieParser()); // Set server  to parse cookies
app.use(cors({ credentials: true, origin: "http://localhost:3000" })); // Set server  to allow CORS from frontend

// Route Path API
app.use("/task", RouteTask);

app.listen(PORT, () => console.log(`Server run at port ${PORT}`));

module.exports = app;
