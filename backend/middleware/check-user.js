const jsonWT = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jsonWT.verify(token, process.env.WEB_TOKEN);
    req.memberData = { email: decodedToken.email, memberId: decodedToken.memberId, username: decodedToken.username, firstName: decodedToken.firstName, lastName: decodedToken.lastName };
    next();
  } catch (error) {
    res.status(401).json({
      message: 'Auth failed'
    });
  }
};
