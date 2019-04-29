const Post = require("../../models/post");

exports.createPost = (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + "/images/" + req.file.filename,
    creator: req.memberData.memberId,
    username: req.memberData.username
  });
  console.log("id " + req.memberData.memberId + "user " + req.memberData.username)
  post.save().then(createdPost => {
    console.log("created " + createdPost);
    res.status(201).json({
      message: "Post added successfully",
      post: {
        ...createdPost,
        id: createdPost._id
      }
    });
  }).catch(err => {
    res.status(500).json({
      message: 'Nie udało się dodać treśći'
    });
  });
};

exports.getPosts = (req, res, next) => {
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
    }).catch(err => {
      res.status(500).json({
        message: 'Nie udało się wczytać treśći'
      });
    });
};

exports.getOnePost = (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({
        message: "Post not found!"
      });
    }
  }).catch(err => {
    res.status(500).json({
      message: 'Nie znaleziono treści'
    });
  });
};

exports.updatePost = (req, res, next) => {
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
    creator: req.memberData.memberId,
    username: req.memberData.username
  });
  // console.log(post);
  Post.updateOne({
    _id: req.params.id,
    creator: req.memberData.memberId
  }, post).then(result => {
    // console.log(result);
    if (result.n > 0) {
      res.status(200).json({
        message: "Update successful"
      });
    } else {
      res.status(401).json({
        message: "No authorized"
      });
    }
  }).catch(err => {
    res.status(500).json({
      message: 'Nie udało się zaktualizować treśći'
    });
  });
};

exports.removePost = (req, res, next) => {
  Post.deleteOne({
    _id: req.params.id,
    creator: req.memberData.memberId
  }).then(result => {
    // console.log(result);
    // res.status(200).json({ message: "Post deleted!" });
    if (result.n > 0) {
      res.status(200).json({
        message: "Usunięto"
      });
    } else {
      res.status(401).json({
        message: "Nie można usunąć treśći"
      });
    }
  }).catch(err => {
    res.status(500).json({
      message: 'Nie można usunąć treśći'
    });
  });
};

exports.likePost = (req, res, next) => {
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
    creator: req.memberData.memberId,
    username: req.memberData.username,
    // likes: [],
    // likedBy: req.body.likedBy,
    // dislikes: [],
    // dislikedBy: req.body.dislikedBy
  });
  Post.updateOne({
    _id: req.params.id,
    likedBy: req.params.likedBy
  }, post).then(result => {
    if (post.dislikedBy.includes(memberData.username)) {
      post.dislikes--;
      const arrayIndex = post.dislikedBy.indexOf(user.username);
      post.dislikedBy.splice(arrayIndex, 1);
      post.likes++;
      post.likedBy.push(memberData.username);
      post.save((err) => {
        if (err) {
          res.status(401).json({
            message: "No authorized"
          });
        } else {
          res.status(200).json({
            message: "Update successful"
          });
        }
      });
    } else {
      post.likedBy.push(memberData.username);
      post.likes++;
      post.save((err) => {
        if (err) {
          res.status(401).json({
            message: "No authorized"
          });
        } else {
          res.status(200).json({
            message: "Update successful"
          });
        }
      }).catch(err => {
        res.status(500).json({
          message: 'Nie udało się zaktualizować treśći'
        });
      });
    };
  });
};
