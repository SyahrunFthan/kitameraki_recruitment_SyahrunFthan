const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const db = require("./configs/Database");
const dotenv = require("dotenv");
const RouteTask = require("./routers/RouteTask");
const RouteUser = require("./routers/RouteUser");
dotenv.config(); // load env variable

db();

const PORT = process.env.PORT_APP || 5001; // Get port in  .env file or default to 5001

const app = express(); // Connect to express

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true }));

// Route Path API
app.use("/task", RouteTask);
app.use("/auth", RouteUser);

app.listen(PORT, () => console.log(`Server run at port ${PORT}`));

module.exports = app;
