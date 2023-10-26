const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
   const token = req.header("x-auth-token");

   //console.log("token from middleware: ", token);

   if (!token) {
      return res.status(401).json({ msg: "No token, authorization denied!" });
   }

   // verify token:
   try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded.user;
      next();
   } catch (err) {
      res.status(401).json({ msg: "token not valid!" });
   }
};
