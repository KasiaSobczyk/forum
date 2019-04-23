const bcrypt = require('bcrypt');
const jsonWT = require('jsonwebtoken');
const Member = require('../../models/user');

exports.createMember = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const member = new Member({
      email: req.body.email,
      password: hash,
      username: req.body.username
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
};


exports.loginMember = (req, res, next) => {
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
        memberId: addedMember._id,
        username: addedMember.username
        }, process.env.WEB_TOKEN,
        { expiresIn: '1h'}
        );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        memberId: addedMember._id,
        username: addedMember.username
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: 'User doesnt exist'
      });
    });
};
