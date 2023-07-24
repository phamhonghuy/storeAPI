// middleware/authenticateToken.js
const jwt = require('jsonwebtoken');
const secretKey = '`l4F>2w=Hnr`Dri6k<4amC@W0@2=`&HDsUrs#aq~H4L`Z)S3R(}mg#e+0RDiq>Jx';

module.exports = function (req, res, next) {
  const token = req.header('Authorization');

  if (!token) return res.sendStatus(401);

  jwt.verify(token,secretKey, (err, user) => {
    if (err) {
      console.log(err);
      return res.sendStatus(403);}
    req.user = user;
    next();
  });
};
