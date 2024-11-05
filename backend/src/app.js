const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const db = require("./configs/Database");
const dotenv = require("dotenv");
const RouteTask = require("./routers/RouteTask");
dotenv.config(); // load env variable

db();

const app = express(); // Connect to express

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true }));

// Route Path API
app.use("/task", RouteTask);

const PORT = process.env.PORT_APP || 5001;
app.listen(PORT, () => console.log(`Server run at port ${PORT}`));
