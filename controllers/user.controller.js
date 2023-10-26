const { sequelize, User } = require("../models/connection");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signup = async (req, res) => {
   if (!req.body.username || !req.body.email || !req.body.password) {
      res.status(400).send({
         message: "Required fields: username, email, password.",
      });
   }

   const user = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
   };

   try {
      let u = await User.findOne({ where: { username: user.username } });
      if (u) {
         res.status(400).send({
            message: "User already exists.",
         });
      }

      const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT));
      user.password = await bcrypt.hash(req.body.password, salt);
      const data = await User.create(user);

      const payload = {
         user: {
            id: data.id,
         },
      };

      jwt.sign(
         payload,
         process.env.JWT_SECRET,
         { expiresIn: 36000 },
         (err, token) => {
            if (err) throw err;
            res.json({ token });
         }
      );
   } catch (e) {
      res.status(500).send({
         message: e.message || "Some error occured while creating user.",
      });
   }
};

exports.login = async (req, res) => {
   try {
      if (!req.body.username || !req.body.password) {
         res.status(400).send({
            message: "Required fields: username, password.",
         });
      }

      const { username, password } = req.body;
      const user = await User.findOne({ where: { username: username } });
      if (!user) {
         return res
            .status(400)
            .json({ errors: [{ msg: "User does not exists!" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
         return res
            .status(400)
            .json({ errors: [{ msg: "invalid credentials." }] });
      }

      const payload = {
         user: {
            id: user.id,
         },
      };
      jwt.sign(
         payload,
         process.env.JWT_SECRET,
         { expiresIn: 36000 },
         (err, token) => {
            if (err) throw err;
            res.json({ token, username: user.username });
         }
      );
   } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error.");
   }
};

exports.listusers = async (req, res) => {
   try {
      const userlist = await User.findAll();
      if (!userlist) {
         return res
            .status(400)
            .json({ errors: [{ msg: "Error fetching user list." }] });
      }

      userlist.forEach((ele, index) => {
         userlist[index] = {
            username: ele.username,
            email: ele.email,
         };
      });

      res.json({
         userlist: userlist,
      });
   } catch (e) {}
};
