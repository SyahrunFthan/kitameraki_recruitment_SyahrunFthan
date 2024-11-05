const jwt = require("jsonwebtoken");
require("dotenv").config();

// Middleware Authentication Token
const Authentication = (req, res, next) => {
  const authHeaders = req.headers["authorization"];
  const token = authHeaders && authHeaders.split(" ")[1];
  if (!token)
    return res.status(401).json({ message: "Anda tidak memiliki token!" });
  if (token !== req.cookies.token)
    return res.status(401).json({ message: "Token tidak cocok!" });
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, decode) => {
    if (err) return res.sendStatus(403);
    req.userId = decode.userId;

    next();
  });
};

module.exports = Authentication;
