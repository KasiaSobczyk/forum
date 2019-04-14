const express = require("express");
const bcrypt = require('bcrypt');
const jsonWT = require('jsonwebtoken');
const Member = require('../models/user');
const router = express.Router();

router.post("/register", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const member = new Member({
      email: req.body.email,
      password: hash
    });
    member.save().then(result => {
      res.status(201).json({
        message: 'Konto zostało utworzone!',
        result: result
      });
    }).catch(err => {
      res.status(500).json({
          message: 'Adres e-mail jest już zarejestrowany'
      });
    });
  });
});

router.post("/login", (req, res, next) => {
  let addedMember;
  Member.findOne({
      email: req.body.email
    }).then(member => {
      if (!member) {
        return res.status(401).json({
          message: 'User doesnt exist'
        });
      }
      addedMember = member;
      return bcrypt.compare(req.body.password, member.password);
    }).then(result => {
      if (!result) {
        return res.status(401).json({
          message: 'User doesnt exist'
        });
      }
      const token = jsonWT.sign({
        email: addedMember.email,
        memberId: addedMember._id
      }, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkthdGFyenluYSBTb2JjenlrIiwiaWF0IjoxNTE2MjM5MDIyfQ.RJ9XWKhqL6iztX-mzZcE6-9y3oi10-P0VNGA2a8JD18', {
        expiresIn: '1h'
      });
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        memberId: addedMember._id
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: 'User doesnt exist'
      });
    });
});

module.exports = router;
