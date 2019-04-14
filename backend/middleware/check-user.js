const jsonWT = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jsonWT.verify(token, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkthdGFyenluYSBTb2JjenlrIiwiaWF0IjoxNTE2MjM5MDIyfQ.RJ9XWKhqL6iztX-mzZcE6-9y3oi10-P0VNGA2a8JD18');
    req.memberData = { email: decodedToken.email, memberId: decodedToken.memberId };
    next();
  } catch (error) {
    res.status(401).json({
      message: 'Auth failed'
    });
  }
};
