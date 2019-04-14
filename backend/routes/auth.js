const express = require("express");
const Controllers = require('./controller/user');
const router = express.Router();

router.post("/register", Controllers.createMember);

router.post("/login", Controllers.loginMember);

module.exports = router;
