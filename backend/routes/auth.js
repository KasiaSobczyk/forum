const express = require("express");
const Controllers = require('./controller/user');
const router = express.Router();

router.post("/register", Controllers.createMember);

router.post("/login", Controllers.loginMember);

router.get("/:id", Controllers.userInfo);

module.exports = router;
