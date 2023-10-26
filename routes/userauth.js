const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const { signup, login, listusers } = require("../controllers/user.controller");
const { auth } = require("../middlewares/auth");

router.post("/signup", signup);
router.post("/login", login);
router.get("/listusers", auth, listusers);

module.exports = router;
