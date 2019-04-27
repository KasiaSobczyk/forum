const express = require("express");
const Controllers = require('./controller/post');
const checkUser = require('../middleware/check-user');
const unpackContent = require('../middleware/content');

const router = express.Router();


router.post("", checkUser, unpackContent, Controllers.createPost);

router.put("/:id", checkUser, unpackContent, Controllers.updatePost);

router.get("", Controllers.getPosts);

router.get("/:id", Controllers.getOnePost);

router.delete("/:id", checkUser, Controllers.removePost);

// router.put("/", unpackContent, Controllers.likePost);

module.exports = router;
