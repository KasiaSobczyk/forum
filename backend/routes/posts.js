const express = require("express");
const multer = require("multer");

const checkUser = require('../middleware/check-user');
const Post = require("../models/post");

const router = express.Router();

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});

router.post(
  "", checkUser,
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      imagePath: url + "/images/" + req.file.filename,
      creator: req.memberData.memberId
    });
    post.save().then(createdPost => {
      res.status(201).json({
        message: "Post added successfully",
        post: {
          ...createdPost,
          id: createdPost._id
        }
      });
    }).catch( err => {
      res.status(500).json({
        message: 'Nie udało się dodać treśći'
      })
    });
  }
);

router.put(
  "/:id", checkUser,
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
      const url = req.protocol + "://" + req.get("host");
      imagePath = url + "/images/" + req.file.filename;
    }
    const post = new Post({
      _id: req.body.id,
      title: req.body.title,
      content: req.body.content,
      imagePath: imagePath, 
      creator: req.memberData.memberId
    });
    // console.log(post);
    Post.updateOne({ _id: req.params.id, creator: req.memberData.memberId }, post).then(result => {
      // console.log(result);
      if ( result.nModified > 0 ) {
        res.status(200).json({ message: "Update successful" });
      } else {
        res.status(401).json({ message: "No authorized" });
      }
    }).catch( err => {
      res.status(500).json({
        message: 'Nie udało się zaktualizować treśći'
      })
    });
  }
);

router.get("", (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Post.find();
  let fetchedPosts;
  if (pageSize && currentPage) {
    postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  postQuery
    .then(documents => {
      fetchedPosts = documents;
      return Post.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Posts fetched successfully!",
        posts: fetchedPosts,
        maxPosts: count
      });
    }).catch( err => {
      res.status(500).json({
        message: 'Nie udało się wczytać treśći'
      })
    });
});

router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found!" });
    }
  }).catch( err => {
    res.status(500).json({
      message: 'Nie znaleziono treści'
    })
  });
});

router.delete("/:id", checkUser, (req, res, next) => {
  Post.deleteOne({ _id: req.params.id, creator: req.memberData.memberId }).then(result => {
    // console.log(result);
    // res.status(200).json({ message: "Post deleted!" });
    if ( result.n > 0 ) {
      res.status(200).json({ message: "Usunięto" });
    } else {
      res.status(401).json({ message: "Nie można usunąć treśći" });
    }
  }).catch( err => {
    res.status(500).json({
      message: 'Nie można usunąć treśći'
    })
  });
});

module.exports = router;
